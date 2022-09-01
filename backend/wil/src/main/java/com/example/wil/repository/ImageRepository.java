package com.example.wil.repository;

import com.example.wil.model.ImagePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImagePost, Integer> {

}
