package com.example.wil.service;

import com.example.wil.DTO.LikesDTO;
import com.example.wil.model.Likes;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.LikesRepository;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Getter
@Service
public class LikesService {
    @Autowired
    private final LikesRepository likesRepository;
    @Autowired
    private final PostRepository postRepository;
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PostService postService;

    //좋아요 추가
    public boolean addLike(int userId, int postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        //좋아요 중복 체크
        if(isLike(user, post)){
            likesRepository.save(new Likes(user, post));
            return true;
        }
        return false;
    }

    //좋아요 중복 체크 로직
    private boolean isLike(User user, Post post) {
        return likesRepository.findByUserIdAndPostId(user, post).isEmpty();
    }

    //좋아요 취소
    public void cancelLike(int userId, int postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        Likes like = likesRepository.findByUserIdAndPostId(user, post).orElseThrow();
        likesRepository.delete(like);
    }

    //게시물당 좋아요 count
    public int countLike(int postId){
        Post post = postRepository.findById(postId).orElseThrow();
        return likesRepository.countByPostId(post);
    }

    public int countLikesByUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Post> postList = postRepository.findAllByUser(Optional.of(user), Sort.by(Sort.Direction.DESC, "postId"));

        int userPostCnt = 0;
        for (Post post:postList){
            userPostCnt+=likesRepository.countByPostId(post);
        }
        return userPostCnt;
    }

    public List<Integer> getUserIdList(int postId) {
        List<Integer> likesUserIdListByPostId = new ArrayList<>();
        Post foundPost = postRepository.getReferenceById(postId);
        List<Likes> likesListByPostId = likesRepository.findAllByPostId(foundPost);
        for (Likes likes: likesListByPostId) {
            likesUserIdListByPostId.add(likes.getUserId().getId());
        }
        return likesUserIdListByPostId;
    }

    public List<Integer> getPostIdList(int userId) {
        List<Integer> likesPostIdListByUserId = new ArrayList<>();
        User foundUser = userRepository.getReferenceById(userId);
        List<Likes> likesListByPostId = likesRepository.findAllByUserId(foundUser);
        for (Likes likes: likesListByPostId) {
            likesPostIdListByUserId.add(likes.getPostId().getPostId());
        }
        return likesPostIdListByUserId;
    }

    private LikesDTO transformLikesDTO(Likes likes) {
        return LikesDTO.builder()
                .likeId(likes.getLikeId())
                .userId(likes.getUserId().getId())
                .postId(likes.getPostId().getPostId())
                .build();
    }

    public List<Likes> likesFindAll() {
        return likesRepository.findAll();
    }
}
