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
    // 디테일 작업
    // 썼다 지운 경우 ''이 들어가게 되는데 그런 경우 다시 작성하라고 해아 함
    // 이메일 형식에 맞춰 작성하게 하도록 로직 추가
    // setIsAllWrited(isAllWrited.push(userLocalPostDTO)); // 전부 다 작성된 경우 '4' 값 가짐
    // console.log(e.target.placeholder);
    // console.log(e.target.value);
  };

  // 회원가입 mouse click 이벤트
  const buttonEvent = async (e) => {
    if (userLocalPostDTO.username !== undefined && userLocalPostDTO.nickname !== undefined && userLocalPostDTO.email !== undefined && userLocalPostDTO.password !== undefined && userLocalPostDTO.username !== null && userLocalPostDTO.nickname !== null && userLocalPostDTO.email !== null && userLocalPostDTO.password !== null && userLocalPostDTO.username !== "" && userLocalPostDTO.nickname !== "" && userLocalPostDTO.email !== "" && userLocalPostDTO.password !== ""){
      try {
        await axios.post(
          `http://localhost:8080/users`, userLocalPostDTO
        );
        console.log(" click 성공했습니다");
        console.log(userLocalPostDTO.username)
        console.log(userLocalPostDTO.nickname)
        console.log(userLocalPostDTO.email)
        console.log(userLocalPostDTO.password)
        alert("🎉 회원가입 축하드립니다!🎉");
        window.location = "http://localhost:3000/loginsignup";
      } catch (err) {
        console.log("click 실패했습니다");
        console.log(userLocalPostDTO.username)
        console.log(userLocalPostDTO.nickname)
        console.log(userLocalPostDTO.email)
        console.log(userLocalPostDTO.password)
        console.error(err);
        alert("🙅‍♂️ 회원가입 실패했습니다.🙅‍♂️");
        window.location = "http://localhost:3000/loginsignup";
      } 
    } 
    // else if(userLocalPostDTO.username !== null || userLocalPostDTO.nickname !== null || userLocalPostDTO.email !== null || userLocalPostDTO.password !== null)
    else
    {
      console.log(userLocalPostDTO.username)
      console.log(userLocalPostDTO.nickname)
      console.log(userLocalPostDTO.email)
      console.log(userLocalPostDTO.password)
      alert("🤦‍♀️정보를 작성하지 않았습니다.🤦‍♀️");
      window.location = "http://localhost:3000/loginsignup";
    }
  };

  // const rewriteEvent = async (e) => {
  //   if (userLocalPostDTO.username === undefined || userLocalPostDTO.nickname === undefined || userLocalPostDTO.email === undefined || userLocalPostDTO.password === undefined || userLocalPostDTO.username === null || userLocalPostDTO.nickname === null || userLocalPostDTO.email === null || userLocalPostDTO.password === null){
  //       console.log("정보 부족");
  //       alert("🤦‍♀️모든 정보를 입력해주세요.🤦‍♀️");
        // window.location.reload(true)
        // window.location = "http://localhost:3000/loginsignup";
  //     } 
  //   } 

  // 회원가입 enter KeyPress  이벤트
  // const KeyPressEvent = async (e) => {
  //   if (e.key === "Enter"){
  //     }
  //     try {
  //       await axios.post(
  //         `http://localhost:8080/users`, userLocalPostDTO
  //       );
  //       console.log("enter 성공했습니다");
  //       alert("🎉 회원가입 축하드립니다!🎉");
  //       window.location = "http://localhost:3000/loginsignup";
  //     } catch (err) {
  //       console.log("enter 실패했습니다");
  //       console.error(err);
  //       alert("🙅‍♂️ 회원가입 실패했습니다.🙅‍♂️");
  //       // window.location.reload(true)
  //       window.location = "http://localhost:3000/loginsignup";
  //     }
  //   }

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
        {/* type="button" 추가하고 usestate활용 settime넣고 해보기 */}
        <button className="btn-signup" onClick={buttonEvent}>Sign Up</button>
        {/* <button type="button" className="btn-signup" onClick={buttonEvent} onKeyPress={KeyPressEvent}>Sign Up</button> */}
      </form>
    </div>
  );
};

export default SignUp;
