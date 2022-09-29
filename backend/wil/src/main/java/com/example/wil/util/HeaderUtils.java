package com.example.wil.util;

import com.example.wil.config.jwt.JwtProperties;

import javax.servlet.http.HttpServletRequest;

public class HeaderUtils {

    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader(JwtProperties.HEADER_STRING);

        if (headerValue == null) {
            return null;
        }

        if (headerValue.startsWith(JwtProperties.TOKEN_PREFIX)) {
            return headerValue.substring(JwtProperties.TOKEN_PREFIX.length());
        }

        return null;
    }
}
