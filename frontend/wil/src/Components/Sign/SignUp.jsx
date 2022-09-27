import axios from "axios";
import React from "react";
import { useState } from "react";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

const SignUp = () => {
  const [userLocalPostDTO, setUserLocalPostDTO] = useState(null);

  const handleOnChange = (e) => {
    if (e.target.placeholder == "Name") {
      setUserLocalPostDTO({
        ...userLocalPostDTO,
        ["username"]: e.target.value,
      });
    }
    if (e.target.placeholder == "Nickname") {
      setUserLocalPostDTO({
        ...userLocalPostDTO,
        ["nickname"]: e.target.value,
      });
    }
    if (e.target.placeholder == "Email") {
      setUserLocalPostDTO({
        ...userLocalPostDTO,
        ["email"]: e.target.value,
      });
    }
    if (e.target.placeholder == "Password") {
      setUserLocalPostDTO({
        ...userLocalPostDTO,
        ["password"]: e.target.value,
      });
    }
  };

  // 회원가입 요청
  const SignupSubmit = async (e) => {
    try {
      if (
        userLocalPostDTO.username !== undefined &&
        userLocalPostDTO.nickname !== undefined &&
        userLocalPostDTO.email !== undefined &&
        userLocalPostDTO.password !== undefined &&
        userLocalPostDTO.username !== null &&
        userLocalPostDTO.nickname !== null &&
        userLocalPostDTO.email !== null &&
        userLocalPostDTO.password !== null &&
        userLocalPostDTO.username !== "" &&
        userLocalPostDTO.nickname !== "" &&
        userLocalPostDTO.email !== "" &&
        userLocalPostDTO.password !== ""
      ) {
        await axios.post(`http://3.37.184.148:8080/users`, userLocalPostDTO);
        alert("😎 회원가입 축하합니다! 😎");
        window.location = "http://3.37.184.148/loginsignup";
      } else {
        alert("😢 회원가입 실패했습니다. 정보를 입력해주세요. 😢");
        window.location = "http://3.37.184.148/loginsignup";
      }
    } catch (err) {
      alert("🙅‍♂️ 회원가입 실패했습니다. 다시 회원가입 해주세요.🙅‍♂️");
      window.location = "http://3.37.184.148/loginsignup";
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="sign-form">
        <h1 className="header-signin">Create Account</h1>
        <div className="social-container">
          <a className="sign-a" href="#"><ImGoogle2 className="google" /></a>
          <a className="sign-a" href="#"><SiKakaotalk className="kakao" /></a>
          <a className="sign-a" href="#"><SiNaver className="naver" /></a>
        </div>
        <span className="spansignup">or use your email for registration</span>
        <div onChange={handleOnChange}>
          <input className="interval-signup" type="text" placeholder="Name" />
          <input className="interval-signup" type="text" placeholder="Nickname"/>
          <input className="interval-signup" type="email" placeholder="Email" />
          <input className="interval-signup" type="password" placeholder="Password"/>
        </div>
        <button type="button" className="btn-signup" onClick={SignupSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
