import React, { useState, useEffect } from "react";
import CityItem from "../city-item";
import "./styles.css";

import backgroundImage from "../../assets/images/background-image.jpg";

import SectionContainer from "../section-container";

const CityTable = () => {
  const [cities, setCities] = useState({
    "Santiago (CL)": { hour: "--:--", temperature: "--" },
    "Zurich (CH)": { hour: "--:--", temperature: "--" },
    "Auckland (NZ)": { hour: "--:--", temperature: "--" },
    "Sydney (AU)": { hour: "--:--", temperature: "--" },
    "London (UK)": { hour: "--:--", temperature: "--" },
    "Georgia (USA)": { hour: "--:--", temperature: "--" }
  });

  useEffect(() => {
    const ws = new WebSocket("wss://wsserver-temperature.herokuapp.com");

    ws.onmessage = event => {
      console.log("Event data:", event.data);
      const responseCities = JSON.parse(event.data);
      console.log("RESPONSE CITIES", responseCities);

      let newCities = cities;

      responseCities.forEach(responseCity => {
        const { name, hour, temperature } = responseCity;
        if (hour && temperature) {
          newCities[name] = { hour, temperature };
        }
      });
      console.log("NEW CITIES", newCities);

      setCities(newCities);
    };

    console.log("ENTRIES", Object.entries(cities));

    return () => {
      ws.close();
    };
  }, [cities]);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <SectionContainer>
        <div className="table-container">
          {Object.entries(cities).map(city => (
            <CityItem city={city} key={city[0]}></CityItem>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default CityTable;
