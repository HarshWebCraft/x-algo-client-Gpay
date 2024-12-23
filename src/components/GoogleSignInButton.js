import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../actions/email_action";
import { allClientData, auth, userSchemaRedux } from "../actions/actions";
import { ProductionUrl } from "../URL/url";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const userDetails = jwtDecode(token);
      console.log("User Details (Decoded):", userDetails.email);

      const response = await axios.post(`${url}/auth/signin`, {
        token,
      });

      const profileData = await axios.post(`${url}/userinfo`, {
        Email: userDetails.email,
      });
      dispatch(allClientData(profileData.data));

      console.log("Server Response:", response.data);
      if (response.data.message) {
        dispatch(setEmail(userDetails.email));
        // dispatch(auth(true));
        const dbschema = await axios.post(`${url}/dbSchema`, {
          Email: userDetails.email,
        });
        dispatch(userSchemaRedux(dbschema.data));
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", userSchema);
        console.log();

        localStorage.setItem("isLoggedIn", true);
        navigate("/home", { state: { userData: response.data.user } });
      }
    } catch (error) {
      console.error("Sign-in error:", error.response?.data || error.message);
    }
  };

  return (
    <GoogleLogin
      width="400px"
      type="standard"
      shape="pill"
      onSuccess={handleSuccess}
      style={{ display: "none" }}
      onError={() => console.error("Login Failed")}
    />
  );
};

export default GoogleSignInButton;
