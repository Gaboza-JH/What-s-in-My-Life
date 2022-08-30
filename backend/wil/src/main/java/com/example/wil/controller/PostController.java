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
    public PostDTO save(@RequestBody PostDTO postDTO) {return postService.save(postDTO);}

    @GetMapping("/post")
    public List<PostDTO> findAll() {return postService.findAll();}

    @DeleteMapping("/post/{postId}")
    public List<PostDTO> delete(@PathVariable int postId) {return postService.delete(postId); }

    @PutMapping("/post/{postId}")
    public PostDTO update(@PathVariable int postId, @RequestBody PostDTO postDTO) {return postService.update(postId, postDTO); }

}
