import React, { useEffect, useState } from "react";
import "./StrategyCard.css"; // Add CSS styles
import image from "../images/StrategyImage.jpeg"; // Import the default image
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ProductionUrl } from "../URL/url";
import { allClientData, userSchemaRedux } from "../actions/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Spinner from "./Spinner";
import Loader from "./loader";

function StrategyCard() {
  const [strategyData, setStrategyData] = useState([]);
  const [subscribedStrategies, setSubscribedStrategies] = useState([]);
  const email = useSelector((state) => state.email.email);
  const dispatch = useDispatch();
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const [selectedStrategyId, setSelectedStrategyId] = React.useState(null);
  const Email = useSelector((state) => state.email.email);

  const [open, setOpen] = React.useState(false);
  const [Quaninty, setQuaninty] = useState("");
  const [Index, setIndex] = useState("");
  const [Account, setAccount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");
  const [clientIds, setClientIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deployedBtnLoader, setDeployedBtnLoader] = useState(false);
  const [brokerId, setBrokerId] = useState([]);
  const [deployedBrokerIds, setDeployedBrokerIds] = useState([]);
  const [dropDownIds, setDropDownIds] = useState([]);
  console.log(deployedBrokerIds);

  const handleOpen = (strategyId) => {
    console.log(strategyId);
    setSelectedStrategyId(strategyId);
    const matchingAccounts = userSchema.DeployedData.filter(
      (deployed) => deployed.Strategy === strategyId
    ).map((deployed) => deployed.Account);

    console.log("Matching Accounts:", matchingAccounts);

    // Filter brokerId to exclude matching accounts
    const filteredBrokerIds = userSchema.BrokerIds.filter(
      (brokerId) => !matchingAccounts.includes(brokerId)
    );

    console.log("Filtered Broker IDs:", filteredBrokerIds);
    setDropDownIds(filteredBrokerIds);

    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStrategyId(null);
    setOpen(false);
  };

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        setDeployedBrokerIds(userSchema.DeployedStrategiesBrokerIds);
        console.log(userSchema.DeployedStrategiesBrokerIds);
        const response = await axios.post(`${url}/getMarketPlaceData`, {
          email,
        });

        console.log(response.data.allData);
        console.log(response.data.SubscribedStrategies);
        console.log(response.data.userSchema);

        dispatch(userSchemaRedux(response.data.userSchema));

        setStrategyData(response.data.allData);
        setSubscribedStrategies(response.data.SubscribedStrategies);
        setBrokerId(userSchema.BrokerIds);
        setDeployedBrokerIds(userSchema.DeployedStrategiesBrokerIds);
        const filteredIds = brokerId.filter(
          (id) => !deployedBrokerIds.includes(id)
        );
        console.log(filteredIds);
        console.log(brokerId);
        console.log(deployedBrokerIds);

        setLoader(false);
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

      dispatch(userSchemaRedux(response.data.userSchema));

      setStrategyData((prevData) =>
        prevData.map((strategy) =>
          strategy._id === strategyId
            ? { ...strategy, subscribeCount: response.data.newSubscribeCount }
            : strategy
        )
      );

      dispatch(userSchemaRedux(response.data.userSchema));

      setSubscribedStrategies(response.data.SubscribedStrategies); // Update subscribed strategies
    } catch (error) {
      console.error("Error updating subscribe count:", error);
    }
  };

  const showAlertWithTimeout2 = (message, duration) => {
    setShowAlert2(true);
    setAlertMessage2(message);

    setTimeout(() => {
      setShowAlert2(false);
      setAlertMessage2("");
    }, duration);
  };

  const handleDeploy = async (strategyId) => {
    try {
      setDeployedBtnLoader(true);
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
      const profileData = await axios.post(`${url}/userinfo`, { Email });
      dispatch(allClientData(profileData.data));
      const dbschema = await axios.post(`${url}/dbSchema`, { Email });
      dispatch(userSchemaRedux(dbschema.data));
      showAlertWithTimeout2("Successfully added", 3000);
      setDeployedBtnLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card-container">
      {loader ? (
        <div className="hjg gfhglio">
          <Spinner />
        </div>
      ) : (
        strategyData.map((strategy) => (
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
              <button
                className="deploy-btn"
                onClick={() => handleOpen(strategy._id)}
                disabled={!subscribedStrategies.includes(strategy._id)} // Disable if not subscribed
              >
                Deploy
              </button>
            </div>
          </div>
        ))
      )}

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {/* <label
                htmlFor="quantity"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  textAlign: "left",
                }}
              >
                Quantity:
              </label> */}
              {/* <input
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
              /> */}
            </div>

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
                {dropDownIds.map((id, index) => (
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
              disabled={deployedBtnLoader}
            >
              {deployedBtnLoader ? (
                <div
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                "Deploy"
              )}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default StrategyCard;
