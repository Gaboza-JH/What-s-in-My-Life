package com.example.wil.controller;

import com.example.wil.config.jwt.TokenProvider;
import com.example.wil.model.Image;
import com.example.wil.model.Post;
import com.example.wil.repository.ImageRepository;
import com.example.wil.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class ImageController {
    private final ImageService imageService;
    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/images")
    public String upload(@RequestParam("image") List<MultipartFile> multipartFile)throws IOException {
        if (multipartFile == null) {
            System.out.println("multipartFile = null");
        }
        List<String> imgPath = imageService.upload(multipartFile, "static");

//        awsS3Service.upload(multipartFile, "static");
        return "image upload success!!";
    }

//    @GetMapping("/images/{token}")
//    public List<Image> findImages(@PathVariable String token) {
//        System.out.println("/images/{token} getmapping");
//        if (tokenProvider.validateToken(token)) {
//            System.out.println("/images/{token} getmapping tokenProvider.validate = true");
//            Integer userId = tokenProvider.getUserIdFromToken(token);
//            return imageService.findImages(userId);
//        } else {
//            return null;
//        }
//    }

    @GetMapping("/images/{postId}")
    public List<Image> findImages(@PathVariable int postId) {
        return imageService.findImages(postId);
    }

}

