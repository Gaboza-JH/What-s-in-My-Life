package com.example.wil.repository;

import com.example.wil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByUsername(String username);
    public User findByEmail(String email);
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
}
