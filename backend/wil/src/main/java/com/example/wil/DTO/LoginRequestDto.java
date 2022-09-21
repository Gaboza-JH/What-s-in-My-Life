package com.example.wil.DTO;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class LoginRequestDto {
    private String email;
    private String password;
}
