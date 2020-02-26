import React from "react";
import CityItem from "../city-item";
import "./styles.css";

import backgroundImage from "../../assets/images/background-image.jpg";

import SectionContainer from "../section-container";

const CityTable = ({ dataOfCities }) => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <SectionContainer>
        <div className="table-container">
          {dataOfCities.map(dataOfCity => (
            <CityItem dataOfCity={dataOfCity} key={dataOfCity.name}></CityItem>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default CityTable;
