import React, { useEffect, useState } from "react";

const Active = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSD");
  const [priceData, setPriceData] = useState(null);
  const [message, setMessage] = useState("");

  // List of symbols for the dropdown
  const symbols = [
    "BTCUSD",
    "ETHUSD",
    "DOGEUSD",
    "SOLUSD",
    "XRPUSD",
    "BNBUSD",
    "AVAXUSD",
    "FTMUSD",
    "ADAUSD",
    "UNIUSD",
    "BCHUSD",
    "SHIBUSD",
    "DOTUSD",
    "WIFUSD",
    "BONKUSD",
    "LINKUSD",
    "LTCUSD",
    "PEPEUSD",
    "SUIUSD",
    "NEIROUSD",
    "TRXUSD",
    "TRBUSD",
    "FLOKIUSD",
    "AAVEUSD",
    "INJUSD",
    "JTOUSD",
    "WLDUSD",
    "GALAUSD",
    "MEMEUSD",
    "APTUSD",
    "XAIUSD",
    "ONDOUSD",
    "SAGAUSD",
    "EIGENUSD",
    "TIAUSD",
    "ATOMUSD",
    "PENDLEUSD",
    "NOTUSD",
    "PEOPLEUSD",
    "TAOUSD",
    "IOUSD",
    "NEARUSD",
    "HBARUSD",
    "BBUSD",
    "MKRUSD",
    "SEIUSD",
    "ARBUSD",
    "ETHFIUSD",
    "OPUSD",
    "POLUSD",
    "ALGOUSD",
    "ALTUSD",
    "DYDXUSD",
    "ENAUSD",
    "ZKUSD",
    "ETCUSD",
    "LDOUSD",
    "STXUSD",
    "RUNEUSD",
    "FILUSD",
    "MANTAUSD",
    "ZROUSD",
    "ORDIUSD",
    "LISTAUSD",
    "ARUSD",
    "OMNIUSD",
    "SUSHIUSD",
    "BLURUSD",
  ];

  useEffect(() => {
    // Replace with your server's URL
    const ws = new WebSocket("wss://websocket-0h64.onrender.com");

    ws.onopen = () => {
      console.log("Connected to WebSocket server for live updates");
      setMessage("Connected to WebSocket server for live updates");

      // Subscribe to the initially selected symbol
      ws.send(JSON.stringify({ symbol: selectedSymbol }));
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

    // Re-subscribe when the selected symbol changes
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ symbol: selectedSymbol }));
    }

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [selectedSymbol]);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  return (
    <div>
      <h2>WebSocket Live Price Updates</h2>
      {message && <p>{message}</p>}

      {/* Dropdown for selecting symbols */}
      <label htmlFor="symbol">Select Symbol: </label>
      <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>

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
