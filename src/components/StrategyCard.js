import React, { useEffect, useState } from "react";
import "./StrategyCard.css"; // Add CSS styles
import image from "../images/StrategyImage.jpeg"; // Import the default image
import axios from "axios";
import { useSelector } from "react-redux";

function StrategyCard() {
  const [strategyData, setStrategyData] = useState([]);
  const [subscribedStrategies, setSubscribedStrategies] = useState([]);
  const email = useSelector((state) => state.email.email);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/getMarketPlaceData`, {
          email,
        });

        console.log(response.data.allData);
        console.log(response.data.SubscribedStrategies);
        setStrategyData(response.data.allData);
        setSubscribedStrategies(response.data.SubscribedStrategies); // Array of subscribed strategies' IDs
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [email, url]);

  // Function to handle the subscribe button click
  const handleSubscribe = async (strategyId) => {
    try {
      const response = await axios.post(`${url}/updateSubscribe`, {
        strategyId,
        email,
      });

      setStrategyData((prevData) =>
        prevData.map((strategy) =>
          strategy._id === strategyId
            ? { ...strategy, subscribeCount: response.data.newSubscribeCount }
            : strategy
        )
      );
      setSubscribedStrategies(response.data.SubscribedStrategies); // Update subscribed strategies
    } catch (error) {
      console.error("Error updating subscribe count:", error);
    }
  };

  return (
    <div className="card-container">
      {strategyData.map((strategy) => (
        <div key={strategy._id} className="card">
          <div className="card-header">
            <div className="header-left">
              <img src={image} alt="Icon" className="strategy-icon" />
              <div className="strategy-details">
                <h2>{strategy.title}</h2>
                <p className="strategy-type">
                  Strategy: {strategy.strategyType}
                </p>
              </div>
            </div>
          </div>

          <div className="capital-info">
            <strong>Capital requirement : </strong>
            <p>{strategy.capitalRequirement}</p>
          </div>

          <div className="strategy-info">
            <p>{strategy.description}</p>
          </div>

          <div className="execution-info">
            <div className="created-by-info">
              <i className="created-by-icon">✍️</i>
              Created By: {strategy.createdBy}
            </div>
            <div className="creation-date-info">
              <i className="date-icon">📅</i>
              Created on:{" "}
              {new Date(strategy.dateOfCreation).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>

            <div className="d-flex gap-2">
              <div className="subscriber-info">
                <i className="subscriber-icon">👥</i>
                Subscriber : {strategy.subscribeCount}
              </div>
              <div className="deployed-info">
                <i className="deployed-icon">🚀</i>
                Deployed : {strategy.deployedCount}
              </div>
            </div>
            <div className="time-info">
              <i className="clock-icon">🕒</i>
              {strategy.days} at {strategy.time}
            </div>
          </div>

          <div className="card-footer">
            <button
              className="subscribe-btn"
              onClick={() => handleSubscribe(strategy._id)}
              disabled={subscribedStrategies.includes(strategy._id)} // Disable if already subscribed
            >
              {subscribedStrategies.includes(strategy._id)
                ? "Subscribed"
                : "Subscribe"}
            </button>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StrategyCard;
