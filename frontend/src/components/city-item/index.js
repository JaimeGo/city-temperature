import React from "react";
import "./styles.css";

const CityItem = ({ dataOfCity }) => {
  const { name, degree, hour } = dataOfCity;
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="city-name">{name}</div>
        </div>
        <div className="content">
          <div className="degree-icon">
            <img src="images/icons/icon-5.svg" alt="" width={48}></img>
          </div>
          <div className="degree">
            {degree}
            <sup>o</sup>C
          </div>
          <small>{hour}</small>
        </div>
      </div>
    </div>
  );
};

export default CityItem;
