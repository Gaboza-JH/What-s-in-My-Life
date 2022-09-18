import React from "react";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

const NAVER_LOGIN_URL =
  "http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:8080/oauth2/redirect_front";
const KAKAO_LOGIN_URL =
  "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:8080/oauth2/redirect_front";
const GOOGLE_LOGIN_URL =
  "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:8080/oauth2/redirect_front";

const SignIn = () => {
  return (
    <div className=" form-container sign-in-container">
      <form className="sign-form">
        <h1 className="header-signin">Sign in</h1>
        <div className="social-container">
          <a className="sign-a" href={GOOGLE_LOGIN_URL}>
            <ImGoogle2 className="google" />
          </a>
          <a className="sign-a" href={KAKAO_LOGIN_URL}>
            <SiKakaotalk className="kakao" />
          </a>
          <a className="sign-a" href={NAVER_LOGIN_URL}>
            <SiNaver className="naver" />
          </a>
        </div>
        <input className="interval-signin" type="email" placeholder="Email" />
        <input
          className="interval-signin"
          type="password"
          placeholder="Password"
        />
        <a className="sign-a" href="#">
          Forgot your password?
        </a>
        <button className="sign-botton">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
