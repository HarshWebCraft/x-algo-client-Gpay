import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./marketplace.css";
import marketplacedata from "./marketPlace.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StrategyCard from "./StrategyCard";
import { ProductionUrl } from "../URL/url";

function MarketPlace({ darkMode, toggleDarkMode }) {
  const Email = useSelector((state) => state.email.email);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [filteredStrategies, setFilteredStrategies] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${url}/myStrategies`, { Email });

        const myStartegies = response.data.mystartegies;
        const notMyStartegies = marketplacedata || [];

        const filteredStrategies = notMyStartegies.filter(
          (item) => !myStartegies.includes(item.id)
        );

        setFilteredStrategies(filteredStrategies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const subscribe = async (id) => {
    try {
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  return (
    <div className="MarketPlace">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <StrategyCard />
    </div>
  );
}

export default MarketPlace;
