import React from "react";
import "./styles.css";

import Header from "../header";
import CityTable from "../city-table";
import Footer from "../footer";

const App = () => {
  const dataOfCities = [
    {
      name: "Santiago (CL)",
      degree: "22",
      hour: "12:00"
    },
    {
      name: "Zurich (CH)",
      degree: "22",
      hour: "12:00"
    },
    {
      name: "Auckland (NZ)",
      degree: "22",
      hour: "12:00"
    },
    {
      name: "Sydney (AU)",
      degree: "22",
      hour: "12:00"
    },
    {
      name: "Londres (UK)",
      degree: "22",
      hour: "12:00"
    },
    {
      name: "Georgia (USA)",
      degree: "22",
      hour: "12:00"
    }
  ];
  return (
    <div className="app">
      <Header />
      <CityTable dataOfCities={dataOfCities} />
      <Footer />
    </div>
  );
};

export default App;
