import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import sideImage from "../images/signup-image.jpg";
import skjdasbjksd from "../images/hero-bg.png";
import "./verifyemail.css";
import Loader from "./loader.js"; // Assuming you have a Loader component

function Verifyemail() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const urlEmail = urlParams.get("email");
  const iv = urlParams.get("iv");

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input fields
    if (!name || !password || !confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${url}/verifyemail`, {
        urlEmail,
        iv,
        password,
        name,
      });
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Email verified!",
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
      handleShow();
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Error",
        text: "Could not verify email. Please try again later.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  //   const MyModalWithGrid = (props) => {
  //     const handleSubmitModal = () => {
  //       handleClose();
  //       let otp = Math.trunc(Math.random() * 1000000);
  //       navigate("/otp-verify", { state: { otpno: otp, number: mobileNumber } });
  //     };

  //     return (
  //       <Modal show={show} onHide={handleClose}>
  //         <Modal.Header>
  //           <Modal.Title>Confirm Number</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           Is this the correct number? <br />
  //           <h2>{mobileNumber}</h2>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={handleClose}>
  //             Edit
  //           </Button>
  //           <Button variant="primary" onClick={handleSubmitModal}>
  //             Send OTP
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     );
  //   };

  return (
    <div className="signin-container">
      <div
        style={{ margin: "auto" }}
        className={`signin-login-box ${
          loading ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <h2>Verify Your Email ✅</h2>
        <p>Please fill in your details to verify your email</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="signin-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="signin-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            className="signin-input"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* <label>Mobile Number</label>
          <input
            className="signin-input"
            type="number"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          /> */}

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
              "Verify"
            )}
          </button>

          {/* <MyModalWithGrid show={show} onHide={() => setShow(false)} /> */}
        </form>
      </div>
    </div>
  );
}

export default Verifyemail;
