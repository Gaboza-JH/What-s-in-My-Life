package com.example.wil.controller;

import com.example.wil.model.User;
import com.example.wil.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public User signUp(@RequestBody User user) {return userService.signUp(user);}

    @GetMapping("/users")
    public List<User> findAllUsers() {return userService.findAllUsers();}

    @GetMapping("/Users/{userId}")
    public List<User> findUserById(@PathVariable int userId) {return userService.findUserById(userId);}

    @DeleteMapping("/users/{userId}")
    public List<User> deleteUser(@PathVariable int userId) {return userService.deleteUser(userId); }

    @PutMapping("/users/{userId}")
    public List<User> updateUser(@PathVariable int userId, @RequestBody User user) {return userService.updateUser(userId, user); }

}
