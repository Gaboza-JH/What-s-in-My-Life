import React from "react";
import { useState } from "react";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";
import axios from "axios";

const NAVER_LOGIN_URL =
  "http://3.37.184.148:8080/oauth2/authorization/naver?redirect_uri=http://3.37.184.148:8080/oauth2/redirect_front";
const KAKAO_LOGIN_URL =
  "http://3.37.184.148:8080/oauth2/authorization/kakao?redirect_uri=http://3.37.184.148:8080/oauth2/redirect_front";
const GOOGLE_LOGIN_URL =
  "http://3.37.184.148:8080/oauth2/authorization/google?redirect_uri=http://3.37.184.148:8080/oauth2/redirect_front";

const SignIn = () => {
  const [userLocalPostDTO, setUserLocalPostDTO] = useState(null);
  const [redirect, setRedirect] = useState();

  const handleOnChange = (e) => {
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


  // 로그인
  const clickLocalSignInsubmit = async (e) => {
    try {
      if (userLocalPostDTO.password !== undefined && userLocalPostDTO.email !== undefined && userLocalPostDTO.password !== null && userLocalPostDTO.email !== null && userLocalPostDTO.password !== '' && userLocalPostDTO.email !== ''){
        const res = await axios.post(`http://3.37.184.148:8080/login`, userLocalPostDTO);
        setRedirect(res.request.responseURL);
        alert("😎 환영합니다! 😎");
      } else {
        alert("😢 로그인 실패 정보를 입력해주세요. 😢");
        window.location = "http://3.37.184.148:3000/loginsignup";
      }
    } catch (err) {
      alert("🙅‍♂️ 로그인 실패했습니다. 다시 로그인해주세요.🙅‍♂️");
      window.location = "http://3.37.184.148:3000/loginsignup";
    }
  };
  if (redirect != undefined) {
    window.location = redirect;
  }

  return (
    <div className=" form-container sign-in-container">
    <form className="sign-form">
        <h1 className="header-signin">Sign in</h1>
        <div className="social-container">
          <a className="sign-a" href={GOOGLE_LOGIN_URL}><ImGoogle2 className="google" /></a>
          <a className="sign-a" href={KAKAO_LOGIN_URL}><SiKakaotalk className="kakao" /></a>
          <a className="sign-a" href={NAVER_LOGIN_URL}><SiNaver className="naver" /></a>
        </div>
        <div onChange={handleOnChange}>
          <input className="interval-signin" name= "email" type="email" placeholder="Email" />
          <input className="interval-signin" type="password" placeholder="Password" />
          <a className="sign-a" href="#">Forgot your password?</a>
          <button type="button" className="sign-botton" onClick={clickLocalSignInsubmit}>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

