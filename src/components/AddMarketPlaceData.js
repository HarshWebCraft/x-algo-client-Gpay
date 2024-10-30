import React, { useState } from "react";
import axios from "axios";
import "./AddMarketPlaceData.css"; // Import the CSS file here

function AddMarketPlaceData() {
  const [formData, setFormData] = useState({
    title: "",
    strategyType: "",
    capitalRequirement: "",
    description: "",
    time: "",
    days: "",
    createdBy: "",
    dateOfCreation: "",
  });

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        dateOfCreation: new Date(formData.dateOfCreation),
      };

      const response = await axios.post(
        `${url}/addMarketPlaceData`,
        formattedData
      );
      console.log(response.data);
      alert("Data added successfully!");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Error adding data. Please try again.");
    }
  };

  return (
    <div className="marketplace-container">
      <h2 className="marketplace-title">Add Market Place Data</h2>
      <form className="marketplace-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <input
          type="text"
          name="strategyType"
          placeholder="Strategy Type"
          value={formData.strategyType}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <input
          type="text"
          name="capitalRequirement"
          placeholder="Capital Requirement"
          value={formData.capitalRequirement}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="marketplace-textarea marketplace-input"
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={formData.time}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <input
          type="text"
          name="days"
          placeholder="Days"
          value={formData.days}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <input
          type="text"
          name="createdBy"
          placeholder="Created By"
          value={formData.createdBy}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <input
          type="date"
          name="dateOfCreation"
          value={formData.dateOfCreation}
          onChange={handleChange}
          className="marketplace-input"
          required
        />
        <button type="submit" className="marketplace-button">
          Add Data
        </button>
      </form>
    </div>
  );
}

export default AddMarketPlaceData;
