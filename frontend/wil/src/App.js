import "./App.css";
import Menubar from "./Components/Navbar";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage"
import LoginSignupPage from "./Pages/LoginSignupPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Redshift } from "aws-sdk";

function getToken() {
  if (window.location.search != '') {
    console.log(window.location.search);

    const str = window.location.search;
    const str2 = str.split('=')[1];
    const accessToken = str2.split('&')[0];

    console.log("accessToken : " + accessToken);

    return accessToken;
  }
}

function getExpiredTime() {
  if (window.location.search != '') {
    const str = window.location.search;
    const str2 = str.split('=')[2]; // accessToken 만료 시간
    const expiredTime = str2.split('&')[0];

    console.log("expiredTime : " + expiredTime);

    return expiredTime;
  }
}

function getTokenStartTime() {
  if (window.location.search != '') {
    const str = window.location.search;
    const tokenStartTime = str.split('=')[3]; // 2022-09-17%2015:32:36

    console.log("tokenStartTime : " + tokenStartTime);

    return tokenStartTime;
  }
}

// http://localhost:3000/?
// token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjYzNDMyMzU2fQ.q-nLOCcbydg-WFrCmAab9LVcIroKcYTc2StXLMBLldHVRr7eNcOo5pbejsWU7bhz-1jwBv60Zilx4sxjMXLWrQ
// &expiredTime=36000000
// &startTime=2022-09-17%2015:32:36
// 20은 그냥 붙음

// function calculateTime(expirationTime) {
//   let miMilli = 1000 * 60; // 1분은 60초
//   let hrMilli = miMilli * 60 // 1시간은 60분
//   let dyMilli = hrMilli * 24 // 1일은 24시간
//   const currentTime = new Date().getTime(); // 70년 1월 1일부터 현재 시각까지의 밀리 타임
//   const adjExpirationTime = new Date(expirationTime).getTime(); // 토큰 만료 시간
//   const tokenEndTime = adjExpirationTime - currentTime;
//   console.log("currentTime");
//   console.log(currentTime); // 16633_48319971
//   // console.log(tokenEndTime); // 16633_84336740 (더한 값)
//   console.log("----------------");
//   console.log("tokenEnd");
//   console.log(tokenEndTime);
//   console.log("----------------");

//   // console.log("currentTime");
//   // console.log(currentTime);
//   // console.log(Math.round(currentTime/dyMilli) + "만큼의 일자가 지났습니다");
//   // console.log(Math.round(currentTime/hrMilli) + "만큼의 시간이 지났습니다");
//   // console.log(Math.round(currentTime/miMilli) + "만큼의 분이 지났습니다");

//   // console.log("adjExpirationTime");
//   // console.log(adjExpirationTime);
//   // console.log(Math.round(adjExpirationTime/dyMilli) + "만큼의 일자가 지났습니다");
//   // console.log(Math.round(adjExpirationTime/hrMilli) + "만큼의 시간이 지났습니다");
//   // console.log(Math.round(adjExpirationTime/miMilli) + "만큼의 분이 지났습니다");

//   return currentTime; // 토큰 받았을 때 현재 시각
// };


function isToken() {
  if (window.location.search != '') {
    return true;
  } else {
    return false;
  }
}

