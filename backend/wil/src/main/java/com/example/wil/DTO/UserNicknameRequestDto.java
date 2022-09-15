package com.example.wil.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class UserNicknameRequestDto {
    private String nickname;
}
