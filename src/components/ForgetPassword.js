import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import "./signin.css"; // Use the same CSS as the SignIn page
import Loader from "./loader.js"; // Assuming you have a Loader component

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [aniLoading, setAniLoading] = useState(true); // State to manage loading

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Please enter your email address",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/forgetPassword`, { email });

      if (response.data) {
        Swal.fire({
          title: "Success",
          text: "An email has been sent to reset your password.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "The email address is not registered. Please try again.",
          icon: "error",
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to send reset email. Please try again.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAniLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="signin-container">
      <div
        style={{ margin: "auto", width: "26em" }}
        className={`signin-login-box ${
          aniLoading ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <h2 style={{ marginBottom: "2em" }}>Reset Password 🔒</h2>
        <p>Please enter your email to receive a password reset link.</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            className="signin-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className={
              loading ? "signin-login-button pt-2 pb-2" : "signin-login-button"
            }
            type="submit"
            disabled={loading}
          >
            {loading ? (
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
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
