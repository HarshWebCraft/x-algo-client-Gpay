import React, { useEffect, useState } from "react";

const Active = () => {
  const [priceData, setPriceData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Replace with your server's URL
    const ws = new WebSocket("wss://websocket-0h64.onrender.com");

    ws.onopen = () => {
      console.log("Connected to WebSocket server for live updates");
      setMessage("Connected to WebSocket server for live updates");

      // Subscribe to BTCUSD updates (or any other token)
      ws.send(JSON.stringify({ symbol: "BTCUSD" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.symbol && data.price) {
        setPriceData({ symbol: data.symbol, price: data.price });
      } else if (data.message) {
        setMessage(data.message); // Subscription confirmation or other server messages
      } else if (data.error) {
        console.error(data.error); // Error messages
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setMessage("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setMessage("WebSocket error occurred");
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Live Price Updates</h2>
      {message && <p>{message}</p>}
      {priceData ? (
        <p>
          Received live update - {priceData.symbol}: {priceData.price}
        </p>
      ) : (
        <p>No price updates yet</p>
      )}
    </div>
  );
};

export default Active;
