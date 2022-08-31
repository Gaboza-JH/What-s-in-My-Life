package com.example.wil.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId; // 게시물 기본키값
    private String content; // 게시물 내용
    private boolean shown; // 게시물 공개 여부

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Timestamp createDate;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name="id")
    private User user; // User

}

