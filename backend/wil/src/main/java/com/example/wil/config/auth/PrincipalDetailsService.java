package com.example.wil.config.auth;

import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


// UserDetailsService
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUsername() 동작");
        System.out.println(email);
        User userEntity = userRepository.findByEmail(email);
        System.out.println(userEntity);
        if(userEntity != null){
            return new PrincipalDetails(userEntity);
        }
        return null;
    }

}

