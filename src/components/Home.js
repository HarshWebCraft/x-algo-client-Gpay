import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "../components/Dashboard/Dashboard";
import "./Home.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import axios from "axios";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { ProductionUrl } from "../URL/url";

function Home({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const userEmail = location.state?.userEmail || "";
  const [tourShown, setTourShown] = useState(false);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  // Initialize theme on load
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light-theme";
    document.body.className = theme;
  }, []);

  useEffect(() => {
    const data = async () => {
      try {
        console.log("Fetching tour data for home.js");

        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
          modalBackdrop.classList.remove("modal-backdrop");
        }

        const response = await axios.post(`${url}/tour`, { userEmail });
        if (response.data.tour && !tourShown) {
          setTourShown(true); // Mark tour as shown to prevent rerun
          initializeDriver();
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }

      try {
        const mobileNoResponse = await axios.post(`${url}/mobileno`, {
          userEmail,
        });
        console.log("Mobile response data:", mobileNoResponse.data);
        if (mobileNoResponse.data.mobileNumber) {
          alert("Enter your mobile number");
        }
      } catch (error) {
        console.error("Error fetching mobile number:", error);
      }
    };

    data();
  }, [tourShown, userEmail, url]);

  const initializeDriver = () => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: "driverjs-theme",
      steps: [
        {
          element: ".a",
          popover: {
            title: "Welcome",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".aa",
          popover: {
            title: "Dashboard",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".bb",
          popover: {
            title: "Strategies",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".cc",
          popover: {
            title: "Paper Trading",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".dd",
          popover: {
            title: "Services",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".ee",
          popover: {
            title: "Profile Image",
            description: "--",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".ff",
          popover: {
            title: "Settings",
            description: "--",
            side: "left",
            align: "start",
          },
        },
      ],
    });

    driverObj.drive();
  };

  return (
    <div
      className={
        localStorage.getItem("theme") === "light-theme" ? "Home" : "dark-home"
      }
    >
      <Navbar
        userEmail={userEmail}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Dashboard
        userEmail={userEmail}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

export default Home;
