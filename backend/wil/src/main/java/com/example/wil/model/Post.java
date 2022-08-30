package com.example.wil.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId; // 게시물 기본키값
    private String content; // 게시물 내용
    private boolean shown; // 게시물 공개 여부

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name="id")
    private User user; // User

}

