package com.example.wil.service;

import com.example.wil.model.User;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User signUp(User user){
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        userRepository.save(user);
        return user;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<User> findUserById(int userId) {
        userRepository.getReferenceById(userId);
        return userRepository.findAll();
    }

    public List<User> deleteUser(int userId) {
        User foundUser = userRepository.getReferenceById(userId);
        userRepository.delete(foundUser);
        return userRepository.findAll();
    }

    public List<User> updateUser(int userId, User user) {
        User foundUser = userRepository.getReferenceById(userId);
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        foundUser.setPassword(encPassword);
        foundUser.setEmail(user.getEmail());
        foundUser.setNickname(user.getNickname());
        userRepository.save(foundUser);
        return userRepository.findAll();
    }



}
