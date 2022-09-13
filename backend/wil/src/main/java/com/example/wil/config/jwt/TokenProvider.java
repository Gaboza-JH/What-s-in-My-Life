package com.example.wil.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.exception.OAuth2AuthenticationProcessingException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.security.SignatureException;
import java.util.Date;

@AllArgsConstructor
@Service
public class TokenProvider {

    public String createToken(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

//        Jwts.builder().compact(); 이 방식이랑 무슨 차이인지 찾아보기
        String jwtToken = JWT.create()
                .withSubject(principal.getUser().getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principal.getUser().getId())
                .withClaim("username", principal.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        System.out.println("jwtToken : " + jwtToken);

        return jwtToken;
    }

//    public Long getUserIdFromToken(String token) {
//        Claims claims = Jwts.parser()
//                .setSigningKey(JwtProperties.SECRET)
//                .parseClaimsJws(token)
//                .getBody();
//        return Long.parseLong(claims.getSubject());
//    }

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

}
