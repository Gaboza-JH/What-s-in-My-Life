package com.example.wil.controller;

import com.amazonaws.util.CollectionUtils;
import com.example.wil.DTO.PostDTO;
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

@RestController
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imgService;

    @Bean
    MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory multipartConfigFactory = new MultipartConfigFactory();
        multipartConfigFactory.setLocation("d://data/tmp");
        return multipartConfigFactory.createMultipartConfig();
    }

    @PostMapping("/post")
    public PostDTO putUpPost(@RequestPart(value = "PostDTO", required = false) PostDTO postDTO, @RequestPart(value = "image", required = false) List<MultipartFile> multipartFile) throws IOException {
        List<String> imgPaths = new ArrayList<>();

        System.out.println("putUpPost !!!");
        System.out.println("postController multipartfile empty? "+multipartFile.isEmpty());
        System.out.println(CollectionUtils.isNullOrEmpty(multipartFile));
        System.out.println(multipartFile.size());
        for (MultipartFile imgfile :multipartFile) {

//            if (!multipartFile.isEmpty()) {
//                String defaultDir = "static";
//                imgPaths = imgService.upload(multipartFile, defaultDir);
//            }
            
            if (imgfile.getContentType().equals("image/png") |
                    imgfile.getContentType().equals("image/jpg") |
                    imgfile.getContentType().equals("image/jpeg") |
                    imgfile.getContentType().equals("image/gif") |
                    imgfile.getContentType().equals("image/webp")){
                String defaultDir = "static";
                imgPaths = imgService.upload(multipartFile, defaultDir);
            }
        }

        return postService.putUpPost(postDTO, imgPaths);
    }

    @GetMapping("/post")
    public List<PostDTO> findAllPosts() {return postService.findAllPosts();}

    @GetMapping("/post/{postId}")
    public PostDTO findPostByPostId(@PathVariable int postId) { return postService.findPostByPostId(postId); }

    @DeleteMapping("/post/{postId}")
    public List<PostDTO> deletePost(@PathVariable int postId) {return postService.deletePost(postId); }

    @PutMapping("/post/{postId}")
    public PostDTO updatePost(@PathVariable int postId, @RequestBody PostDTO postDTO) {return postService.updatePost(postId, postDTO); }

}
