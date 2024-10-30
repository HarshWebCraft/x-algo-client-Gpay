import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StrategiesNavbar from "./StrategiesNavbar";
import "./marketplace.css";
import marketplacedata from "./marketPlace.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StrategyCard from "./StrategyCard";

function MarketPlace({ darkMode, toggleDarkMode }) {
  const Email = useSelector((state) => state.email.email);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [filteredStrategies, setFilteredStrategies] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
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
    <div className="">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* {loading ?
                <div className='loader2 uytr'>
                    <div className="loader liop">

                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                    </div>
                </div>

                :
                (filteredStrategies.map(strategy => (
                    <div className={`${localStorage.getItem('theme') == "light-theme" ? "'row col-10 nays center-div'" : "row col-10 nays center-div vgjsdbhcd"}`} key={strategy.id}>
                        {loading ?
                                <div className='loader2 uytr'>
                                <div className="loader liop">
            
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__ball"></div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='row'>
                                    <div className='col-3 nays'>{strategy.name}</div>
                                    <div className='col-7'></div>
                                    <div className='btn col-2 btn-primary nays' onClick={subscribe(strategy.id)} id="ajsgdhagsdhabsnamaafarefse">Subscribe</div>
                                </div>
                                <div className='row nays'>
                                    <div className='col-12'>
                                        {strategy.content}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )))

            } */}
      <StrategyCard />
    </div>
  );
}

export default MarketPlace;
