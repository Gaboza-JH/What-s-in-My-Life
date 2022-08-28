package com.example.wil.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int post_id; // 게시물 기본키값

    private String content; // 게시물 내용
    private boolean shown; // 게시물 공개 여부

    @ManyToOne
    @JoinColumn(name="id")
    private User user_id; // User


}