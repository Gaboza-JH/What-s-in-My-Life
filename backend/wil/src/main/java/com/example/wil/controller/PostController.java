package com.example.wil.controller;


import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Post;
import com.example.wil.service.ImageService;
import com.example.wil.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ImageService imgService;

    @PostMapping("/post")
    public PostDTO putUpPost(@RequestPart(value = "PostDTO", required = false) PostDTO postDTO, @RequestPart(value = "image", required = false) List<MultipartFile> multipartFile) throws IOException {
        System.out.println("putUpPost에요");

        String defaultDir = "static";
        List<String> imgPaths = imgService.upload(multipartFile, defaultDir);
        System.out.println("Post imgurl??::::"+imgPaths);
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
