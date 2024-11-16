import React from "react";
import "./Features.css"; // Add custom styling here if needed
import img1 from "../images/wideRange.png";
import img2 from "../images/pricing.png";
import img3 from "../images/innovative.png";
import img4 from "../images/dedicated.png";

const Features = () => {
  const featureData = [
    {
      icon: img1, // Replace with actual image paths
      title: "Wide Product Range",
      description: "Diversified investment choices, all in one place.",
    },
    {
      icon: img2,
      title: "Transparent Pricing",
      description: "Commission-free, online trading with no hidden fees.",
    },
    {
      icon: img3,
      title: "Innovative Tools",
      description:
        "Free, powerful trading platforms for every kind of investor.",
    },
    {
      icon: img4,
      title: "Dedicated Support",
      description: "Award-winning, professional service when you need it most.",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="features-title">
        Take <span style={{ color: "#ffa700" }}>full control </span>of your
        assets
      </h2>
      <p className="features-subtitle">
        Stay on top of the market with our innovative technology, extensive{" "}
        <br />
        product access, personalized education, and award-winning service.
      </p>
      <div className="features-container">
        {featureData.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img
              src={feature.icon}
              alt={`${feature.title} icon`}
              className="feature-icon"
            />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
