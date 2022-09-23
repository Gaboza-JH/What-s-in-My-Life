package com.example.wil.config.jwt;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.wil.DTO.LoginRequestDto;
import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.config.auth.PrincipalDetailsService;
import com.example.wil.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.example.wil.config.oauth.PrincipalOauth2UserService;
import com.example.wil.model.User;
import com.example.wil.util.HeaderUtils;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import lombok.Getter;
import lombok.Setter;
import org.apache.tomcat.util.http.HeaderUtil;
import org.hibernate.annotations.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.UriComponentsBuilder;

// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter가 있음
// /login 요청해서 username, password 전송하면 (post)
// UsernamePasswordAuthenticationFilter 동작을 함
@RequiredArgsConstructor
@Getter
@Setter
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

//    @Autowired
//    private TokenProvider tokenProvider;

//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain)  throws ServletException, IOException {
//
//        String tokenStr = HeaderUtils.getAccessToken(request);
//
//        if (tokenProvider.validateToken(tokenStr)) {
//            Authentication authentication = tokenProvider.getAuthentication(tokenStr);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//
//        filterChain.doFilter(request, response);
//    }


    // Authentication 객체 만들어서 리턴 => 의존 : AuthenticationManager
    // 인증 요청시에 실행되는 함수 => /login
    private final AuthenticationManager authenticationManager;
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;


    // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        System.out.println("JwtAuthenticationFilter : 진입 (로그인 시도중)");

        // request에 있는 username과 password를 파싱해서 자바 Object로 받기
        ObjectMapper om = new ObjectMapper();
//        LoginRequestDto loginRequestDto = null;
        try {
//            loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
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

            //PrincipalDetailsService의 loadUserByUsername() 함수가 실행된 후 정상이면 authentication이 리턴됨
            //DB에 있는 username과 password가 일치한다.

            // authenticate() 함수가 호출 되면 인증 프로바이더가 유저 디테일 서비스의
            // loadUserByUsername(토큰의 첫번째 파라메터) 를 호출하고
            // UserDetails를 리턴받아서 토큰의 두번째 파라메터(credential)과
            // UserDetails(DB값)의 getPassword()함수로 비교해서 동일하면
            // Authentication 객체를 만들어서 필터체인으로 리턴해준다.

            // Tip: 인증 프로바이더의 디폴트 서비스는 UserDetailsService 타입
            // Tip: 인증 프로바이더의 디폴트 암호화 방식은 BCryptPasswordEncoder
            // 결론은 인증 프로바이더에게 알려줄 필요가 없음.
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetailis = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료됨 : "+principalDetailis.getUser().getUsername());

            // authentication 객체가 session영역에 저장을 해야하고 그 방법이 return 해주면 됨.
            // return의 이유는 권한 관리를 security가 대신해주기 때문에 편하려고 하는거임.
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한처리때문에 session 넣어준다.
            return authentication;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // attemptAuthentication실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행이 된다.
    // 이곳에서 JWT 토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response해주면 됨.
    // JWT Token 생성해서 response에 담아주기
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication 진입");
        PrincipalDetails principalDetailis = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(Integer.toString(principalDetailis.getUser().getId()))
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
//                .withClaim("id", principalDetailis.getUser().getId())
//                .withClaim("username", principalDetailis.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));



        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken); // 헤더에 안들어가 있음

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"jwtToken\"" + ":" + "\"Bearer " + jwtToken + "\" + "+"}");
//        response.getWriter().write("{\"jwtToken\"" + ":" + "\"Bearer " + jwtToken + "\""
//                + ",\"refreshToken\"" + ":" + "\"Bearer " + jwtToken + "\"" +"}");

        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();
        format1.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        String startTime = format1.format(time);
        System.out.println(startTime);

        String redirectUrl = UriComponentsBuilder.fromHttpUrl("http://3.37.184.148/")
                .queryParam("token", jwtToken)
                .queryParam("expiredTime", JwtProperties.EXPIRATION_TIME) // 만료 시간도 같이 보내줌
                .queryParam("startTime", startTime)
                .build().toUriString();

        System.out.println("redirectUrl : " + redirectUrl);

        response.getWriter().write(redirectUrl);
//        oAuth2AuthenticationSuccessHandler.onAuthenticationSuccess(request, response, authResult);
//        redirectStrategy.sendRedirect(request, response, redirectUrl);
        System.out.println("jwtToken : " + jwtToken);
        System.out.println("successfulAuthentication 성공, UsernamePasswordAuthenticationToken 생성 완료");
        response.sendRedirect(redirectUrl);
        return;
    }

}
