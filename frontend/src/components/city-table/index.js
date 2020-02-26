import React from "react";
import CityItem from "../city-item";
import "./styles.css";

import SectionContainer from "../section-container";

const CityTable = ({ dataOfCities }) => {
  console.log("DATA", dataOfCities);
  return (
    <div>
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
