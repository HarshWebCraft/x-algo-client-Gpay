import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button, Dropdown, Form, Nav, NavDropdown } from "react-bootstrap";
import "./deployed.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { allClientData, userSchemaRedux } from "../actions/actions";
import React from "react";
import { ProductionUrl } from "../URL/url";
import DeployedCard from "./DeployedCard";
import Loader from "./loader";
import Spinner from "./Spinner";

function Deployed({ darkMode, toggleDarkMode, setLoading }) {
  const [accountid, setaccountid] = useState("");
  const [applieddate, setapplieddate] = useState("");
  const [totaltrades, settotaltrades] = useState("");
  const [pl, setpl] = useState("");
  const [capital, setCapital] = useState([]);
  let sum = 0;
  const [allcap, setallcap] = useState("");
  const [loader, setLoader] = useState(true);

  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const Email = useSelector((state) => state.email.email);
  const dispatch = useDispatch();
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";
  const Deployed = userSchema.DeployedData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/addbroker`, {
          First: false,
          Email,
          userSchema,
        });

        const profileData = await axios.post(`${url}/userinfo`, { Email });
        dispatch(allClientData(profileData.data));
        const dbschema = await axios.post(`${url}/dbSchema`, { Email });
        dispatch(userSchemaRedux(dbschema.data));
        console.log(response.data);
        console.log(capital);

        console.log(sum);
        setallcap(sum);
        console.log(capital);

        const a = response.data;
        const newCapital = a.map((user) => user.userData.data);
        setCapital(newCapital);
        setLoader(false);
      } catch (e) {}
    };
    fetchData();
  }, []);

  const removeDeployed = async (id) => {
    const response = await axios.post(`${url}/removeDeployed`, { Email, id });
    dispatch(userSchemaRedux(response.data));
  };

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  return (
    <div className="">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setLoading={setLoading}
      />
      <div className="Deployed">
        <div className="container" style={{ marginTop: "5em" }}>
          {loader ? (
            <div className="hjg gfhglio">
              <Spinner />
            </div>
          ) : (
            <DeployedCard capital={capital} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Deployed;
