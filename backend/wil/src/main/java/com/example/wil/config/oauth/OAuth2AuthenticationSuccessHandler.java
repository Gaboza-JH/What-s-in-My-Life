package com.example.wil.config.oauth;

import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
//import com.example.wil.config.oauth.AppProperties;
import com.example.wil.exception.BadRequestException;
import com.example.wil.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.example.wil.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import static com.example.wil.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

// 소셜 인증(Authentication)에 성공했을 때 Handler
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    // loadUser() 실행 이후
    // 세션 방식 로그인에서는 시큐리티 세션(의 Authentication 객체)에 사용자 정보가 들어가게 됨
    // 여기까지 수행에 성공하면
    // AuthenticationSuccessHandler 타입 객체의 onAuthenticationSuccess 가 실행됨
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
//        return UriComponentsBuilder.fromUriString("/oauth2/redirect_front")
//                .queryParam("token", token)
//                .build().toUriString();
    }



//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
//
//        String targetUrl = determineTargetUrl(request, response, authentication);
//        if (response.isCommitted()) {
//            logger.debug("response has already been committed. unable to redirect to " + targetUrl);
//            return;
//        }
//        clearAuthenticationAttributes(request, response);
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
//    }

//    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);
//
//        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get()))
//            throw new BadRequestException("unauthorized Redirect URI");
//
//        String targetUri = redirectUri.orElse(getDefaultTargetUrl());
//        String token = tokenProvider.createToken(authentication);
//        return UriComponentsBuilder.fromUriString(targetUri)
//                .queryParam("error", "")
//                .queryParam("token", token)
//                .build().toUriString();
//    }
//
//    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
//        super.clearAuthenticationAttributes(request);
//        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
//    }
//
//    private boolean isAuthorizedRedirectUri(String uri) {
//
//        URI clientRedirectUri = URI.create(uri);
//        return appProperties.getOauth2().getAuthorizedRedirectUris()
//                .stream()
//                .anyMatch(authorizedRedirectUri -> {
//                    URI authorizedURI = URI.create(authorizedRedirectUri);
//                    System.out.println("authorizedURI : " + authorizedURI);
//                    if (authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost()) && authorizedURI.getPort() == clientRedirectUri.getPort()) {
//                        return true;
//                    }
//                    return false;
//                });
//    }

}
