import "./App.css";
import Menubar from "./Components/Navbar";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage"
import LoginSignupPage from "./Pages/LoginSignupPage"
import { BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import { Redshift } from "aws-sdk";

function getToken() {
  if (window.location.search != '') {
    console.log(window.location.search);

    const str = window.location.search;
    const accessToken = str.split('=')[1];
    console.log("accessToken : " + accessToken);

    return accessToken;
  }
}

// 토큰 만료시간에 다시 false로 바꿔주고
// localStorage에서 delete 해주는 로직 추가 해야 함
function isToken() {
  if (window.location.search != '') {
    return true;
  } else {
    return false;
  }
}

const App = () => {

  const user = { booleanValue: null};

  if (isToken() && (window.location.search.split('=')[0] == "?token")) {
    localStorage.setItem("token", getToken());
  } else {
    user.booleanValue = false;
  }

  // 더 구현해야 할 디테일들
  // 1. 다시 로그인 페이지로 가려고 하면 막아야 하는 로직
  // 2. accesstoken 만료 시간도 서버로부터 받아와서 그 시간 내에만 true 값으로 되도록
  if (localStorage.length == 1) { // token이 localStorage에 저장되어 있으면
    user.booleanValue = true;
  }


  console.log(user);

  return (
    <BrowserRouter>
      <div>
        {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
        <Menubar user={user.booleanValue}/>

        <Routes>
          {/* loginSignupPage */}
          <Route path="/loginsignup" element={<LoginSignupPage />}/>

          {/* Mainpage */}
          <Route path="/" element={<MainPage user={user.booleanValue}/>} />

          {/* MyPage */}
          <Route path="/mypage" element={<MyPage user={user.booleanValue} token={localStorage.getItem("token")}/>}/>
          
          {/* Not FoundPage */}

        </Routes>
        
      </div>
    </BrowserRouter>
  );
};

export default App;

