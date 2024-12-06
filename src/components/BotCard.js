import React, { useState, useEffect } from "react";
import "./BotCard.css";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";

const BotCard = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientDataWithActiveStatus, setClientDataWithActiveStatus] = useState(
    []
  );

  const dispatch = useDispatch();
  const clientdata = useSelector((state) => state.account.allClientData);
  const capital = props.capital;

  useEffect(() => {
    // Initialize client data with active status
    const initializedData = clientdata.map((item) => ({
      ...item,
      isActive: true, // Default status is Active
    }));
    setClientDataWithActiveStatus(initializedData);
    console.log(clientDataWithActiveStatus);
  }, [clientdata]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleChange = (index) => {
    setClientDataWithActiveStatus((prevData) => {
      const newData = [...prevData];
      newData[index].isActive = !newData[index].isActive; // Toggle active status

      return newData;
    });
  };

  return (
    <>
      {clientDataWithActiveStatus.map((item, index) => (
        <div className="row stats-container" key={index}>
          <div className="account-info">
            {isMobile ? (
              <>
                <div className="dropdown-header" onClick={toggleExpand}>
                  <span>Account Information</span>
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>

                {isExpanded && (
                  <div className="dropdown-content">
                    <div className="account-item">
                      <span className="label">Name:</span>
                      <span className="value">
                        {item.userData
                          ? item.userData.data.name
                          : item.userDetails?.result?.name || "N/A"}
                      </span>
                    </div>
                    <div className="account-item">
                      <span className="label">Broker:</span>
                      <span className="value">
                        {item.userData ? "Angel One" : "Delta"}
                      </span>
                    </div>
                    <div className="account-item">
                      <span className="label">User Id:</span>
                      <span className="value">
                        {item.userData
                          ? item.userData.data.clientcode
                          : item.userDetails?.result?.phishing_code || "N/A"}
                      </span>
                    </div>
                    <div className="account-item">
                      <span className="label">Strategies:</span>
                      <span className="value">5</span>
                    </div>
                    <div className="account-item">
                      <div className="toggle-container">
                        <Switch
                          checked={item.isActive}
                          color="warning"
                          onChange={() => handleToggleChange(index)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="account-item">
                  <span className="label">Name:</span>
                  <span className="value">
                    {item.userData
                      ? item.userData.data.name
                      : item.userDetails?.result?.first_name +
                          item.userDetails?.result?.last_name || "N/A"}
                  </span>
                </div>
                <div className="account-item">
                  <span className="label">Broker:</span>
                  <span className="value">
                    {item.userData ? "Angel One" : "Delta"}
                  </span>
                </div>
                <div className="account-item">
                  <span className="label">User Id:</span>
                  <span className="value">
                    {item.userData
                      ? item.userData.data.clientcode
                      : item.userDetails?.result?.phishing_code || "N/A"}
                  </span>
                </div>
                <div className="account-item">
                  <span className="label">Strategy No:</span>
                  <span className="value">1</span>
                </div>
                <div className="toggle-container">
                  <Switch
                    checked={item.isActive}
                    color="warning"
                    onChange={() => handleToggleChange(index)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="stats-toggle-container">
            <div className="stats-card">
              <div className="stat-item">
                <div className="label">Trade Ratio</div>
                <div className="value">
                  <span className="green">0%</span> /{" "}
                  <span className="red">0%</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="label">Number of trades</div>
                <div className="value">0</div>
              </div>

              <div className="stat-item">
                <div className="label">Profit gained</div>
                <div className="value green">0%</div>
              </div>

              <div className="stat-item">
                <div className="label">Percentage gain</div>
                <div className="value red">0%</div>
              </div>

              <div className="stat-item">
                <div className="label">Working time</div>
                <div className="value">5h 23m</div>
              </div>

              <div className="stat-item">
                <div className="label">Status</div>
                <div className={item.isActive ? "value green" : "value red"}>
                  {item.isActive ? "Active" : "Not Active"}
                </div>
              </div>

              <div className="stat-item">
                <div className="label">Total Balance</div>
                <div className="value">
                  {item.userData ? (
                    capital.map((cap, index1) => {
                      if (index === index1) {
                        return (
                          <div
                            className={cap.net < 0 ? "red" : "green"}
                            key={index1}
                          >
                            ₹{cap.net}
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <div
                      className={
                        item.balances.result[0].balance_inr < 0
                          ? "red"
                          : "green"
                      }
                      key={index}
                    >
                      ₹{item.balances.result[0].balance_inr}
                    </div>
                  )}
                  {/* {capital.map((cap, index1) => {
                    if (index === index1) {
                      return (
                        <div
                          className={cap.net < 0 ? "red" : "green"}
                          key={index1}
                        >
                          ₹{cap.net}
                        </div>
                      );
                    }
                    return null;
                  })} */}
                </div>
              </div>

              <div className="stat-item">
                <div className="label">Orders</div>
                <div className="value">0</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BotCard;
