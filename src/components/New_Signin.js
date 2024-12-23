import React, { useEffect, useState } from "react";
import "./New_Signin.css";
import animationData from "../lotties/Signin.json";
import Lottie from "react-lottie";
import "animate.css";
import Loader from "./loader";
import "./loader.css";

import { useDispatch, useSelector } from "react-redux";
import "./menubar.css";
import { Link, useNavigate } from "react-router-dom";
import { setEmail } from "../actions/email_action";
import axios from "axios";
import "./loader.css";
import "./signin.css";
import { allClientData, auth, userSchemaRedux } from "../actions/actions";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { ProductionUrl } from "../URL/url";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignInButton from "./GoogleSignInButton.js";

function New_Signin() {
  const [aniLoading, setAniLoading] = useState(true); // State to manage loading

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, emailInput] = useState("");
  const [pass, passInput] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuth = useSelector((state) => state.account.auth);
  console.log(isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url =
      process.env.NODE_ENV === "production"
        ? ProductionUrl
        : "http://localhost:5000";

    try {
      const userAgent = navigator.userAgent;

      const a = await axios.post(`${url}/signin`, {
        email,
        pass,
        deviceInfo: userAgent,
      });

      if (a.data.email) {
        if (a.data.verification) {
          if (a.data.password) {
            const Email = email;
            const profileData = await axios.post(`${url}/userinfo`, { Email });
            dispatch(allClientData(profileData.data));

            localStorage.setItem("isLoggedIn", true);
            dispatch(setEmail(email));
            dispatch(auth(true));

            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
              modalBackdrop.classList.remove("modal-backdrop");
            }

            dispatch(userSchemaRedux(a.data.userSchema));
            navigate("/home", { state: { userEmail: email } });
          } else {
            toast.error("Invalid Password!", {
              position: "top-center",
              autoClose: 3000,
            });
          }
        } else {
          toast.error("Email doesn't verify!", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Email doesn't exist!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (e) {
      console.log("error " + e);
    } finally {
      setLoading(false); // Stop loader after the response
    }
  };

  useEffect(() => {
    // Simulate loading for 1 second (you can adjust the duration)
    const timer = setTimeout(() => {
      setAniLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="signin-container">
      <ToastContainer />
      <div
        className={`signin-lottie-animation ${
          aniLoading ? "animate_animated animate_fadeIn" : ""
        }`}
      >
        <Lottie options={defaultOptions} height={450} width={450} />
      </div>

      <div
        className={`signin-login-box ${
          aniLoading ? "animate_animated animate_fadeIn" : ""
        }`}
      >
        <h2>Welcome to X-Algos! 👋</h2>
        <p className="ranpq">
          Please sign in to your account and start the adventure
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email or Username</label>
          <input
            className="signin-input"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              emailInput(e.target.value);
            }}
            required
          />

          <label>Password</label>
          <div className="signin-password-container">
            <input
              className="signin-input"
              type="password"
              placeholder="Enter password"
              value={pass}
              required
              onChange={(e) => {
                passInput(e.target.value);
              }}
            />
          </div>

          <div className="signin-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgetPassword">Forgot password?</Link>
          </div>

          <button
            className={
              loading ? "signin-login-button pt-2 pb-2" : "signin-login-button"
            }
            type="submit"
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
              "Login"
            )}
          </button>

          <div className="signin-signup">
            New on our platform? <Link to="/signup">Create an account</Link>
          </div>

          <div className="signin-divider">
            <span>or</span>
          </div>

          <GoogleOAuthProvider
            className="signin-google-button"
            clientId="997423304740-81v6ha1te3qovdik27fdgqf7vucqb8t5.apps.googleusercontent.com"
          >
            <div>
              <GoogleSignInButton />
            </div>
          </GoogleOAuthProvider>
        </form>
      </div>
    </div>
  );
}

export default New_Signin;
