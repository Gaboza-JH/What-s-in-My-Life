package com.example.wil.controller;


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
    public Post save(@RequestBody Post post) {return postService.save(post);}

    @GetMapping("/post")
    public List<Post> findAll() {return postService.findAll();}

    @DeleteMapping("/post/{postId}")
    public List<Post> delete(@PathVariable int postId) {return postService.delete(postId); }

    @PutMapping("/post/{postId}")
    public List<Post> update(@PathVariable int postId, @RequestBody Post post) {return postService.update(postId, post); }

}
