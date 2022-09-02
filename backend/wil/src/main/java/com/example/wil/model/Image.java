package com.example.wil.model;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "image_post")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int img_id; // image 기본키값

    private String file_name; // image file url 정보

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post_id;


    public Image(String file_name) {
        this.file_name = file_name;
    }
}
