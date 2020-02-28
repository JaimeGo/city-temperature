import React from "react";
import "./styles.css";

import UnitedStatesLogo from "../../assets/images/united-states.png";
import AustraliaLogo from "../../assets/images/australia.png";
import UnitedKingdomLogo from "../../assets/images/united-kingdom.png";
import NewZealandLogo from "../../assets/images/new-zealand.png";
import SwitzerlandLogo from "../../assets/images/switzerland.png";
import ChileLogo from "../../assets/images/chile.png";

function getLogo(cityName) {
  switch (cityName) {
    case "Santiago (CL)":
      return ChileLogo;
    case "Zurich (CH)":
      return SwitzerlandLogo;
    case "Auckland (NZ)":
      return NewZealandLogo;
    case "Sydney (AU)":
      return AustraliaLogo;
    case "London (UK)":
      return UnitedKingdomLogo;
    case "Georgia (USA)":
      return UnitedStatesLogo;
  }
}

const CityItem = ({ city }) => {
  const [name, { hour, temperature }] = city;
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="city-name">{name}</div>
        </div>
        <div className="content">
          <div className="degree-icon">
            <img src={getLogo(name)} alt="" width={48}></img>
          </div>
          <div className="degree">
            {temperature}
            <sup>o</sup>F
          </div>
          <small>{hour}</small>
        </div>
      </div>
    </div>
  );
};

export default CityItem;
