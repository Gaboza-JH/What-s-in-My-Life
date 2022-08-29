package com.example.wil.service;

import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User save(User user){
        userRepository.save(user);
        return user;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> delete(int userId) {
        final Optional<User> foundUser = userRepository.findById(userId);
        foundUser.ifPresent(user -> {
            userRepository.delete(user);
        });
        return userRepository.findAll();
    }

    public List<User> update(int userId, User user) {

        final Optional<User> foundUser = userRepository.findById(userId);

        foundUser.ifPresent(newUser -> {
            newUser.setPassword(user.getPassword());
            newUser.setEmail(user.getEmail());
            userRepository.save(newUser);
        });

        return userRepository.findAll();

    }
}
