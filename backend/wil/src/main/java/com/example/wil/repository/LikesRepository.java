package com.example.wil.repository;


import com.example.wil.model.Likes;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
public interface LikesRepository extends JpaRepository<Likes, Integer> {
    Optional<Likes> findByUserIdAndPostId(User user, Post post);
    List<Likes> findAllByPostId(Post post);
    List<Likes> findAllByUserId(User user);
    int countByPostId(Post post);
    int countByUserId(User user);

    @Query(value =
            "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))" +
            "SELECT c.like_id, c.user_id, c.post_id " +
            "FROM likes AS c " +
            "GROUP BY c.post_id, wil_db.c.like_id " +
            "ORDER BY count(c.post_id) DESC " +
            "limit 5 ", nativeQuery = true )
    List<Likes> findGroupByPostId();

}
