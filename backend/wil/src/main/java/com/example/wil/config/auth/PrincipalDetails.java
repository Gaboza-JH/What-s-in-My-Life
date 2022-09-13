package com.example.wil.config.auth;

import com.example.wil.config.oauth.provider.OAuth2UserInfo;
import com.example.wil.model.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;


public class PrincipalDetails implements UserDetails, OAuth2User {

    private User user;
//    private Map<String,Object> attributes;
    private OAuth2UserInfo oAuth2UserInfo;

    //일반 로그인
    public PrincipalDetails(User user) {
        this.user = user;
    }

//    //OAuth 로그인
//    public PrincipalDetails(User user, Map<String, Object> attributes) {
//        this.user = user;
//        this.attributes=attributes;
//    }

    public PrincipalDetails(User user, OAuth2UserInfo oAuth2UserInfo) {
        this.user = user;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }


//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect=new ArrayList<>();
        collect.add(new GrantedAuthority(){
            @Override
            public String getAuthority() {
                return user.getRole();
            }
        } );
        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    @Override
//    public String getName() {
//        return null;
//    }

    public User getUser() {
        return user;
    }

    /**
     * OAuth2User 구현
     * @return
     */
    @Override
    public Map<String, Object> getAttributes() {
        //return attributes;
        return oAuth2UserInfo.getAttributes();
    }

    /**
     * OAuth2User 구현
     * @return
     */
    @Override
    public String getName() {
        //String sub = attributes.get("sub").toString();
        //return sub;
        return oAuth2UserInfo.getProviderId();
    }

}
