package com.example.wil.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
//@Data
@Getter
@Setter
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId; // 게시물 기본키값
    private String content; // 게시물 내용
    private boolean shown; // 게시물 공개 여부
    private int senti; // 게시물 내용 -> 감정 분석 결과

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Timestamp createDate;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user; // User

    @OneToMany(mappedBy = "postId", cascade = CascadeType.ALL) // 삭제시 연관관계에 있는 모든 것들도 삭제
    Set<Likes> likes = new HashSet<>();

    @Transient
    @Nullable
    private List<Image> image = new ArrayList<>();


}

