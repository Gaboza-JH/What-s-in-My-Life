package com.example.wil.controller;

import com.example.wil.DTO.LikesDTO;
import com.example.wil.DTO.PostDTO;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.service.LikesService;
import com.example.wil.service.PostService;
import com.example.wil.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikesService likesService;

    private final TokenProvider tokenProvider;

    private final PostService postService;

    private final UserService userService;

//    // 좋아요 등록
//    @Transactional
//    @PostMapping("/like")
//    public boolean addLike(@RequestBody LikesDTO likesDTO)
//    {
//        System.out.println(">>Likes Controller ");
//        System.out.println(likesDTO.getPostId());
//        System.out.println(likesDTO.getUserId());
//        int userId = likesDTO.getUserId();
//        int postId = likesDTO.getPostId();
//
//        //if (user session 정보가 있을때 (로그인 했을때)){ // user의 세션을 가지고 와서 session 정보와 맞을때 수행할 수 있도록 변경 필요
//        boolean result = likesService.addLike(userId, postId);
//        //}
//        return result;
//    }

    // 좋아요 등록
    @Transactional
    @PostMapping("/like/{token}")
    public boolean addLike(@PathVariable String token, @RequestBody LikesDTO likesDTO)
    {
        System.out.println("/like/{token} postmapping");
        if (tokenProvider.validateToken(token)) {
            System.out.println("/like/{token} postmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            System.out.println(">>Likes Controller ");
            System.out.println(likesDTO.getPostId());
            System.out.println(likesDTO.getUserId());
            int postId = likesDTO.getPostId();

            //if (user session 정보가 있을때 (로그인 했을때)){ // user의 세션을 가지고 와서 session 정보와 맞을때 수행할 수 있도록 변경 필요
            boolean result = likesService.addLike(userId, postId);
            //}
            return result;
        } else {
            return false;
        }
    }

    // 좋아요 취소
    @DeleteMapping("/like")
    public ResponseEntity<String> unLike(@RequestBody LikesDTO likesDTO)
    {
        int userId = likesDTO.getUserId();
        int postId = likesDTO.getPostId();
        if(userId != 0) { // user의 세션을 가지고 와서 session 정보와 맞을때로 변경 필요
            likesService.cancelLike(userId, postId);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 포스트당 좋아요 조회
    @GetMapping("/like/{postId}")
    public int countLike(@PathVariable int postId){
        return likesService.countLike(postId);
    }

    // 유저의 포스트당 좋아요 조회
    @GetMapping("/like/user/{token}")
    public int countLikesByUser(@PathVariable String token){

        System.out.println("/like/user/{token} getmapping");
        if (tokenProvider.validateToken(token)) {
            System.out.println("/like/user/{token} getmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return likesService.countLikesByUser(userId);
        } else {
            return 0;
        }
    }

    //인기 게시물 Top 5 조회
    @GetMapping("/like/top_post")
    public List<PostDTO> topLike(){
        return postService.topLike();
    }
}
