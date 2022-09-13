import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";
import axios from 'axios';
import { NAVER_AUTH_URL } from "../../OAuth";

const NAVER_LOGIN_URL = "http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:8080/oauth2/redirect_front"
const KAKAO_LOGIN_URL = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:8080/oauth2/redirect_front"
// 여기서 리다이렉트 url 적는건 의미없나..?
const GOOGLE_LOGIN_URL = "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/"

// const onLogin = async () => {
//   const res = await axios.get("http://localhost:8080");
//   console.log(res);
// };

const SignIn = () => {
  return (
    <div className=" form-container sign-in-container">
      <form>
        <h1 className="header-signin">Sign in</h1>
        <div className="social-container">
          <a href={GOOGLE_LOGIN_URL}>
            <ImGoogle2 color="#ed8f03"/>
          </a>
          <a href={KAKAO_LOGIN_URL}>
            <SiKakaotalk color="#ed8f03"/>
          </a>
          <a href={NAVER_LOGIN_URL}>
            <SiNaver color="#ed8f03"/>
          </a>
        </div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
