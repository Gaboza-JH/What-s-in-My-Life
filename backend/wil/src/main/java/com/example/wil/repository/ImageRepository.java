package com.example.wil.repository;

import com.example.wil.model.Image;
import com.example.wil.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    public List<Image> findAllByPost(Post postId);
}
