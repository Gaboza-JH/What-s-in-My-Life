package com.example.wil.service;

import com.example.wil.model.ImagePost;
import com.example.wil.repository.ImageRepository;

import java.util.List;

public class ImageService {
    private ImageRepository repository;
    private AwsS3Service awsS3Service;
    //이미지 전체 조회
    public List<ImagePost> findAll() {
        return repository.findAll();
    }

    private ImagePost save(ImagePost imagePost){
        return repository.save(imagePost);
    }

}
