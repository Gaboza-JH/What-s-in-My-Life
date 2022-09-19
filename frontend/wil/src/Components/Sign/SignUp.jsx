import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";


const SignUp = () => {
  // const [userName, setUerName] = useState(null);
  // const [nickName, setNickName] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  // const handleOnChange = (e) => {
  //   if (e.target.placeholder == "Name") {
  //     setUerName(e.target.value);
  //   }
  //   console.log(e.target.placeholder);
  //   console.log(userName);
  // };


  return (
    <div className="form-container sign-up-container">
      <form className="sign-form">
        <h1 className="header-signin">Create Account</h1>
        <div className="social-container">
          <a className="sign-a" href="#">
            <ImGoogle2 className="google" />
          </a>
          <a className="sign-a" href="#">
            <SiKakaotalk className="kakao" />
          </a>
          <a className="sign-a" href="#">
            <SiNaver className="naver" />
          </a>
        </div>
        <span className="spansignup">or use your email for registration</span>
        <div >
          <input className="interval-signup" type="text" placeholder="Name" />
          <input className="interval-signup" type="text" placeholder="Nickname" />
          <input className="interval-signup" type="email" placeholder="Email" />
          <input className="interval-signup" type="password" placeholder="Password" />
        </div>
        <button className="btnsignup">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
