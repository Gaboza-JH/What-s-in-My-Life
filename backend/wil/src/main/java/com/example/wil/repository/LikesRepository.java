package com.example.wil.repository;

import com.example.wil.DTO.LikesDTO;
import com.example.wil.model.Likes;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import org.hibernate.annotations.NamedNativeQueries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
public interface LikesRepository extends JpaRepository<Likes, Integer> {
    Optional<Likes> findByUserIdAndPostId(User user, Post post);
    int countByPostId(Post post);
    int countByUserId(User user);

    //"select new com.example.wil.DTO.LikesDTO(l.postId, (count(l.postId))) as topLikes " +

    @QueryHints
    @Query(value =
            "SELECT c.like_id, c.user_id, c.post_id " +
            "FROM likes AS c " +
            "GROUP BY c.post_id, wil_db.c.like_id " +
            "ORDER BY count(c.post_id) DESC " +
            "limit 5 ", nativeQuery = true )
    List<Likes> findGroupByPostId();

}
