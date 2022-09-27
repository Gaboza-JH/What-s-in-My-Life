package com.example.wil.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.wil.DTO.UserDTO;
import com.example.wil.DTO.UserNicknameRequestDto;
import com.example.wil.config.jwt.JwtProperties;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.model.Image;
import com.example.wil.model.Post;
import com.example.wil.model.User;
import com.example.wil.repository.ImageRepository;
import com.example.wil.repository.PostRepository;
import com.example.wil.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ImageRepository imgRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    // 회원가입
    public String signUp(UserDTO userDTO){
        User user = transformUser(userDTO);
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        user = userRepository.save(user);
        System.out.println("user 회원 가입 성공");
        String url = makeRedirectUrl(tokenProvider.createTokenLocal(user.getId()), JwtProperties.ACCESS_TOKEN_EXPIRE_TIME);

        System.out.println("local login url : " + url);
        return url;
    }

    private String makeRedirectUrl(String token, Long expiredTime) {
        System.out.println("localLogin makeRedirectUrl() start and return");

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

    public List<UserDTO> findAllUsers() {
        List<User> userList = userRepository.findAll();
        return transformUserDTOList(userList);
    }

    public UserDTO findUserById(int userId) {
        User foundUser = userRepository.getReferenceById(userId);
        return transformUserDTO(foundUser);
    }

    public List<UserDTO> deleteUser(int userId) {
        User foundUser = userRepository.getReferenceById(userId);
        userRepository.delete(foundUser);
        List<User> userList = userRepository.findAll();
        return transformUserDTOList(userList);
    }

    public UserDTO updateUserNickname(int userId, UserDTO userDTO) {
        User foundUser = userRepository.getReferenceById(userId);
        if (userDTO.getNickname() != foundUser.getUsername()) {
            foundUser.setNickname(userDTO.getNickname());
        }
        User updatedUser = userRepository.save(foundUser);
        return transformUserDTO(updatedUser);
    }

    public UserDTO updateUserProfile(int userId, String imgPaths) {

        User foundUser = userRepository.getReferenceById(userId);
        if (foundUser.getProfileImg() == null || foundUser.getProfileImg() != imgPaths) {
            foundUser.setProfileImg(imgPaths);
        }
        User updatedUser = userRepository.save(foundUser);
        return transformUserDTO(updatedUser);
    }

    private User transformUser(UserDTO userDTO){
        List<Post> postList = new ArrayList<>();
        if (userDTO.getPostIdList() != null){
            for (int postId: userDTO.getPostIdList()) {
                postList.add(postRepository.getReferenceById(postId));
            }
        }
    return User
            .builder()
            .id(userDTO.getId())
            .username(userDTO.getUsername())
            .password(userDTO.getPassword())
            .email(userDTO.getEmail())
            .role(userDTO.getRole())
            .provider(userDTO.getProvider())
            .providerId(userDTO.getProviderId())
            .nickname(userDTO.getNickname())
            .createDate(userDTO.getCreateDate())
            .postList(postList)
            .build();
    }

    private UserDTO transformUserDTO(User user){
        List<Integer> postIdList = new ArrayList<>();
        if (user.getPostList() != null){
            for (Post post : user.getPostList()) {
                postIdList.add(post.getPostId());
            }
        }
        return UserDTO
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .role(user.getRole())
                .provider(user.getProvider())
                .providerId(user.getProviderId())
                .nickname(user.getNickname())
                .createDate(user.getCreateDate())
                .postIdList(postIdList)
                .profileImg(user.getProfileImg())
                .build();
    }

    private List<UserDTO> transformUserDTOList(List<User> userList){
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : userList) {
            userDTOList.add(transformUserDTO(user));
        }
        return userDTOList;
    }

}
