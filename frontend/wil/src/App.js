import "./App.css";
import Menubar from "./Components/Navbar";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage";
import LoginSignupPage from "./Pages/LoginSignupPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Redshift } from "aws-sdk";

// 토큰 받아오기
function getToken() {
  if (window.location.search !== "") {
    console.log(window.location.search);

    const str = window.location.search;
    const str2 = str.split("=")[1];
    const accessToken = str2.split("&")[0];

    console.log("accessToken : " + accessToken);

    return accessToken;
  }
}

// 토큰 만료 시간
function getExpiredTime() {
  if (window.location.search !== "") {
    const str = window.location.search;
    const str2 = str.split("=")[2]; // accessToken 만료 시간
    const expiredTime = str2.split("&")[0];

    console.log("expiredTime : " + expiredTime);

    return expiredTime;
  }
}

// 토큰 발급 시간
function getTokenStartTime() {
  if (window.location.search !== "") {
    const str = window.location.search;
    const tokenStartTime = str.split("=")[3]; // 2022-09-17%2015:32:36

    console.log("tokenStartTime : " + tokenStartTime);

    return tokenStartTime;
  }
}

// 토큰 유무 판별
function isToken() {
  if (window.location.search !== "") {
    return true;
  } else {
    return false;
  }
}

const App = () => {
  const user = { booleanValue: null };
  const time = { start: 0, expiredTime: null };

  // 로그인 후 리다이렉트 되었을떄
  if (window.location.search.split("=")[0] == "?token") {
    localStorage.setItem("iame", 'hi');
    localStorage.setItem("token", getToken());
    localStorage.setItem("expiredTime", getExpiredTime());
    localStorage.setItem("startTime", getTokenStartTime());
    console.log(localStorage.getItem);
  }

  time.start = localStorage.getItem("startTime");
  time.expiredTime = localStorage.getItem("expiredTime");

  const now_sec = time.expiredTime / 1000;
  let hour = now_sec / 3600;
  let min = (now_sec % 3600) / 60;
  let sec = now_sec % 60;

  if (time.start != null) {
    const date = {
      start: new Date(
        time.start.split("%")[0] + "T" + time.start.substring(13, 21)
      )
    };

    let endDate = new Date(date.start);
    endDate.setHours(endDate.getHours() + hour);
    endDate.setMinutes(endDate.getMinutes() + min);
    endDate.setSeconds(endDate.getSeconds() + sec);

    if (localStorage.length == 3) {
      user.booleanValue = true;

      if (new Date().getTime() >= endDate) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiredTime");
        user.booleanValue = false;
      }
    } else {
      user.booleanValue = false;
    }
  }
  // 더 구현해야 할 디테일들
  // 1. 다시 로그인 페이지로 가려고 하면 막아야 하는 로직
  // 로그인된 유저가 url로 login signup으로 접급하려고하면 logout도 진행해주세요 라는 경고창 띄우기

  return (
    <BrowserRouter>
      <div>
        {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
        <Menubar user={user.booleanValue} />

        <Routes>
          {/* loginSignupPage */}
          <Route path="/loginsignup" element={<LoginSignupPage />} />

          {/* Mainpage */}
          <Route
            path="/"
            element={
              <MainPage
                user={user.booleanValue}
                token={localStorage.getItem("token")}
              />
            }
          />

          {/* MyPage */}
          <Route
            path="/mypage"
            element={user ?
              <MyPage
                user={user.booleanValue}
                token={localStorage.getItem("token")} 
              />
              : <Navigate to="/" />}
          />

          {/* Not FoundPage */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
