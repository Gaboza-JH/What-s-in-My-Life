package com.example.wil.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.wil.model.Image;
import com.example.wil.model.Post;
import com.example.wil.repository.ImageRepository;
import com.example.wil.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@Slf4j
@Component
@RequiredArgsConstructor
public class ImageService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final AmazonS3Client amazonS3Client;

    @Autowired
    private ImageRepository repository;

    @Autowired
    private final PostRepository postRepository;

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        System.out.println("originname : " + multipartFile.getOriginalFilename());
        System.out.println("content-type : " + multipartFile.getContentType());
        System.out.println("getname : " + multipartFile.getName());
        System.out.println("hash : " + multipartFile.hashCode());
        System.out.println("resource : " + multipartFile.getResource());
        System.out.println("upload 메서드 진입");

        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("파일 전환 실패"));
        return upload(uploadFile, dirName);
    }

    // S3로 파일 업로드하기
    private String upload(File uploadFile, String dirName) {
        System.out.println("s3 upload" + uploadFile);
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 dirName(static/) 폴더로 파일 이름을 UUID(범용 고유 식별자 Universally Unique Identifier) 고유값으로 변환하여 저장
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        System.out.println(uploadImageUrl);

        Image image = new Image();
        image.setFile_name(fileName);
        repository.save(image);


        removeNewFile(uploadFile); // client로부터 업로드 될 이미지 파일 (로컬 이미지 파일)
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        System.out.println("Put3");
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // S3에서 image url 가져오기
    private String getS3(String bucket, String fileName) {
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        System.out.println("remove" + targetFile); // 현재 파일(client로 부터 받은 이미지 파일)을 로컬에 저장하지 않고 S3에 바로 저장하기 위해 로컬 이미지 삭제
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }

    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());
        // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public List<String> upload(List<MultipartFile> multipartFile, String dirName) throws IOException {
        List<String> imgUrlList = new ArrayList<>();
        System.out.println("List upload method >> file!! " + multipartFile);

        for (MultipartFile file : multipartFile) {
            System.out.println(file.getName());
            System.out.println(file.getOriginalFilename());

            String fileName = dirName + "/" + UUID.randomUUID() + file.getOriginalFilename();
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));

//                List<Image> images = Arrays.asList(new Image(fileName));
//                repository.saveAll(images);

            } catch (IOException err) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패!");
            }
            imgUrlList.add(fileName);
        }
        return imgUrlList;
    }

    public void deleteS3(List<Image> imgs){
        System.out.println("deleteS3 method Call!!!");
        for (Image img : imgs){
            System.out.println(img.getFile_name());
            amazonS3.deleteObject(bucket, img.getFile_name());
        }
    }

    public List<Image> findImages(int postId) {
        Post foundPost = postRepository.getReferenceById(postId);
        List<Image> imageList = repository.findAllByPost(foundPost);
        System.out.println(imageList);
        return imageList;
    }

}
