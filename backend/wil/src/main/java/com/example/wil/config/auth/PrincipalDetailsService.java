package com.example.wil.config.auth;

import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// http://localhost:8080/login
// (Spring Security 로그인 기본 요청 주소가 /login임 )
// 로그인 요청이 올 때 PrincipalDetailService 동작함

// 근데 formLogin().disable() 때문에 저 Url에서 동작 안함

// UserDetailsService :
// Spring Security에서 유저의 정보를 가져오는 인터페이스
@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUsername() 동작");
        User userEntity = userRepository.findByUsername(username);
        if(userEntity != null){
            return new PrincipalDetails(userEntity);
        }
        return null;
    }
}
