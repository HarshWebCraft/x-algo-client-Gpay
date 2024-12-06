import Navbar from "./Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import image from "../images/StrategyImage.jpeg"; // Import the default image

import "./Subscribed.css";
// import jsonData from "./marketPlace.json";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userSchemaRedux } from "../actions/actions";
import React from "react";
import { ProductionUrl } from "../URL/url";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { color } from "framer-motion";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Spinner from "./Spinner";

function MyStartegies({ darkMode, toggleDarkMode, setLoading }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (strategyId) => {
    setSelectedStrategyId(strategyId);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStrategyId(null);
    setOpen(false);
  };

  const showAlertWithTimeout = (message, duration) => {
    setShowAlert(true);
    setAlertMessage(message);

    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, duration);
  };

  const showAlertWithTimeout2 = (message, duration) => {
    setShowAlert2(true);
    setAlertMessage2(message);

    setTimeout(() => {
      setShowAlert2(false);
      setAlertMessage2("");
    }, duration);
  };

  const [Quaninty, setQuaninty] = useState("");
  const [Index, setIndex] = useState("");
  const [Account, setAccount] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allStrategies, setAllStrategies] = useState([]);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const ids = userSchema.SubscribedStrategies;
  const Email = useSelector((state) => state.email.email);
  const email = useSelector((state) => state.email.email);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");
  const [selectedStrategyId, setSelectedStrategyId] = React.useState(null);
  const [clientIds, setClientIds] = useState([]);
  const [deployedStrategies, setDeployedStrategies] = useState([]);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  console.log(userSchema);
  const subscribedStrategies = userSchema.SubscribedStrategies;
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const response = await axios.post(`${url}/getMarketPlaceData`, {
        email,
      });

      console.log(ids);
      console.log(response.data.allData);
      const jsonData = response.data.allData;
      setAllStrategies(jsonData);
      const filteredData = jsonData.filter((item) => ids.includes(item._id));
      console.log(filteredData);
      setFilteredData(filteredData);

      if (userSchema && userSchema.BrokerData) {
        const ids = userSchema.BrokerData.map((account) => account.AngelId);
        console.log(ids);

        setClientIds(ids); // Update state with extracted IDs
        console.log(clientIds);
      }
      setLoader(false);
    };
    fetchData();
  }, [userSchema]);

  const handleDeploy = async (strategyId) => {
    try {
      console.log(selectedStrategyId);
      const response = await axios.post(`${url}/addDeployed`, {
        Email,
        selectedStrategyId,
        Index,
        Quaninty,
        Account,
      });
      console.log(response.data);

      handleClose();
      dispatch(userSchemaRedux(response.data));
      setDeployedStrategies((prev) => [...prev, selectedStrategyId]); // Mark the strategy as deployed
      console.log(deployedStrategies);

      showAlertWithTimeout2("Successfully added", 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnsubscribe = async (strategyId) => {
    try {
      const response = await axios.post(`${url}/removeSubscribe`, {
        email,
        strategyId,
      });

      console.log(response.data.updatedUser);
      dispatch(userSchemaRedux(response.data.updatedUser));

      const filteredData = allStrategies.filter((item) =>
        ids.includes(item._id)
      );
      console.log(filteredData);
      setFilteredData(filteredData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "Quaninty") {
      setQuaninty(value);
    } else if (field === "Index") {
      setIndex(value);
    } else if (field === "Account") {
      setAccount(value);
    }
  };

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  return (
    <div className="">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setLoading={setLoading}
      />

      <div
        className={`${
          showAlert ? "alert alert-danger container show mt-4" : ""
        }`}
      >
        {alertMessage}
      </div>

      <div
        className={`${
          showAlert2 ? "alert alert-success container show mt-4" : ""
        }`}
      >
        {alertMessage2}
      </div>

      <div className="card-container">
        {loader ? (
          <div className="hjg gfhglio">
            <Spinner />
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((strategy) => (
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
                  {new Date(strategy.dateOfCreation).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </div>

                <div className="d-flex gap-2">
                  <div className="subscriber-info">
                    <i className="subscriber-icon">👥</i>
                    Subscriber: {strategy.subscribeCount}
                  </div>
                  <div className="deployed-info">
                    <i className="deployed-icon">🚀</i>
                    Deployed: {strategy.deployedCount}
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
                  onClick={() => handleUnsubscribe(strategy._id)}
                >
                  Unsubscribe
                </button>
                <button
                  className="deploy-btn"
                  onClick={() => handleOpen(strategy._id)}
                  disabled={deployedStrategies.includes(strategy._id)} // Disable if already deployed
                >
                  {deployedStrategies.includes(strategy._id)
                    ? "Deployed"
                    : "Deploy"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-strategy-message container ">
            No strategy subscribed
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="sub-model" style={{ padding: "1.5rem" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deployment Configuration
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Please configure the details below before <br /> deploying the
            strategy:
          </Typography>
          <form style={{ marginTop: "2rem" }}>
            {/* Quantity Field */}
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor="quantity"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  textAlign: "left",
                }}
              >
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={Quaninty}
                onChange={(e) => handleInputChange(e, "Quaninty")}
                placeholder="Enter quantity"
                style={{
                  width: "100%",
                  padding: "0.3rem",
                  fontSize: "0.9rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              />
            </div> */}

            {/* Account Dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor="account"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  textAlign: "left",
                }}
              >
                Select Account:
              </label>
              <select
                id="account"
                value={Account}
                onChange={(e) => handleInputChange(e, "Account")}
                style={{
                  width: "100%",
                  padding: "0.3rem",
                  fontSize: "0.9rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value="" disabled>
                  Choose an account
                </option>
                <option>Paper Trade</option>
                {clientIds.map((id, index) => (
                  <option key={index} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>

            {/* Index Dropdown */}
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor="index"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  textAlign: "left",
                }}
              >
                Select Index:
              </label>
              <select
                id="index"
                value={Index}
                onChange={(e) => handleInputChange(e, "Index")}
                style={{
                  width: "100%",
                  padding: "0.3rem",
                  fontSize: "0.9rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              >
                <option value="" disabled>
                  Choose an index
                </option>
                <option value="Index1">Index 1</option>
                <option value="Index2">Index 2</option>
                <option value="Index3">Index 3</option>
              </select>
            </div> */}
          </form>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Button
              style={{ width: "100%" }}
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ width: "100%" }}
              color="primary"
              onClick={() => {
                // addDeployed(strategy.id);
                handleDeploy();
              }}
            >
              Deploy
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default MyStartegies;
