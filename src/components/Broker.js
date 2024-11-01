import React from "react";
import Navbar from "./Navbar";
import Listofbroker from "./Listofbroker";
function Broker({ darkMode, toggleDarkMode, setLoading }) {
  return (
    <div>
      <div className="">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setLoading={setLoading}
        />
        <Listofbroker setLoading={setLoading} />
      </div>
    </div>
  );
}

export default Broker;
