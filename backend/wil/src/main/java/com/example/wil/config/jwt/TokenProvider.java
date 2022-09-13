package com.example.wil.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
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
                .withSubject(principal.getUser().getUsername()) // payload "sub": "name"
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.ACCESS_TOKEN_EXPIRE_TIME)) // payload "exp": 1516239022 (예시)
                .withClaim("auth", principal.getUser().getRole()) // payload "auth": "ROLE_USER"
                .withClaim("id", principal.getUser().getId())
                .withClaim("nickname", principal.getUser().getNickname())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET)); // header "alg": "HS512"

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
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(JwtProperties.SECRET)
                .build()
                .parseClaimsJws(token)
                .getBody();

        System.out.println("id : " + claims.getId());
        System.out.println("username : " + claims.get("username"));
        System.out.println("nickname : " + claims.get("nickname"));

        return Long.parseLong(claims.getSubject());
    }


    // JWT 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(JwtProperties.SECRET).build().parseClaimsJws(token);
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

//    public Authentication getAuthentication(String token) {
//
//        if(token.validate()) {
//
//            Claims claims = authToken.getTokenClaims();
//            Collection<? extends GrantedAuthority> authorities =
//                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
//                            .map(SimpleGrantedAuthority::new)
//                            .collect(Collectors.toList());
//
//            log.debug("claims subject := [{}]", claims.getSubject());
//            org.springframework.security.core.userdetails.User principal = new User(claims.getSubject(), "", authorities);
//
//            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
//        } else {
//            throw new TokenValidFailedException();
//        }

}
