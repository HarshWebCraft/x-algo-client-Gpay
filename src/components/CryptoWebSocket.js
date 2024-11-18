import React, { useEffect, useState } from "react";
import "./CryptoWebSocket.css"; // Create this CSS file for styling

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

      // Update prices if data contains symbol, close price, and volume
      if (data.symbol && data.close && data.volume) {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.symbol]: {
            close: parseFloat(data.close).toFixed(2),
            volume: parseFloat(data.volume).toFixed(2), // Parse and format the volume
            change: data.change || 0, // Replace `data.change` with actual percentage change from API if available
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
      setTimeout(() => {
        window.location.reload();
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
