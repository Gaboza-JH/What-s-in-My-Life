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
}
