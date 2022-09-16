package com.example.wil.controller;

import com.amazonaws.util.CollectionUtils;
import com.example.wil.DTO.PostDTO;
import com.example.wil.DTO.UserDTO;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.service.ImageService;
import com.example.wil.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.MultipartConfigElement;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imgService;

    @Autowired
    private TokenProvider tokenProvider;

    @Bean
    MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory multipartConfigFactory = new MultipartConfigFactory();
        multipartConfigFactory.setLocation("c://data/tmp");
        return multipartConfigFactory.createMultipartConfig();
    }

    // 기존 방식 : PostDTO에 userId 같이 넣어줬음
//    @PostMapping("/post")
//    public PostDTO putUpPost(@RequestPart(value = "PostDTO", required = false) PostDTO postDTO, @RequestPart(value = "image", required = false) List<MultipartFile> multipartFile) throws IOException {
//        List<String> imgPaths = new ArrayList<>();
//
//        System.out.println("putUpPost !!!");
//        System.out.println("postController multipartfile empty? " + multipartFile.isEmpty());
//        System.out.println(CollectionUtils.isNullOrEmpty(multipartFile));
//        System.out.println(multipartFile.size());
//        for (MultipartFile imgfile : multipartFile) {
//            if (Objects.equals(imgfile.getContentType(), "image/png") |
//                    Objects.equals(imgfile.getContentType(), "image/jpg") |
//                    Objects.equals(imgfile.getContentType(), "image/jpeg") |
//                    Objects.equals(imgfile.getContentType(), "image/gif") |
//                    Objects.equals(imgfile.getContentType(), "image/webp")) {
//                String defaultDir = "static";
//                imgPaths = imgService.upload(multipartFile, defaultDir);
//            } else {
//                break;
//            }
//
//        }
//        return postService.putUpPost(postDTO, imgPaths);
//    }

    // token 방식 : token에서 userId 얻어냄
    @PostMapping("/post/{token}")
    public PostDTO putUpPost(@PathVariable String token, @RequestPart(value = "PostDTO", required = false) PostDTO postDTO, @RequestPart(value = "image", required = false) List<MultipartFile> multipartFile) throws IOException {
        System.out.println("/post/{token} postmapping");

        // 프론트에 저장되어 있는 토큰

        // 저장된 토큰을 이용해서 값을 리턴해주는 메서드를 만듦
        if (tokenProvider.validateToken(token)) {
            System.out.println("/post/{token} postmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
//            if(postDTO.getUserId() == userId)
            List<String> imgPaths = new ArrayList<>();
            System.out.println("imgPaths : " + imgPaths);

            System.out.println("putUpPost !!!");
            System.out.println("postController multipartfile empty? "+multipartFile.isEmpty());
            System.out.println(CollectionUtils.isNullOrEmpty(multipartFile));
            System.out.println(multipartFile.size());
            for (MultipartFile imgfile :multipartFile) {
                if (Objects.equals(imgfile.getContentType(), "image/png") |
                        Objects.equals(imgfile.getContentType(), "image/jpg") |
                        Objects.equals(imgfile.getContentType(), "image/jpeg") |
                        Objects.equals(imgfile.getContentType(), "image/gif") |
                        Objects.equals(imgfile.getContentType(), "image/webp")){
                    String defaultDir = "static";
                    imgPaths = imgService.upload(multipartFile, defaultDir);
                }else {
                    break;
                }
            }
            return postService.putUpPost(userId, postDTO, imgPaths);
        } else {
            return null;
        }

    }

    @GetMapping("/post/")
    public List<PostDTO> findAllPosts() {return postService.findAllPosts();}

    @GetMapping("/post/user/{token}")
    public List<PostDTO> findAllPostByUserId(@PathVariable String token) {
        System.out.println("/post/user/{token} getmapping");
        if (tokenProvider.validateToken(token)) {
            System.out.println("/post/user/{token} getmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return postService.findAllPostByUserId(userId);
        } else {
            return null;
        }
    }

    @GetMapping("/post/{postId}")
    public PostDTO findPostByPostId(@PathVariable int postId) { return postService.findPostByPostId(postId); }

    @DeleteMapping("/post/{postId}")
    public List<PostDTO> deletePost(@PathVariable int postId) {return postService.deletePost(postId); }

    @PutMapping("/post/{postId}")
    public PostDTO updatePost(@PathVariable int postId, @RequestBody PostDTO postDTO) {return postService.updatePost(postId, postDTO); }

}
