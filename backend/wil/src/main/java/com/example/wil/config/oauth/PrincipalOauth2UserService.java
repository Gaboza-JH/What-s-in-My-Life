package com.example.wil.config.oauth;

import com.example.wil.config.auth.PrincipalDetails;
import com.example.wil.config.oauth.provider.GoogleUserInfo;
import com.example.wil.config.oauth.provider.KakaoUserInfo;
import com.example.wil.config.oauth.provider.NaverUserInfo;
import com.example.wil.config.oauth.provider.OAuth2UserInfo;
import com.example.wil.model.User;
import com.example.wil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("userRequest clientRegistration : " + userRequest.getClientRegistration()); // 어떤 oAuth로 로그인 했는지 확인
        System.out.println("oAuth2User : " + oAuth2User);
        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청~~");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            System.out.println("카카오 로그인 요청~~");
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("네이버 로그인 요청~~");
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        }
        else {
            System.out.println("아직 다른 로그인은 구현하지 못했어요!");
        }

        Optional<User> userOptional =
                userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        User user;

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
                    .build();
            userRepository.save(user);
        }

        return new PrincipalDetails(user, oAuth2UserInfo);
    }
}
