import React from "react";
import "./styles.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div>
      <div className="site-header">
        <div className="container">
          <a href="index.html" className="branding">
            <img src={logo} alt="" className="logo"></img>
            <div className="logo-type">
              <h1 className="site-title">City Temperature</h1>
              <small className="site-description">by Jaime González</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
