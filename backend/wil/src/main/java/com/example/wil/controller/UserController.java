package com.example.wil.controller;

import com.example.wil.DTO.UserDTO;
import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.example.wil.service.ImageService;
import com.example.wil.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private ImageService imgService;
    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @PostMapping("/users")
    public String signUp(HttpServletRequest request, HttpServletResponse response, @RequestBody UserDTO userDTO) throws IOException {
        String redirectUrl = userService.signUp(userDTO);
//        oAuth2AuthenticationSuccessHandler.onLocalLoginSuccess(request, response, redirectUrl);
        System.out.println("Redirect..");
        return redirectUrl;
    }

    @GetMapping("/users")
    public List<UserDTO> findAllUsers() {
        return userService.findAllUsers();
    }


    @GetMapping("/users/{token}")
    public UserDTO findUserById(@PathVariable String token) {
        System.out.println("/users/{token} getmapping");
        if (tokenProvider.validateToken(token)) {
            System.out.println("/users/{token} getmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return userService.findUserById(userId);
        } else {
            return null;
        }
    }

    @DeleteMapping("/users/{userId}")
    public List<UserDTO> deleteUser(@PathVariable int userId) {
        return userService.deleteUser(userId);
    }


    // 닉네임 수정
    @Transactional
    @PutMapping("/users/{token}")
    @ResponseBody
    public UserDTO updateUserNickname(@PathVariable("token") String token, @RequestBody UserDTO userDTO) {
        System.out.println("/users/{token} putmapping user Nickname");

        if (tokenProvider.validateToken(token)) {
            System.out.println("/users/{token} putmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);
            return userService.updateUserNickname(userId, userDTO);
        } else {
            return null;
        }
    }

    // 프로필 수정
    @Transactional
    @PatchMapping("/users/{token}")
    public UserDTO updateUserProfileImg(@PathVariable("token") String token, @RequestPart(value = "image", required = false) MultipartFile multipartFile) throws IOException {
        System.out.println("/users/{token} patchmapping user ProfileImag");

        if (tokenProvider.validateToken(token)) {
            System.out.println("/users/{token} pathcmapping tokenProvider.validate = true");
            Integer userId = tokenProvider.getUserIdFromToken(token);

            System.out.println(("multipartFile : " + multipartFile));
            if (Objects.equals(multipartFile.getContentType(), "image/png") |
                    Objects.equals(multipartFile.getContentType(), "image/jpg") |
                    Objects.equals(multipartFile.getContentType(), "image/jpeg") |
                    Objects.equals(multipartFile.getContentType(), "image/gif") |
                    Objects.equals(multipartFile.getContentType(), "image/webp")) {
                String defaultDir = "upload"; // user profile img는 upload 폴더로
                String imgPaths = imgService.upload(multipartFile, defaultDir);
                System.out.println("imgPaths : " + imgPaths);

                return userService.updateUserProfile(userId, imgPaths);
            }
        } else {
            return null;
        }
        return null;
    }

}