package com.example.wil.config;

import com.example.wil.config.jwt.JwtAuthenticationFilter;
import com.example.wil.config.jwt.JwtAuthorizationFilter;
import com.example.wil.config.oauth.OAuth2AuthenticationFailureHandler;
import com.example.wil.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.example.wil.config.auth.PrincipalDetailsService;
import com.example.wil.config.oauth.PrincipalOauth2UserService;
import com.example.wil.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.example.wil.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private PrincipalDetailsService principalDetailsService;
    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    // 등록된 AuthenticationManager을 불러오기 위한 Bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

//
//    //Filter 등록을 위한 Bean
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter(AuthenticationManager authenticationManager) {
//        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
////        jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
//
//        SecurityContextRepository contextRepository = new HttpSessionSecurityContextRepository();
//        jwtAuthenticationFilter.setSecurityContextRepository(contextRepository);
//
//        return jwtAuthenticationFilter;
//    }
//
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
//        return new JwtAuthenticationFilter(authenticationManager(new AuthenticationConfiguration()));
//    }

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        // Configure AuthenticationManagerBuilder
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        // Get AuthenticationManager
//        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
        AuthenticationManager authenticationManager = authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));
//        JwtAuthenticationFilter jwtAuthenticationFilter = jwtAuthenticationFilter(authenticationManager);

        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .httpBasic().disable();

        http
                .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository))

                // authorizeRequests() : 요청에 대한 권한 지정. Security 처리에 HttpServletRequest를 이용한다는 것을 의미한다
                .authorizeRequests()
                // antMatchers() : 특정 경로를 지정합니다. 보통 뒤에 다른 메서드가 붙습니다
                // authenticated() : 인증된 사용자만이 접근할 수 있습니다
                .antMatchers("/user/**").authenticated()
                // anyRequest() : 설정한 경로 외에 모든 경로를 뜻합니다
                // permitAll() : 어떤 사용자든지 접근할 수 있습니다
                .anyRequest().permitAll()
                .and()
                // form-data 방식 로그인, form 로그인 인증 기능이 작동함
                .formLogin()
                .loginPage("http://localhost:3000/loginsignup") // 사용자 정의 로그인 페이지의 url 설정, default: /login
                .usernameParameter("email") // 아이디 파라미터명 설정, default: username
                .passwordParameter("password") // 패스워드 파라미터명 설정, default: password
                .loginProcessingUrl("/login") // 사용자 이름과 암호를 제출할 URL, 로그인 Form Action Url, default: /login
                .defaultSuccessUrl("/success", true) // 로그인 성공 후 이동 페이지 url, true 했는데도 이동 안됨
                .failureUrl("/fail")
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler(oAuth2AuthenticationFailureHandler)
                .and()
                .oauth2Login()// OAuth 2 로그인 기능에 대한 여러 설정의 진입점
                .loginProcessingUrl("/oauth2")
//                .defaultSuccessUrl("http://localhost:3000/") // 프론트로 안감
                .authorizationEndpoint().baseUri("/oauth2/authorization") // 소셜 로그인 Url
                .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository) // 인증 요청을 쿠키에 저장하고 검색
                .and()
                .redirectionEndpoint().baseUri("/login/oauth2/code/*") // 소셜 인증 후 Redirect Url (서버쪽)
                .and()
                .userInfoEndpoint().userService(principalOauth2UserService) // 소셜의 회원 정보를 받아와 가공처리
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler) // 인증 성공 시 Handler
                .failureHandler(oAuth2AuthenticationFailureHandler); // 인증 실패 시 Handler



        http
                // AuthenticationManager를 통해서 로그인을 진행하기 때문에 꼭 파라미터로 넣어줘야 함
                // Spring에서 기본적으로 제공하는 클래스이다. username과 password를 매개변수로 받는다
                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class);
//                .addFilterBefore(new JwtAuthorizationFilter(authenticationManager, userRepository));


//                .antMatchers("/users/**", "/post/**")
//                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/manager/**")
//                .access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/admin/**")
//                .access("hasRole('ROLE_ADMIN')")
//                .anyRequest().permitAll();

        return http.build();


//        http
//                .csrf().disable();
//        http
//                .authorizeRequests()
//                .antMatchers("/user/**").authenticated()
//                .anyRequest().permitAll()
//                .and()
//                .formLogin()
//                .loginPage("/loginForm")
//                .loginProcessingUrl("/login")
//                .defaultSuccessUrl("/")
//                .and()
//                .oauth2Login()
//                .loginPage("/loginForm")
//                .userInfoEndpoint()
//                .userService(principalOauth2UserService);

    }

}
