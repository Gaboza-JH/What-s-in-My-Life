package com.example.wil.controller;

import com.example.wil.DTO.LikesDTO;
import com.example.wil.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikesService likesService;

    //좋아요 등록
    @Transactional
    @PostMapping("/like")
    public boolean addLike(@RequestBody LikesDTO likesDTO)
    {
        System.out.println(">>Likes Controller ");
        System.out.println(likesDTO.getPostId());
        System.out.println(likesDTO.getUserId());
        int userId = likesDTO.getUserId();
        int postId = likesDTO.getPostId();

        //if (user session 정보가 있을때 (로그인 했을때)){ // user의 세션을 가지고 와서 session 정보와 맞을때 수행할 수 있도록 변경 필요
        boolean result = likesService.addLike(userId, postId);
        //}
        return result;
    }

    //좋아요 취소
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

}