const App = () => {

  const user = { booleanValue: null };
  const time = { start: 0, expiredTime: null };

  // 로그인 후 리다이렉트 되었을떄
  if (window.location.search.split('=')[0] == "?token") {
    localStorage.setItem("token", getToken());
    localStorage.setItem("expiredTime", getExpiredTime());
    localStorage.setItem("startTime", getTokenStartTime());
  }

  time.start = localStorage.getItem("startTime");
  time.expiredTime = localStorage.getItem("expiredTime");

  const now_sec = time.expiredTime / 1000;
  let hour = now_sec / 3600;
  let min = (now_sec % 3600) / 60;
  let sec = now_sec % 60;

  // hour = String(hour).padStart(2, '0');
  // min = String(min).padStart(2, '0');
  // sec = String(sec).padStart(2, '0');
  console.log(now_sec);
  console.log(hour);
  console.log(min);
  console.log(sec);

  // 2022-09-17%2015:32:36
  console.log(time.start.substring(13, 21));
  console.log(time.start.split('%')[0] + time.start.substring(13, 21));
  const date = { start : new Date(time.start.split('%')[0] + "T" + time.start.substring(13, 21))};
  console.log("StartDate");
  console.log(date.start);
  
  let endDate = new Date(date.start);
  endDate.setHours(endDate.getHours() + hour);
  endDate.setMinutes(endDate.getMinutes() + min);
  endDate.setSeconds(endDate.getSeconds() + sec);
  console.log("EndDate");
  console.log(endDate);
 


  // 문제점 : 현재 시간이 계속 변함 --> 백엔드에서 보내주는걸로
  if (localStorage.length == 3) {
    user.booleanValue = true;
    // const remaingTime = calculateTime(+ Number(getExpiredTime()));
    if (new Date().getTime()  >= endDate) { 
      localStorage.removeItem('token');
      localStorage.removeItem('expiredTime');
      user.booleanValue = false;
    }
  } else {
    user.booleanValue = false;
  }

  // 더 구현해야 할 디테일들
  // 1. 다시 로그인 페이지로 가려고 하면 막아야 하는 로직
  // 2. accesstoken 만료 시간도 서버로부터 받아와서 그 시간 내에만 true 값으로 되도록
  // if (localStorage.length == 2) { // token이 localStorage에 저장되어 있으면
  //   user.booleanValue = true;
  // }


  console.log(user);

  return (
    <BrowserRouter>
      <div>
        {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
        <Menubar user={user.booleanValue} />

        <Routes>
          {/* loginSignupPage */}
          <Route path="/loginsignup" element={<LoginSignupPage />} />

          {/* Mainpage */}
          <Route path="/" element={<MainPage user={user.booleanValue} token={localStorage.getItem("token")} />} />

          {/* MyPage */}
          <Route path="/mypage" element={<MyPage user={user.booleanValue} token={localStorage.getItem("token")} />} />

          {/* Not FoundPage */}

        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;


// function getToken() {
//   if (window.location.search !== '') {
//     console.log(window.location.search);

//     const str = window.location.search;
//     const accessToken = str.split('=')[1];
//     console.log("accessToken : " + accessToken);

//     return accessToken;
//   }
// }

// // 토큰 만료시간에 다시 false로 바꿔주고
// // localStorage에서 delete 해주는 로직 추가 해야 함
// function isToken() {
//   if (window.location.search !== '') {
//     return true;
//   } else {
//     return false;
//   }
// }

// const App = () => {

//   const user = { booleanValue: null};

//   if (isToken() && (window.location.search.split('=')[0] === "?token")) {
//     localStorage.setItem("token", getToken());
//   } else {
//     user.booleanValue = false;
//   }

//   // 더 구현해야 할 디테일들
//   // 1. 다시 로그인 페이지로 가려고 하면 막아야 하는 로직
//   // 2. accesstoken 만료 시간도 서버로부터 받아와서 그 시간 내에만 true 값으로 되도록
//   if (localStorage.length === 1) { // token이 localStorage에 저장되어 있으면
//     user.booleanValue = true;
//   }

//   console.log(user);

//   return (
//     <BrowserRouter>
//       <div>
//         {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
//         <Menubar user={user.booleanValue} />

//         <Routes>
//           {/* loginSignupPage */}
//           <Route path="/loginsignup" element={<LoginSignupPage />} />

//           {/* Mainpage */}
//           <Route path="/" element={<MainPage user={user.booleanValue} token={localStorage.getItem("token")} />} />

//           {/* MyPage */}
//           <Route path="/mypage" element={<MyPage user={user.booleanValue} token={localStorage.getItem("token")} />} />

//           {/* Not FoundPage */}

//         </Routes>

//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
