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
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

  const capital = props.capital;

  useEffect(() => {
    // Initialize client data with active status
    const initializedData = clientdata.map((item) => ({
      ...item,
      isActive: true, // Default status is Active
    }));
    setClientDataWithActiveStatus(initializedData);
    console.log(userSchema.DeployedData);
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
                    {/* <div className="account-item">
                      <div className="toggle-container">
                        <Switch
                          checked={item.isActive}
                          color="warning"
                          onChange={() => handleToggleChange(index)}
                        />
                      </div>
                    </div> */}
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
                  <span className="label">Active Strategy:</span>
                  <span className="value">{userSchema.ActiveStrategys}</span>
                </div>

                {/* <div className="toggle-container">
                  <Switch
                    checked={item.isActive}
                    color="warning"
                    onChange={() => handleToggleChange(index)}
                  />
                </div> */}
              </>
            )}
          </div>
          <div className="stats-toggle-container">
            <div className="stats-card">
              <div className="stat-item">
                <div className="label">Account Balance</div>
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
                        item?.balances?.result[0]?.balance_inr < 0
                          ? "red"
                          : "green" || ""
                      }
                      key={index}
                    >
                      ₹{item?.balances?.result[0]?.balance_inr || ""}
                    </div>
                  )}
                </div>
              </div>

              <div className="stat-item">
                <div className="label">Overall gain</div>
                <div className="value">0</div>
              </div>

              <div className="stat-item">
                <div className="label">Monthly gain</div>
                <div className="value green">0%</div>
              </div>

              <div className="stat-item">
                <div className="label">Today's gain</div>
                <div className="value green">0%</div>
              </div>

              {/* {userSchema.DeployedData.map((item, index) => (
                // <div key={index}>
                <>
                  <div className="stat-item">
                    <div className="label">Strategy Name</div>
                    <div className="value">{item.StrategyName}</div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Accuracy</div>
                    <div className="value">0</div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Monthly gain</div>
                    <div className="value green">0%</div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Today's gain</div>
                    <div className="value red">0%</div>
                  </div>
                </>
                // </div>
              ))} */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BotCard;
