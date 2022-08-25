import React from "react";
import ReactDOM from "react-dom";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

const SignUp = () => {
  return (
    <div className="form-container sign-up-container">
      <form>
        <h1 className="header-signin">Create Account</h1>
        <div className="social-container">
          <a href="#">
            <ImGoogle2 color="#ed8f03"/>
          </a>
          <a href="#">
            <SiKakaotalk color="#ed8f03"/>
          </a>
          <a href="#">
            <SiNaver color="#ed8f03"/>
          </a>
        </div>
        <span className="spansignup">or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btnsignup">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
