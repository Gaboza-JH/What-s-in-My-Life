package com.example.wil.config.jwt;

public interface JwtProperties {
    String SECRET = "whatsinmylifewhatsinmylifwhatsinmylifewhatsinmylifewhatsinmylifwhatsinmylifewhatsinmylifewhatsinmylifwhatsinmylifewhatsinmylifewhatsinmylifwhatsinmylifewhatsinmylifewhatsinmylifwhatsinmylife"; // 우리 서버만 알고 있는 비밀값
//    int EXPIRATION_TIME = 864000000; // 10일 (1/1000초)
    int EXPIRATION_TIME = 60*10000; // 10분
    long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 10;            // 10분
    long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 1;  // 1일

    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}

