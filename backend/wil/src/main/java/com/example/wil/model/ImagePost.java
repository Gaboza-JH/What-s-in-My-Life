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

    @ManyToOne
    @JoinColumn(name="post_id")
    private Post post_id;
}