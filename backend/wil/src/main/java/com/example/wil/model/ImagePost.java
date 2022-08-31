package com.example.wil.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image_post")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ImagePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int img_id; // image 기본키값

    private String file_name; // image
    private String file_url; // image를 가져올 수 있는 url주소
    @ManyToOne
    @JoinColumn(name="post_id")
    private Post post_id;
}