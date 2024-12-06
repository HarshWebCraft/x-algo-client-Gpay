import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button, Dropdown, Form, Nav, NavDropdown } from "react-bootstrap";
import "./deployed.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userSchemaRedux } from "../actions/actions";
import React from "react";
import { ProductionUrl } from "../URL/url";
import DeployedCard from "./DeployedCard";

function Deployed({ darkMode, toggleDarkMode, setLoading }) {
  const [accountid, setaccountid] = useState("");
  const [applieddate, setapplieddate] = useState("");
  const [totaltrades, settotaltrades] = useState("");
  const [pl, setpl] = useState("");
  const [capital, setCapital] = useState([]);
  let sum = 0;
  const [allcap, setallcap] = useState("");

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
        console.log(response.data);
        console.log(capital);

        console.log(sum);
        setallcap(sum);
        console.log(capital);

        const a = response.data;
        const newCapital = a.map((user) => user.userData.data);
        setCapital(newCapital);
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
      <div className="container">
        <DeployedCard capital={capital} />
      </div>
    </div>
  );
}
export default Deployed;
