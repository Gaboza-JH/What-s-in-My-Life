package com.example.wil.repository;

import com.example.wil.model.Post;
import com.example.wil.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByUser(Optional<User> user);
//    List<Post> findAllByUser(Optional<User> user, Sort sort);

}
