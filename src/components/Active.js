import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Active = ({ darkMode, toggleDarkMode, setLoading }) => {
  return (
    <div>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setLoading={setLoading}
      />

      <p>No Data Found</p>
    </div>
  );
};

export default Active;
