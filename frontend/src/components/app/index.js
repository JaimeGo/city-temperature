import React from "react";
import "./styles.css";

import Header from "../header";
import CityTable from "../city-table";
import Footer from "../footer";

const App = () => {
  return (
    <div className="app">
      <Header />
      <CityTable />
      <Footer />
    </div>
  );
};

export default App;
