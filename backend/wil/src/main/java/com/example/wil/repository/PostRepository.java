package com.example.wil.repository;

import com.example.wil.model.Post;
import com.example.wil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
