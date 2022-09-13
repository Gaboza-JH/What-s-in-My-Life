import "./App.css";
import Menubar from "./Components/Navbar";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage"
import LoginSignupPage from "./Pages/LoginSignupPage"


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {

  const user = false;
  
  if (window.location.search != null) {
    console.log(window.location.search);

    let str = window.location.search;
    let accessToken = str.split('=')[1];

    console.log(accessToken);
    // const user = true;
  } else {
    // user = false;
  }

  return (
    <BrowserRouter>
      <div>
        {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
        <Menubar user={user}/>

        <Routes>
          {/* Mainpage */}
          <Route path="/" element={<MainPage user={user} />} />

          {/* loginSignupPage */}
          <Route
            path="/loginsignup"
            element={user ? <Navigate to="/" /> : <LoginSignupPage />}
          />

          {/* MyPage */}
          <Route
            path="/mypage"
            element={user ? <MyPage user={user}/> : <Navigate to="/" />}
          />
          {/* Not FoundPage */}

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

