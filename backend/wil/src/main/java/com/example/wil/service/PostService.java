package com.example.wil.service;

import com.example.wil.DTO.PostDTO;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post save(Post post){
        postRepository.save(post);
        return post;
    }

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public List<Post> delete(int postId) {
        final Optional<Post> foundPost = postRepository.findById(postId);
        foundPost.ifPresent(post -> {
            postRepository.delete(post);
        });
        return postRepository.findAll();
    }

    public List<Post> update(int postId, Post post) {

        final Optional<Post> foundPost = postRepository.findById(postId);

        foundPost.ifPresent(newpost -> {
            newpost.setContent(post.getContent());
            newpost.setShown(post.isShown());
            postRepository.save(newpost);
        });

        return postRepository.findAll();

    }



}
