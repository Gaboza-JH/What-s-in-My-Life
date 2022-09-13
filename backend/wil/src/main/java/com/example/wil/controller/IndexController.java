package com.example.wil.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.oauth.PrincipalOauth2UserService;
import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;

@RestController
@RequiredArgsConstructor
@RequestMapping("oauth2/redirect_front")
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

//    @GetMapping({"","/"})
//    public String index(){
//        return "로그인 성공 ! 이제 프론트로 리다이렉트 url 바꿔보자";
//    }

    @GetMapping({"","/"})
    public void redirectToFront(HttpServletResponse response) throws IOException {
        String redirect_uri="http://localhost:3000/";
        response.sendRedirect(redirect_uri);
        System.out.println(response);
    }


//    @GetMapping("/user")
//    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principal) {
//        System.out.println("Principal : " + principal); //세션 정보 확인하기
//        System.out.println("OAuth2 : "+principal.getUser().getProvider());
//        Iterator<? extends GrantedAuthority> iter = principal.getAuthorities().iterator();
//        while (iter.hasNext()) {
//            GrantedAuthority auth = iter.next();
//            System.out.println(auth.getAuthority());
//        }
//        return "user";
//    }

//    @GetMapping("/oauth2/authorization/naver?redirect_uri=localhost:3000/")
//    public String ReactReq() {
//        return ""
//        System.out.println("getmapping success");
//    }


//    const NAVER_LOGIN_URL = "http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:8080/oauth2/redirect_front"
//    const KAKAO_LOGIN_URL = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:8080/oauth2/redirect_front"
//    const GOOGLE_LOGIN_URL = "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:8080/oauth2/redirect_front"

    // 원래는 프론트로 리다이렉트 되는 uri
//    @GetMapping("/oauth2/redirect_front/")
//    public String user() {
//        return "user";
//    }

//    @GetMapping(value = "token")
//    public String user(@RequestParam String token, Authentication authentication) {
//        return token;
//    }



//    @GetMapping("/oauth2/redirect_front/")
//    public String user(@RequestParam String token, Authentication authentication) {
//        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
//        System.out.println("Principal : " + principal); //세션 정보 확인하기
//        System.out.println("OAuth2 : "+principal.getUser().getProvider());
//        System.out.println("userId : "+principal.getUser().getId());
//        System.out.println("userName : "+principal.getUser().getUsername());
//        System.out.println("password : "+principal.getUser().getPassword());
//
////        String jwtToken = JWT.create()
////                .withSubject(principal.getUser().getUsername())
////                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))
////                .withClaim("id", principal.getUser().getId())
////                .withClaim("username", principal.getUser().getUsername())
////                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
////
////        System.out.println(jwtToken);
//
//        return token;
//    }

//    @GetMapping("/oauth2/authorization/naver")
//    public void loadNaverLoginPage(OAuth2UserRequest userRequest) {
//        principalOauth2UserService.loadUser(userRequest);
//    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "admin";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/manager")
    public @ResponseBody String manager() {
        return "manager";
    }

    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/info")
    public @ResponseBody String info(){
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/data")
    public @ResponseBody String data(){
        return "데이터정보";
    }

}
