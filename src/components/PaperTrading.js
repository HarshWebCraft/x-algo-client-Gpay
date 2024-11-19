import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./paperTrading.css";
import axios from "axios";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import React from "react";
import { ProductionUrl } from "../URL/url";
import { Container } from "react-bootstrap";
import PaperTradeTable from "./PaperTradeTable";

function PaperTrading({ darkMode, toggleDarkMode }) {
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const [ceToken, setCeToken] = useState(0);
  const [peToken, setPeToken] = useState(0);
  const [ceHigh, setCeHigh] = useState();
  const [peHigh, setPeHigh] = useState(0);
  const [ceLTP, setCeLTP] = useState(0);
  const [peLTP, setPeLTP] = useState(0);
  const [ceST, setCeST] = useState(0);
  const [peST, setPeST] = useState(0);
  const [exit, setExit] = useState(0);
  const [ceEnd, setCeEnd] = useState(false);
  const [peEnd, setPeEnd] = useState(false);
  const [peTP, setPeTP] = useState(0);
  const [ceTP, setCeTP] = useState(0);
  const [peEntry, setPeEntry] = useState(false);
  const [ceEntry, setCeEntry] = useState(false);
  const [exitFlag, setExitFlag] = useState(false);
  const [entryPrice, setEntryPrice] = useState(0);
  const [liveCE, setliveCE] = useState(0);
  const [livePE, setlivePE] = useState(0);
  const [PL, setPL] = useState(0);
  const [webSocketData, setWebSocketData] = useState(null);
  const [i, setI] = useState(0);
  const [a, seta] = useState("");

  const [trades, setTrades] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  return (
    <div className="">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <PaperTradeTable />
    </div>
  );
}
export default PaperTrading;
