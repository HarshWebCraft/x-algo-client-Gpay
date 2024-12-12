import React, { useState } from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("Deposit");

  const buttonStyle = (tab) => ({
    flex: 1,
    padding: "10px 20px",
    textAlign: "center",
    border: tab === activeTab ? "1px solid black" : "1px solid black",
    borderBottom: tab === activeTab ? "none" : "1px solid black",
    cursor: "pointer",
    backgroundColor: tab === activeTab ? "#FFF" : "#F0F0F0",
    fontWeight: tab === activeTab ? "bold" : "normal",
  });

  const contentStyle = {
    padding: "20px",
    border: "1px solid black",
    borderTop: "none",
    height: "300px", // Set height for visual alignment
  };

  return (
    <div
      style={{ width: "400px", margin: "20px auto", border: "1px solid black" }}
    >
      {/* Header with buttons */}
      <div style={{ display: "flex" }}>
        <div
          onClick={() => setActiveTab("Deposit")}
          style={buttonStyle("Deposit")}
        >
          Deposit
        </div>
        <div
          onClick={() => setActiveTab("Withdraw")}
          style={buttonStyle("Withdraw")}
        >
          Withdraw
        </div>
      </div>

      {/* Content Section */}
      <div style={contentStyle}>
        {activeTab === "Deposit" && <h2>Deposit Section</h2>}
        {activeTab === "Withdraw" && <h2>Withdraw Section</h2>}
      </div>
    </div>
  );
};

export default App;
