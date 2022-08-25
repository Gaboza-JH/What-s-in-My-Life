import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ImGoogle2 } from "react-icons/im";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";


const SignIn = () => {
  return (
    <div className=" form-container sign-in-container">
      <form>
        <h1 className="header-signin">Sign in</h1>
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
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
