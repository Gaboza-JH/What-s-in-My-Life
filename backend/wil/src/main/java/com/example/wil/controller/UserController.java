package com.example.wil.controller;

import com.example.wil.DTO.UserDTO;
import com.example.wil.DTO.UserNicknameRequestDto;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
import com.example.wil.model.User;
import com.example.wil.service.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.SignatureException;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/users")
    public UserDTO signUp(@RequestBody UserDTO userDTO) {
        return userService.signUp(userDTO);
    }

    @GetMapping("/users")
    public List<UserDTO> findAllUsers() {
        return userService.findAllUsers();
    }


    @GetMapping("/users/{token}")
    public UserDTO findUserById(@PathVariable String token) { //백엔드에서 계속 활용할 수 있게 저장
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