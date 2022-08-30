package com.example.wil.service;

import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User save(User user){
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
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
