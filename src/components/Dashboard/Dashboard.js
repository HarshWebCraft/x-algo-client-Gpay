import React, { useState } from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import "../loader.css";
import { ProductionUrl } from "../../URL/url";
import {
  allClientData,
  addItem,
  brokerLogin,
  removeItem,
  userSchemaRedux,
} from "../../actions/actions";
import { Audio, FallingLines, Triangle } from "react-loader-spinner";
import OrderPlace from "../OrderPlace";
import BotCard from "../BotCard";
function Dashboard({ darkMode, toggleDarkMode, setLoading }) {
  let a = 0;

  const Email = useSelector((state) => state.email.email);
  const clientdata = useSelector((state) => state.account.allClientData);
  const id = useSelector((state) => state.account.angelId);
  const pass = useSelector((state) => state.account.angelPass);
  const brokerLogin1 = useSelector((state) => state.account.brokerLogin);
  const auth = useSelector((state) => state.account.auth);
  const items = useSelector((state) => state.account.items);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const brokerCount = userSchema ? userSchema.BrokerCount : 0;
  console.log("brokerlogin value in redux" + brokerLogin1);
  console.log(id);
  console.log(pass);
  console.log(clientdata);
  const [broker, isBroker] = useState();
  // const [loading, setLoading] = useState(false);
  const [capital, setCapital] = useState([]);
  const [allcap, setallcap] = useState("");
  const [ert, seta] = useState(true);
  const dispatch = useDispatch();
  const [b, setb] = useState(false);
  let sum = 0;
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await axios.post(`${url}/userinfo`, { Email });
        console.log(profileData);
        dispatch(allClientData(profileData.data));
        setb(true);

        const storedTheme = localStorage.getItem("theme");
        console.log("jcnnjaskcnasncnaskcnkascnkasnjk" + storedTheme);

        const dbschema = await axios.post(`${url}/dbSchema`, { Email });
        console.log(dbschema.data);
        console.log(userSchema);

        console.log(auth);
        // dispatch(addItem(profileData.data.data))
        console.log(items);
        if (userSchema.BrokerCount) {
          dispatch(brokerLogin(true));
        } else {
          dispatch(brokerLogin(false));
        }

        console.log(brokerLogin1);
        console.log("after " + brokerLogin1);

        if (brokerLogin1) {
          const response = await axios.post(`${url}/addbroker`, {
            First: false,
            Email,
            userSchema,
          });
          console.log(response.data);
          response.data.map((cap, index) => {
            console.log(cap.userData.data.net);
            // setCapital(...capital, cap.userData.data.net)
          });
          console.log(capital);

          console.log(sum);
          setallcap(sum);
          console.log(capital);

          const a = response.data;
          const newCapital = a.map((user) => user.userData.data);
          setCapital(newCapital);

          // setLoading(false);
          seta(false);
          // document.body.style.overflow = 'unset';
          console.log(dbschema.data);
          dispatch(userSchemaRedux(dbschema.data));
        } else {
          // setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`container deskbord ${darkMode ? "dark" : "light"}`}>
      {/* {loading && (
        <div className="loader2 uytr">
          <div className="loader liop">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>
      )} */}
      <div className={`row yqrgk`}>
        <div
          className={`col py-3 px-4 d-flex justify-content-end align-items-center ${
            darkMode ? "dark" : "light"
          }`}
        >
          <div className="d-flex flex-column text-center me-5">
            <div>P&L</div>
            <div>₹</div>
          </div>
          <div className="d-flex flex-column text-center">
            <div>Capital</div>
            <div>
              {
                // Calculating the sum
                capital.forEach((item) => {
                  console.log(item.net);
                  sum += parseFloat(item.net);
                })
              }
              <div className={sum < 0 ? "red" : "green"}>₹{sum.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* {b?(<OrderPlace load={ert} broker={broker} capital={capital} />):""} */}
      {b ? <BotCard load={ert} broker={broker} capital={capital} /> : ""}
    </div>
  );
}

export default Dashboard;
