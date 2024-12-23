import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductionUrl } from "../URL/url";
import { userSchemaRedux } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../actions/email_action";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Loader from "./loader";

const GoogleSignUpButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

  const handleSuccess = async (credentialResponse) => {
    setLoading(true); // Start loading
    console.log("Google ID Token:", credentialResponse.credential);

    try {
      const response = await axios.post(`${url}/auth/signup`, {
        token: credentialResponse.credential,
        signupMethod: "Google",
      });

      dispatch(userSchemaRedux(response.data.userSchema));
      console.log("???????????????????????", userSchema);
      dispatch(setEmail(response.data.userSchema.Email));
      console.log(response.data.msg);
      if (response.data.msg == "true") {
        localStorage.setItem("isLoggedIn", true);
        navigate("/home", { state: { userData: response.data } });
      } else {
        Swal.fire("Error", "Sign-up failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Sign-up Error:", error);
      Swal.fire("Error", "An error occurred. Please try again later.", "error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <Loader />}
      <GoogleLogin
        width="350"
        shape="pill"
        onSuccess={handleSuccess}
        text="signup_with"
        onError={() => Swal.fire("Error", "Login failed", "error")}
      />
    </>
  );
};

export default GoogleSignUpButton;
