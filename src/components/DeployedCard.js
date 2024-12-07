import React, { useState, useEffect } from "react";
import "./BotCard.css";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";

const DeployedCard = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientDataWithActiveStatus, setClientDataWithActiveStatus] = useState(
    []
  );

  const dispatch = useDispatch();
  const clientdata = useSelector((state) => state.account.allClientData);
  const capital = props.capital;
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

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
      {userSchema.DeployedData && userSchema.DeployedData.length > 0 ? (
        userSchema.DeployedData.map((item, index) => (
          <div className="row stats-container" key={index}>
            <div className="account-info udfhdjbnns justify-content-between">
              <>
                <div className="account-item">
                  <span className="label">Strategy Name:</span>
                  <span className="value">{item.StrategyName}</span>
                  {console.log(item)}
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
                    {/* {item.userData
                          ? item.userData.data.clientcode
                          : item.userDetails?.result?.phishing_code || "N/A"} */}
                  </span>
                </div>

                <div className="toggle-container">
                  <Switch
                    checked={item.isActive}
                    color="warning"
                    onChange={() => handleToggleChange(index)}
                  />
                </div>
              </>
            </div>
          </div>
        ))
      ) : (
        <div className="no-strategy-message container ">
          No strategy deployed
        </div>
      )}
    </>
  );
};

export default DeployedCard;
