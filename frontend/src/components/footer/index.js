import React from "react";
import "./styles.css";

import SectionContainer from "../section-container";

const Footer = () => {
  return (
    <div>
      <footer className="site-footer">
        <SectionContainer>
          <div className="row">
            <div className="col-md-8">
              <p className="colophon">
                Design by Jaime González based on template by Themezy
              </p>
              <p className="colophon">Powered by Dark Sky</p>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <div className="social-links">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-google-plus"></i>
                </a>
                <a href="#">
                  <i className="fa fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </SectionContainer>
      </footer>
    </div>
  );
};

export default Footer;
