import axios from "axios";
import React from "react";
import { Link, Redirect, Route, Router, Routes } from 'react-router-dom';
import { useState } from "react";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

const SignUp = () => {
  const [userLocalPostDTO, setUserLocalPostDTO] = useState(null);
  const [isAllWrited, setIsAllWrited] = useState([]);

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

    // 디테일 작업
    // 썼다 지운 경우 ''이 들어가게 되는데 그런 경우 다시 작성하라고 해아 함
    // 이메일 형식에 맞춰 작성하게 하도록 로직 추가
    // setIsAllWrited(isAllWrited.push(userLocalPostDTO)); // 전부 다 작성된 경우 '4' 값 가짐

    console.log(e.target.placeholder);
    console.log(e.target.value);
  };

  // 회원 가입은 등록만 하면 됨
  const clickLocalSignUpubmit = async (e) => {
    if ((userLocalPostDTO.username != "") &&
      (userLocalPostDTO.nickname != "") &&
      (userLocalPostDTO.email != "") &&
      (userLocalPostDTO.password != "")) {
      try {
        const res = await axios.post(
          `http://localhost:8080/users`, userLocalPostDTO
        );
        console.log("success!! 로컬 회원가입 성공");
        console.log("responst : " + res);
        console.log(res);
        // 등록 완료되면 alert 창 띄워주기 (로그인 시도해주라는 내용으로)
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("전부 작성해주세요");
    }
  }

  console.log(userLocalPostDTO);
  // console.log(userLocalPostDTO.length);

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
        <div onChange={handleOnChange}>
          <input className="interval-signup" type="text" placeholder="Name" />
          <input className="interval-signup" type="text" placeholder="Nickname" />
          <input className="interval-signup" type="email" placeholder="Email" />
          <input className="interval-signup" type="password" placeholder="Password" />
        </div>
        <button type="button" className="btnsignup" onClick={clickLocalSignUpubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
