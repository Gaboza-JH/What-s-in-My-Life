package com.example.wil.controller;


import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Post;
import com.example.wil.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/post")
    public PostDTO putUpPost(@RequestBody PostDTO postDTO) {return postService.putUpPost(postDTO);}

    @GetMapping("/post")
    public List<PostDTO> findAllPosts() {return postService.findAllPosts();}

    @GetMapping("/post/{postId}")
    public PostDTO findPostByPostId(@PathVariable int postId) { return postService.findPostByPostId(postId); }

    @DeleteMapping("/post/{postId}")
    public List<PostDTO> deletePost(@PathVariable int postId) {return postService.deletePost(postId); }

    @PutMapping("/post/{postId}")
    public PostDTO updatePost(@PathVariable int postId, @RequestBody PostDTO postDTO) {return postService.updatePost(postId, postDTO); }

}
