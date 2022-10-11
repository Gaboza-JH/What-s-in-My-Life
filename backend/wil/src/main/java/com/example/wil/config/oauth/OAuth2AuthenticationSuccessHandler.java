package com.example.wil.config.oauth;

import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


// 소셜 인증(Authentication)에 성공했을 때 Handler
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        System.out.println("OAuth2AuthenticationSuccessHandler onAuthenticationSuccess() start");
        System.out.println(request);
        System.out.println(response);
        System.out.println(authentication);
        System.out.println("OAuth2AuthenticationSuccessHandler onAuthenticationSuccess() finish");

        String url = makeRedirectUrl(tokenProvider.createToken(authentication), JwtProperties.ACCESS_TOKEN_EXPIRE_TIME);

        if (response.isCommitted()) {
            System.out.println("응답이 이미 커밋된 상태입니다. " + url + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }
        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String token, Long expiredTime) {
        System.out.println("OAuth2AuthenticationSuccessHandler makeRedirectUrl() start and return");

        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();
        String startTime = format1.format(time);
        System.out.println(startTime);

        String redirectUrl = UriComponentsBuilder.fromHttpUrl("http://localhost:3000/")
                .queryParam("token", token)
                .queryParam("expiredTime", expiredTime) // 만료 시간도 같이 보내줌
                .queryParam("startTime", startTime)
                .build().toUriString();

        System.out.println("redirectUrl : " + redirectUrl);
        return redirectUrl;
    }

}
