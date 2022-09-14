package com.example.wil.repository;

import com.example.wil.model.Likes;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
public interface LikesRepository extends JpaRepository<Likes, Integer> {
    Optional<Likes> findByUserIdAndPostId(User user, Post post);
    int countByPostId(Post post);
    int countByUserId(User user);
}
