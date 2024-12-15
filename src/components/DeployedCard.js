import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ProductionUrl } from "../URL/url";
import delete_broker from "../images/delete_broker.png";
import "./BotCard.css";

Modal.setAppElement("#root");

const DeployedCard = (props) => {
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmToggleOpen, setIsConfirmToggleOpen] = useState(false); // For toggle confirmation modal
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isActive, setIsActive] = useState(false); // for toggle switch
  const email = useSelector((state) => state.email.email);
  const clientdata = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveStrategy = (strategyId, broker, index) => {
    setSelectedStrategy({ strategyId, broker });
    setSelectedIndex(index);
    setIsModalOpen(true); // Open confirmation modal when attempting to remove a strategy
  };

  const handleToggleStrategy = (strategyId, index) => {
    // Open confirmation modal for toggling
    setSelectedStrategy({ strategyId });
    setSelectedIndex(index);
    setIsConfirmToggleOpen(true);
  };

  const confirmToggle = () => {
    setIsActive(!isActive); // Toggle the active state
    setIsConfirmToggleOpen(false); // Close the confirmation modal
    // Optionally, you can make an API call to update the strategy's active state on the backend
  };

  const cancelToggle = () => {
    setIsConfirmToggleOpen(false); // Close the modal without toggling
  };

  const removeDeploy = async () => {
    try {
      const response = await axios.post(`${url}/removeDeployStra`, {
        email,
        strategyId: selectedStrategy.strategyId,
        broker: selectedStrategy.broker,
      });

      if (response.status === 200) {
        // Remove strategy from the list
        const updatedData = userSchema.DeployedData.filter(
          (item, index) => index !== selectedIndex
        );
      } else {
        console.error("Failed to delete strategy:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting strategy:", error);
    }

    setIsModalOpen(false); // Close the modal after confirming deletion
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal if the user cancels
  };

  const handleDownloadCSV = async (strategyId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/downloadCSV`, { email });
      console.log(response.data);
      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `strategy_${strategyId}_data.csv`;
      link.click();
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <>
      {userSchema.DeployedData && userSchema.DeployedData.length > 0 ? (
        userSchema.DeployedData.map((item, index) => (
          <div className="row stats-container" key={index}>
            <div className="account-info udfhdjbnns justify-content-between">
              <div className="account-item">
                <span className="label">Strategy Name:</span>
                <span className="value">{item.StrategyName}</span>
              </div>
              <div className="account-item">
                <span className="label">Broker:</span>
                <span className="value">
                  {item.userData ? "Angel One" : "Delta"}
                </span>
              </div>
              <div className="account-item">
                <span className="label">User Id:</span>
                <span className="value">{item?.Account || "N/A"}</span>
              </div>
              <div className="account-item account-item-none">
                {/* Toggle Switch for activating/deactivating strategy */}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggleStrategy(item.Strategy, index)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="account-item-none">
                {/* Download CSV Button */}

                <button
                  className="Btn"
                  onClick={() => handleDownloadCSV(item.Strategy)}
                  disabled={isLoading}
                  title="Download CSV"
                >
                  {isLoading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="0.7em"
                      viewBox="0 0 50 50"
                      className="svgIcon"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="white"
                        strokeWidth="5"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="0.7em"
                      viewBox="0 0 384 512"
                      className="svgIcon"
                    >
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                    </svg>
                  )}
                  {isLoading ? "" : <span className="icon2"></span>}
                </button>
              </div>
              <div className="account-item-none">
                {/* Delete icon */}
                <img
                  src={delete_broker || "delete_broker_placeholder.png"}
                  height={20}
                  className="delete-icon"
                  onClick={() =>
                    handleRemoveStrategy(item.Strategy, item.Broker, index)
                  }
                  alt="Delete Broker"
                />
              </div>
              <div className="mobile-account-item">
                <div className="account-item">
                  {/* Toggle Switch for activating/deactivating strategy */}
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() =>
                        handleToggleStrategy(item.Strategy, index)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div>
                  {/* Download CSV Button */}

                  <button
                    class="Btn"
                    onClick={() => handleDownloadCSV(item.Strategy)}
                    title="Download CSV"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="0.7em"
                      viewBox="0 0 384 512"
                      class="svgIcon"
                    >
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                    </svg>
                    <span class="icon2"></span>
                  </button>
                </div>
                <div>
                  {/* Delete icon */}
                  <img
                    src={delete_broker || "delete_broker_placeholder.png"}
                    height={20}
                    className="delete-icon"
                    onClick={() =>
                      handleRemoveStrategy(item.Strategy, item.Broker, index)
                    }
                    alt="Delete Broker"
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-strategy-message container ">
          No strategy deployed
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirm Deletion"
        className="confirm-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h3>Are you sure?</h3>
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={cancelDelete}>
              Cancel
            </button>
            <button className="delete-btn" onClick={removeDeploy}>
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal for Toggle */}
      <Modal
        isOpen={isConfirmToggleOpen}
        onRequestClose={cancelToggle}
        contentLabel="Confirm Toggle"
        className="confirm-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h3>Are you sure?</h3>
          <p>
            Are you sure you want to {isActive ? "deactivate" : "activate"} this
            strategy?
          </p>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={cancelToggle}>
              Cancel
            </button>
            <button className="delete-btn" onClick={confirmToggle}>
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeployedCard;
