import React, { useEffect, useState } from "react";
import "./New_Signup.css";
import animationData from "../lotties/Signin.json";
import Lottie from "react-lottie";
import "animate.css";
import { Link } from "react-router-dom";
import "./menubar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userSchemaRedux } from "../actions/actions";
import { useDispatch } from "react-redux";
import { setEmail } from "../actions/email_action";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Loader from "./loader";

function New_Signup() {
  const [email, emailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const verified = false;
  const dispatch = useDispatch();
  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    console.log("hello harsh");
    setLoading(true);
    e.preventDefault();

    try {
      console.log("try");
      const a = await axios.post(`${url}/signup`, { email, verified });

      console.log("after try");

      if (a.data.signup) {
        console.log(a.data.userSchema);
        dispatch(userSchemaRedux(a.data.userSchema));
        dispatch(setEmail(email));
        Swal.fire({
          title: "Email is sent",
          text:
            "Please check\n\n" +
            `${email}` +
            "\n\nand click on the link to verify",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "",
          text: "Email already exist",
          icon: "error",
        });
        console.log("error");
      }
      setLoading(false);
    } catch (e) {
      console.log("error " + e);
      setLoading(false);
    }
  };

  const [aniLoading, setAniLoading] = useState(true);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAniLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="signup-container">
      <div
        className={`signup-box ${
          aniLoading ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <h2>Welcome to X-Algos! 👋</h2>
        <p className="ranpq">Please sign up to create a new account</p>

        <form onSubmit={handleSubmit}>
          <label className="signup-label">Email or Username</label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              emailInput(e.target.value);
            }}
            required
          />

          <div className="options">
            <label className="signup-checkbox">
              <input type="checkbox" /> I agree to the terms and conditions
            </label>
          </div>

          <button
            className={loading ? "signup-button pt-2 pb-2" : "signup-button"}
            style={{ fontWeight: 600 }}
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
              "Sign Up"
            )}
          </button>

          <div className="signup">
            Already have an account? <Link to="/login">signin here</Link>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="google-button">
            <img
              src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
              alt="Google logo"
            />
            <span>Sign up with Google</span>
          </div>
        </form>
      </div>
      <div
        className={`lottie-animation ${
          aniLoading ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <Lottie options={defaultOptions} height={450} width={450} />
      </div>
    </div>
  );
}

export default New_Signup;
