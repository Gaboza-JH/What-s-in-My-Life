package com.example.wil.DTO;

import com.example.wil.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private int postId;
    private String content;
    private boolean shown;
    private int userId;
}
