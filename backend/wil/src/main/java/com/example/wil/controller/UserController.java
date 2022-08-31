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
    public User save(@RequestBody User user) {return userService.save(user);}

    @GetMapping("/users")
    public List<User> findAll() {return userService.findAll();}

    @DeleteMapping("/users/{userId}")
    public List<User> delete(@PathVariable int userId) {return userService.delete(userId); }

    @PutMapping("/users/{userId}")
    public List<User> update(@PathVariable int userId, @RequestBody User user) {return userService.update(userId, user); }

}
