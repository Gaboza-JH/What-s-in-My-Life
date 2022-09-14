package com.example.wil.controller;

import com.example.wil.DTO.UserDTO;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
import com.example.wil.service.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserDTO signUp(@RequestBody UserDTO userDTO) {return userService.signUp(userDTO);}

    @GetMapping("/users")
    public List<UserDTO> findAllUsers() {return userService.findAllUsers();}

    @GetMapping("/users/{token}")
    public UserDTO findUserById(@PathVariable String token) {
        System.out.println("getmapping");

        if (tokenProvider.validateToken(token)) {
            System.out.println("getmapping true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return userService.findUserById(userId);
        } else {
            return null;
        }
    }

    @DeleteMapping("/users/{userId}")
    public List<UserDTO> deleteUser(@PathVariable int userId) {return userService.deleteUser(userId); }

    @PutMapping("/users/{token}")
    public UserDTO updateUser(@PathVariable String token, @RequestBody UserDTO userDTO) {
        System.out.println("putmapping");

        if (tokenProvider.validateToken(token)) {
            System.out.println("putmapping true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return userService.updateUser(userId, userDTO);
        } else {
            return null;
        }
    }

}
