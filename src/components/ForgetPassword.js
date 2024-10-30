import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./forgetpassword.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${url}/forgetPassword`, { email });
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Mail sended",
          footer: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Mail doesn't exist",
          footer: "",
        });
      }
      setEmail("");
      setLoading(false);
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div
        className="modal fade modal2"
        id="resetPassword"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content klkjio">
            <div className="modal-header">
              <h5 className="modal-title m-auto oiojkb" id="exampleModalLabel">
                Reset Password
              </h5>
            </div>
            <div className="modal-body">
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="rtgbn">
                    <p className="zdgl mt-2">
                      Enter email address for your account. We'll send an email
                      with a link to reset your password.
                    </p>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="mt-3 mb-4 qsdxcv"
                    >
                      Email Address*
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Email"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
