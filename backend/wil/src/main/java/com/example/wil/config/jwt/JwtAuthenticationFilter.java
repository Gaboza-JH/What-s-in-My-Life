package com.example.wil.config.jwt;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.example.wil.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.web.util.UriComponentsBuilder;


// 인증 (Authentication)
@RequiredArgsConstructor
@Getter
@Setter
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;


    // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        System.out.println("JwtAuthenticationFilter : 진입 (로그인 시도중)");

        ObjectMapper om = new ObjectMapper();
        try {
            User user = om.readValue(request.getInputStream(),User.class);
            System.out.println(user);
            System.out.println("JwtAuthenticationFilter : " + user);

            // UsernamePasswordAuthenticationToken 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword());

            System.out.println("JwtAuthenticationFilter : 토큰 생성 완료");
            System.out.println(authenticationToken);

            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetailis = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료됨 : "+principalDetailis.getUser().getUsername());

            return authentication;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication 진입");
        PrincipalDetails principalDetailis = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(Integer.toString(principalDetailis.getUser().getId()))
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));


//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write("{\"jwtToken\"" + ":" + "\"Bearer " + jwtToken + "\" + "+"}");

        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();
        format1.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        String startTime = format1.format(time);
        System.out.println(startTime);

        String redirectUrl = UriComponentsBuilder.fromHttpUrl("http://localhost:3000/")
                .queryParam("token", jwtToken)
                .queryParam("expiredTime", JwtProperties.EXPIRATION_TIME)
                .queryParam("startTime", startTime)
                .build().toUriString();

        System.out.println("redirectUrl : " + redirectUrl);

        response.getWriter().write(redirectUrl);
        System.out.println("jwtToken : " + jwtToken);
        System.out.println("successfulAuthentication 성공, UsernamePasswordAuthenticationToken 생성 완료");
        response.sendRedirect(redirectUrl);
        return;
    }

}
