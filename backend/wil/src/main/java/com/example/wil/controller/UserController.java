package com.example.wil.controller;

import com.example.wil.DTO.UserDTO;
import com.example.wil.DTO.UserNicknameRequestDto;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
import com.example.wil.model.User;
import com.example.wil.service.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController{

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    // [해야 할 것]
    // 1. 프론트로 리다이렉트 or 프론트에서 받은 url로 리다이렉트
    // 2. 로컬 유저가 로그인을 할 때 email, password 보고 유저 찾아서 일치하는 경우 로그인 성공(프론트로 리다이렉트)
    @PostMapping("/users")
    public String signUp(HttpServletRequest request, HttpServletResponse response, @RequestBody UserDTO userDTO) throws IOException {
        String redirectUrl = userService.signUp(userDTO);
//        oAuth2AuthenticationSuccessHandler.onLocalLoginSuccess(request, response, redirectUrl);
        System.out.println("Redirect..");
        return redirectUrl;
    }

    @GetMapping("/users")
    public List<UserDTO> findAllUsers() {
        return userService.findAllUsers();
    }


    // 닉네임 수정
    @GetMapping("/users/{token}")
    public UserDTO findUserById(@PathVariable String token) {
        System.out.println("/users/{token} getmapping");
        if (tokenProvider.validateToken(token)) {
            System.out.println("/users/{token} getmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return userService.findUserById(userId);
        } else {
            return null;
        }
    }

    @DeleteMapping("/users/{userId}")
    public List<UserDTO> deleteUser(@PathVariable int userId) {
        return userService.deleteUser(userId);
    }

//    @PutMapping("/users/{userId}")
//    public UserDTO updateUser(@PathVariable int userId, @RequestBody UserDTO userDTO) {
//        return userService.updateUser(userId, userDTO);
//    }


    @Transactional
    @PutMapping("/users/{token}")
//    @RequestMapping(value = "/users/{token}", produces = "application/json",  method=RequestMethod.PUT)
    @ResponseBody
    public UserDTO updateUser(@PathVariable("token") String token, @RequestBody UserDTO userDTO) {
        System.out.println("/users/{token} putmapping");

        if (tokenProvider.validateToken(token)) {
            System.out.println("/users/{token} putmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            // token 따로 저장
            return userService.updateUser(userId, userDTO);
        } else {
            return null;
        }
    }

}