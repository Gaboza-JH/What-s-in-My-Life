import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";


const SignIn = () => {
  return (
    <div className=" form-container sign-in-container">
      <form className="sign-form">
        <h1 className="header-signin">Sign in</h1>
        <div className="social-container">
        <a className="sign-a" href="#">
            <ImGoogle2 className="google"/>
          </a>
          <a className="sign-a" href="#">
            <SiKakaotalk className="kakao"/>
          </a>
          <a className="sign-a" href="#">
            <SiNaver className="naver"/>
          </a>
        </div>
        <input className="interval" type="email" placeholder="Email" />
        <input className="interval" type="password" placeholder="Password" />
        <a className="sign-a" href="#">Forgot your password?</a>
        <button className="sign-botton">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
