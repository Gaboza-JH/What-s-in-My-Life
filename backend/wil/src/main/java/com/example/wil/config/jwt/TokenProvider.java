package com.example.wil.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
import com.example.wil.exception.TokenValidFailedException;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.security.SignatureException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TokenProvider {

    public String createToken(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

//        Jwts.builder().compact(); 이 방식이랑 무슨 차이인지 찾아보기
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(System.currentTimeMillis()+ JwtProperties.ACCESS_TOKEN_EXPIRE_TIME);

        String accessToken = JWT.create()
                .withSubject(Integer.toString(principal.getUser().getId())) // payload "sub": "userId integer 값"
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.ACCESS_TOKEN_EXPIRE_TIME)) // payload "exp": 1516239022 (예시)
                .sign(Algorithm.HMAC512(JwtProperties.SECRET)); // header "alg": "HS512"

//        String accessToken = JWT.create()
//                .withSubject(principal.getUser().getUsername()) // payload "sub": "name"
//                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.ACCESS_TOKEN_EXPIRE_TIME)) // payload "exp": 1516239022 (예시)
//                .withClaim("auth", principal.getUser().getRole()) // payload "auth": "ROLE_USER"
//                .withClaim("id", principal.getUser().getId())
//                .withClaim("nickname", principal.getUser().getNickname())
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET)); // header "alg": "HS512"

        System.out.println("Access Token : " + accessToken);

        // Refresh Token 생성
        String refreshToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.REFRESH_TOKEN_EXPIRE_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        return accessToken;

//        return TokenDto.builder()
//                .grantType(JwtProperties.TOKEN_PREFIX)
//                .accessToken(accessToken)
//                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
//                .refreshToken(refreshToken)
//                .build();
    }

    // JWT 토큰 정보 확인
    public Integer getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(JwtProperties.SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();

        System.out.println("id : " + claims.getSubject());
//        System.out.println("username : " + claims.get("username"));
//        System.out.println("nickname : " + claims.get("nickname"));

        return Integer.parseInt(claims.getSubject());
    }



    // JWT 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(JwtProperties.SECRET.getBytes()).build().parseClaimsJws(token);
            return true;
//        } catch (SignatureException e) { // 유효하지 않은 JWT 서명
//            throw new OAuth2AuthenticationProcessingException("not valid jwt signature");
        } catch (MalformedJwtException e) { // 유효하지 않은 JWT
            throw new OAuth2AuthenticationProcessingException("not valid jwt");
        } catch (io.jsonwebtoken.ExpiredJwtException e) { // 만료된 JWT
            throw new OAuth2AuthenticationProcessingException("expired jwt");
        } catch (io.jsonwebtoken.UnsupportedJwtException e) { // 지원하지 않는 JWT
            throw new OAuth2AuthenticationProcessingException("unsupported jwt");
        } catch (IllegalArgumentException e) { // 빈값
            throw new OAuth2AuthenticationProcessingException("empty jwt");
        }
    }

    public Authentication getAuthentication(String token) {

        if (validateToken(token)) {

            // 토큰 복호화
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(JwtProperties.SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            System.out.println("claims.getSubject() : " + claims.getSubject());

            // 클레임에서 권한 정보 가져오기
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(claims.get(JwtProperties.HEADER_STRING).toString().split(","))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            UserDetails principal = new User(claims.getSubject(), "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, token, authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }

}
