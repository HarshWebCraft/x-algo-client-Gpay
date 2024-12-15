import { useEffect, useState } from "react";
import "./CryptoWebSocket.css";
const CryptoWebSocket = () => {
  const [prices, setPrices] = useState({});
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket("wss://socket.india.delta.exchange");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setStatus("Connected");

      const subscribeMessage = JSON.stringify({
        type: "subscribe",
        payload: {
          channels: [
            {
              name: "candlestick_1m",
              symbols: [
                "BTCUSD",
                "ETHUSD",
                "DOGEUSD",
                "USDT",
                "BNBUSD",
                "XRPUSD",
                "TRXUSD",
                "TONUSD",
                "AVAXUSD",
                "SOLUSD",
                "DOTUSD",
                "TRBUSD",
                "GALAUSD",
                "RUNEUSD",
                "ARBUSD",
                "SEIUSD",
              ],
            },
          ],
        },
      });
      ws.send(subscribeMessage);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);

      if (data.symbol && data.close && data.volume) {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.symbol]: {
            close: parseFloat(data.close).toFixed(2),
            volume: parseFloat(data.volume).toFixed(2),
            change: data.change || 0,
          },
        }));
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Error");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      setStatus("Disconnected. Reconnecting...");
      // Instead of reloading, you can implement a reconnect logic if needed
      // For example, try reconnecting after a certain delay:
      setTimeout(() => {
        // Attempt reconnect or show a message
        console.log("Attempting to reconnect...");
      }, 5000);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="crypto-container container mt-5">
      <div className="crypto-cards">
        {Object.keys(prices).map((symbol) => (
          <div
            key={symbol}
            className={`crypto-card ${
              prices[symbol].change >= 0 ? "positive" : "negative"
            }`}
          >
            <h3>{symbol}</h3>
            <p>Price: ${prices[symbol].close}</p>
            <p>Volume: {prices[symbol].volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoWebSocket;
