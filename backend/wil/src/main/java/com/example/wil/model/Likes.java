package com.example.wil.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User userId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Post postId;

    public Like(User userId, Post postId) {
        this.userId = userId;
        this.postId = postId;
    }
}
