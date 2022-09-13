package com.example.wil.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Image;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.ImageRepository;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ImageRepository imgRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imgService;


    @Transactional
    public PostDTO putUpPost(PostDTO postDTO, List<String> imgPaths) {
        System.out.println("PostService :: PutUpPost :: ");
        System.out.println("imgList :" + imgPaths);
        System.out.println("imgList? :" + imgPaths.isEmpty());
        Post post = transformPost(postDTO);
        System.out.println("postDTO::::"+post.getUser());
        post = postRepository.save(post);
        System.out.println("post value ?? : : : " + post);

        List<String> imgUrlList = new ArrayList<>();

        if(imgPaths.isEmpty()==false) {
            for (String imgUrl : imgPaths) {
                Image img = new Image(imgUrl, post);
                System.out.println("img::::" + img);
                imgRepository.save(img);
                System.out.println("repository success");
                imgUrlList.add(imgUrl);
            }
        }
        System.out.println("imgURLList : : : " + imgUrlList);
        return transformPostDTO(post);
    }

    public List<PostDTO> findAllPosts() {
        List<Post> postList = postRepository.findAll();

        return transformPostDTOList(postList);
    }

    public PostDTO findPostByPostId(int postId) {
        Post foundPost = postRepository.getReferenceById(postId);
        return transformPostDTO(foundPost);
    }

//    public PostDTO findPostByUserId(int userId) {
//        Post foundPost = postRepository.findByUserId(userId);
//        return transformPostDTO(foundPost);
//    }


    public List<PostDTO> deletePost(int postId) {
        System.out.println("PostService Delete Method Call!");


        Post foundPost = postRepository.getReferenceById(postId);
        List<Post> postList = postRepository.findAll();
/**
 * s3 버킷에 있는 이미지도 삭제
 */
        List<Image> imgs = imgRepository.findAllByPost(foundPost);
        System.out.println("imgs ::"+imgs);
        imgService.deleteS3(imgs);

        postRepository.delete(foundPost);

        return transformPostDTOList(postList);
    }

    public PostDTO updatePost(int postId, PostDTO postDTO) {
        Post foundPost = postRepository.getReferenceById(postId);
        foundPost.setContent(postDTO.getContent());
        foundPost.setShown(postDTO.isShown());
        Post updatedPost = postRepository.save(foundPost);
        return transformPostDTO(updatedPost);
    }

    private Post transformPost(PostDTO postDTO){
        User user = userRepository.getReferenceById(postDTO.getUserId());
        return Post
                .builder()
                .postId(postDTO.getPostId())
                .content(postDTO.getContent())
                .shown(postDTO.isShown())
                .createDate(postDTO.getCreateDate())
                .user(user)
                .build();
    }

    private PostDTO transformPostDTO(Post post){
        return PostDTO
                .builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .shown(post.isShown())
                .createDate(post.getCreateDate())
                .userId(post.getUser().getId())
                .build();
    }

    private List<PostDTO> transformPostDTOList(List<Post> postList){
        List<PostDTO> postDTOList = new ArrayList<>();
        for (Post post : postList) {
            postDTOList.add(transformPostDTO(post));
        }
        return postDTOList;
    }

}
