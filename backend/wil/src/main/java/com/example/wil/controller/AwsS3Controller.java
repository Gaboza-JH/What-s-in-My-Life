package com.example.wil.controller;

import com.example.wil.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AwsS3Controller {
    private final AwsS3Service awsS3Service;


    @PostMapping("/images")
    public String upload(@RequestParam("image")MultipartFile multipartFile)throws IOException {
        awsS3Service.upload(multipartFile, "static");
        return "test";
    }



}
