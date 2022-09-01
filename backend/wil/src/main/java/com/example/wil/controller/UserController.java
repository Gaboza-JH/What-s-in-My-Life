package com.example.wil.controller;

import com.example.wil.DTO.UserDTO;
import com.example.wil.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public UserDTO signUp(@RequestBody UserDTO userDTO) {return userService.signUp(userDTO);}

    @GetMapping("/users")
    public List<UserDTO> findAllUsers() {return userService.findAllUsers();}

    @GetMapping("/Users/{userId}")
    public UserDTO findUserById(@PathVariable int userId) {return userService.findUserById(userId);}

    @DeleteMapping("/users/{userId}")
    public List<UserDTO> deleteUser(@PathVariable int userId) {return userService.deleteUser(userId); }

    @PutMapping("/users/{userId}")
    public UserDTO updateUser(@PathVariable int userId, @RequestBody UserDTO userDTO) {return userService.updateUser(userId, userDTO); }

}
