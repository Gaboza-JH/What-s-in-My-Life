package com.example.wil.config.oauth;

import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.config.oauth.provider.GoogleUserInfo;
import com.example.wil.config.oauth.provider.KakaoUserInfo;
import com.example.wil.config.oauth.provider.NaverUserInfo;
import com.example.wil.config.oauth.provider.OAuth2UserInfo;
import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("PrincipalOauth2UserService loadUser() Start");
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("userRequest clientRegistration : " + userRequest.getClientRegistration()); // 어떤 oAuth로 로그인 했는지 확인
        System.out.println("oAuth2User : " + oAuth2User);
        System.out.println("PrincipalOauth2UserService loadUser() -> processOAuth2User()");
        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        System.out.println("PrincipalOauth2UserService processOAuth2User() start");
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("---------------------------------------------------------");
            System.out.println("Google Login Request");
            System.out.println("---------------------------------------------------------");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            System.out.println("---------------------------------------------------------");
            System.out.println("Kakao Login Request");
            System.out.println("---------------------------------------------------------");
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("---------------------------------------------------------");
            System.out.println("Naver Login Request");
            System.out.println("---------------------------------------------------------");
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        }
//        else {
//            System.out.println("---------------------------------------------------------");
//            System.out.println("I haven't implemented another login yet !");
//            System.out.println("---------------------------------------------------------");
//        }

        Optional<User> userOptional =
                userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        User user;

        String nickname = "닉네임 설정해주세요";

        if (userOptional.isPresent()) {
            user = userOptional.get();
            user.setEmail(oAuth2UserInfo.getEmail());
            userRepository.save(user);
        } else {
            user = User.builder()
                    .username(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId())
                    .email(oAuth2UserInfo.getEmail())
                    .role("ROLE_USER")
                    .provider(oAuth2UserInfo.getProvider())
                    .providerId(oAuth2UserInfo.getProviderId())
                    .nickname(nickname) // 임의로 작성함.
                    .build();
            userRepository.save(user);
        }


        System.out.println("PrincipalOauth2UserService processOAuth2User() finish");
        return new PrincipalDetails(user, oAuth2UserInfo);
    }

}
