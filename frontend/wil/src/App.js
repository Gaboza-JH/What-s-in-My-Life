import "./App.css";
import Menubar from "./Components/Navbar";
import MainPage from "./Pages/MainPage";
import MyPage from "./Pages/MyPage"
import LoginSignupPage from "./Pages/LoginSignupPage"
import { BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {

<<<<<<< HEAD
  const user = false;
=======
  const user = true;
>>>>>>> cae8c5fb3c7e23570745b8a38b1e6f0097a39ced

  return (
    <BrowserRouter>
      <div>
        {/* user 변수 명으로 App.jsx의 user를 내려줌 */}
        <Menubar user={user} />

        <Routes>
          {/* Mainpage */}
          <Route path="/" element={<MainPage user={user} />} />

          {/* loginSignupPage */}
          <Route path="/loginsignup" element={<LoginSignupPage />}/>

          {/* MyPage */}
          <Route path="/mypage" element={<MyPage user={user}/>}/>
          
          {/* Not FoundPage */}

        </Routes>
        
      </div>
    </BrowserRouter>
  );
};

export default App;

