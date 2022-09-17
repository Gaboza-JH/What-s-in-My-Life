package com.example.wil.DTO;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikesDTO {
    private int likeId;
    private int userId;
    private int postId;

    public int getLikeId() {
        return likeId;
    }

    public int getUserId() {
        return userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }
}
