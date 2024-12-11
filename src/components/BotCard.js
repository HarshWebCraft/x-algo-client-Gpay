import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
import Skeleton from "@mui/material/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  const [loading, setLoading] = useState(true); // Loading state

  const dispatch = useDispatch();
  const clientdata = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

  const capital = props.capital;
  const userId = "H54303926"; // Example userId, this can be dynamically fetched from state if required

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      const initializedData = clientdata.map((item) => ({
        ...item,
        isActive: true, // Default status is Active
      }));
      setClientDataWithActiveStatus(initializedData);
      setLoading(false); // Data is loaded
    }, 2000); // Simulate a 2-second delay
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
      {loading ? (
        <div className="row stats-container">
          <div className="account-info">
            <Skeleton height={35} width="40%" />
            <Skeleton height={35} width="20%" />
            <Skeleton height={35} width="20%" />
            <Skeleton height={35} width="20%" />
          </div>
          <div className="stats-toggle-container">
            <div className="stats-card">
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
            </div>
          </div>
        </div>
      ) : (
        clientDataWithActiveStatus.map((item, index) => (
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
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default BotCard;
