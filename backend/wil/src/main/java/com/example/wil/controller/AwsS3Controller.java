package com.example.wil.controller;

import com.example.wil.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AwsS3Controller {
    private final AwsS3Service awsS3Service;


    @PostMapping("/images")
    public String upload(@RequestParam("image")MultipartFile multipartFile)throws IOException {
        System.out.println(multipartFile.toString());
        System.out.println(multipartFile);
        awsS3Service.upload(multipartFile, "static");
        return "image upload success!!";
    }
    @GetMapping("/images")
    public String getImages(@RequestParam("image")MultipartFile multipartFile)throws IOException {

        return(multipartFile.getOriginalFilename());
    }



}
