import React, { useState } from "react";
import ReactDOM from "react-dom";
import SignUp from "../Components/Sign/SignUp";
import SignIn from "../Components/Sign/SignIn";
import OverLay from "../Components/Sign/OverLay";
import "../Components/Sign/Sign.css"

const LoginSignupPage = () => {
  const [toggleClassName, setClassName] = useState("container");

  function onClick() {
    if (toggleClassName === "container") {
      setClassName("container right-panel-active");
    } else {
      setClassName("container");
    }
  }

  return (
    <div className="body">
      <div className={toggleClassName}>
        <SignIn />
        <SignUp />
        <OverLay onClick={onClick} />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<LoginSignupPage />, rootElement);

export default LoginSignupPage;
