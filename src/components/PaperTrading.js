import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./paperTrading.css";
import axios from "axios";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import React from "react";

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
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the Excel file
        const response = await axios.get("/data.xlsx", {
          responseType: "arraybuffer",
        });
        const data = new Uint8Array(response.data);
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Format the parsed data
        const formattedData = parsedData.slice(1).map((row, index) => ({
          no: index + 1,
          signalTime: row[1],
          symbol: row[2],
          quantity: row[3],
          entryPrice: row[4],
          exit: row[5],
          pl: row[6],
        }));
        setTrades(formattedData);
      } catch (error) {
        console.error("Error fetching Excel data: ", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  // useEffect(() => {

  //     const now = new Date();
  //     const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, now.getMinutes(), now.getSeconds()+5); // 09:59:59
  //     console.log(targetTime)
  //     let timeUntilTarget = targetTime - now;

  //     if (timeUntilTarget < 0) {
  //         targetTime.setDate(targetTime.getDate() + 1);
  //         timeUntilTarget = targetTime - now;
  //     }

  //     const timerId = setTimeout(async () => {

  //         const response2 = await axios.post(`${url}/getSymbol');
  //         console.log(response2.data)

  //         setCeToken(response2.data.ceToken)
  //         setPeToken(response2.data.peToken)
  //         setCeHigh(response2.data.cehigh)
  //         setPeHigh(response2.data.pehigh)

  //     }, timeUntilTarget);

  // }, [])

  const ws = new WebSocket("wss://walrus-app-3x9yr.ondigitalocean.app");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };
  //     const data = JSON.parse(event.data);
  //     console.log(data.last_traded_price/10)

  //     const data = JSON.parse(event.data);
  //     // console.log(data);
  //     console.log(data.last_traded_price)

  //     if (data.token == `"${ceToken}"`) {
  //         setliveCE(data.last_traded_price);
  //     }
  //     if (data.token == `"${peToken}"`) {
  //         setlivePE(data.last_traded_price);
  //     }
  //     if (!ceEnd && data.token == `"${ceToken}"`) {
  //         setCeLTP(data.last_traded_price);

  //         if (data.last_traded_price / 100 > ceHigh && !ceEntry) {
  //             setEntryPrice(data.last_traded_price / 100);
  //             setCeST(data.last_traded_price / 100 - 30);
  //             setCeTP(data.last_traded_price / 100 + 30);
  //             setPeEnd(true);
  //             setCeEntry(true);
  //         }
  //         if (data.last_traded_price / 100 > ceTP && ceEntry) {
  //             setCeEnd(true);
  //         }
  //         if (data.last_traded_price / 100 < ceST && ceEntry && !exitFlag) {
  //             setExit(data.last_traded_price / 100);
  //             setExitFlag(true);
  //             setCeEnd(true);
  //         }
  //         if (ceEntry && !exitFlag) {
  //             setPL((data.last_traded_price / 100 - entryPrice) * 15);
  //         }
  //     }

  //     if (data.token == `"${peToken}"` && !peEnd) {
  //         setPeLTP(data.last_traded_price / 100);

  //         if (data.last_traded_price / 100 > peHigh && !peEntry) {
  //             setEntryPrice(data.last_traded_price / 100);
  //             setPeST(data.last_traded_price / 100 - 30);
  //             setPeTP(data.last_traded_price / 100 + 30);
  //             setCeEnd(true);
  //             setPeEntry(true);
  //         }
  //         if (data.last_traded_price / 100 > peTP && peEntry) {
  //             setPeEnd(true);
  //         }
  //         if (data.last_traded_price / 100 < peST && peEntry && !exitFlag) {
  //             setExit(data.last_traded_price / 100);
  //             setExitFlag(true);
  //             setPeEnd(true);
  //         }
  //         if (peEntry && !exitFlag) {
  //             setPL((data.last_traded_price / 100 - entryPrice) * 15);
  //         }
  //     }

  // }

  return (
    <div className="container">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`${
          localStorage.getItem("theme") == "light-theme"
            ? "row jahgs"
            : "jhsbdchjbdcbs"
        }`}
      >
        <div
          className={`${
            localStorage.getItem("theme") == "light-theme"
              ? "col-12 hdfhj"
              : "jhcbhjdbdcjbsdjcbjhs"
          }`}
        >
          Active Trade
        </div>
        <div className="col-12">
          <table
            className={`${
              localStorage.getItem("theme") == "light-theme"
                ? "col-12 kjhuk"
                : "hasbchjbasbhjabjh"
            }`}
          >
            <tbody>
              <tr className="adsdas">
                <th className="col-1 p-2">No</th>
                <th className="col-2 p-2">Signal Time</th>
                <th className="col-2 p-2">Symbol</th>
                <th className="col-2 p-2">Quantity</th>
                <th className="col-2 p-2">Entry Price</th>
                <th className="col-2 p-2">Exit</th>
                <th className="col-1 p-2">P&L</th>
              </tr>
              {trades.map((trade, index) => (
                <tr key={index}>
                  <td className="col-1 p-2">{trade.no}</td>
                  <td className="col-2 p-2">{trade.signalTime}</td>
                  <td className="col-2 p-2">{trade.symbol}</td>
                  <td className="col-2 p-2">{trade.quantity}</td>
                  <td className="col-2 p-2">{trade.entryPrice}</td>
                  <td className="col-2 p-2">{trade.exit}</td>
                  <td className="col-1 p-2">{trade.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PaperTrading;
