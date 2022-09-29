package com.example.wil.config.auth;

import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.attribute.UserPrincipal;
import java.util.Optional;

// http://localhost:8080/login
// (Spring Security 로그인 기본 요청 주소가 /login임 )
// 로그인 요청이 올 때 PrincipalDetailService 동작함

// UserDetailsService :
// Spring Security에서 유저의 정보를 가져오는 인터페이스
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    // 프론트에서 email, password를 보냄
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUsername() 동작");
        System.out.println(email);
        User userEntity = userRepository.findByEmail(email);
//        User userEntity = userRepository.findByUsername(username);
        System.out.println(userEntity);
        if(userEntity != null){
            return new PrincipalDetails(userEntity);
        }
        return null;
    }

}

