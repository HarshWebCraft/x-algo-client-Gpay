import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./myWallet.css";
import "./button.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBell,
  FaSearch,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaBriefcase,
  FaBed,
  FaExchangeAlt,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";
import { FaCutlery } from "react-icons/fa";
import { ProductionUrl } from "../URL/url";

const MyWallet = ({ darkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const Email = useSelector((state) => state.email.email);
  const [balance, setbalance] = useState("");
  const [transaction, settransaction] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    setLoading2(true);
    const newAmount = async () => {
      const response = await axios.post(`${url}/newamount`, { Email });
      setbalance(response.data.balance);
      settransaction(response.data.Transaction);
    };
    newAmount();
    setLoading2(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/addtowallet`, {
        Email,
        amount,
      });
      console.log(response.data.order);
      const options = {
        key: "x",
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: "X-Algo",
        description: "Test Transaction",
        order_id: response.data.order.id,
        handler: async (response) => {
          try {
            const verification = await axios.post(`${url}/verify-payment`, {
              Email,
              amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verification.data) {
              window.location.reload();
            } else {
              alert("Payment failed");
              window.location.reload();
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        prefill: {
          name: response.data.Name,
          email: response.data.Email,
          contact: response.data.MobileNo,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#0000FF",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.className = localStorage.getItem("theme");
  }, []);

  return (
    <div className="">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={
          localStorage.getItem("theme") === "light-theme" ? "thaksn" : "rgvba"
        }
      >
        {loading ? (
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
        ) : (
          <div className="aiydgcjkdmcsd container">
            <h2 className="oquen">My Balance</h2>
            <div className="fund">
              <h2 className="aksbandjkanskcmjkdc"></h2>
              {loading2 ? (
                <div class="loader4"></div>
              ) : (
                <h2 className="ahsbhsdfgsgvfsgh">₹{balance}</h2>
              )}
            </div>
            <div className="with-dipo-button">
              <Button className="qscavn" onClick={handleShow}>
                Deposit
              </Button>
              <Button className="qscavn2">Withdraw</Button>
            </div>
          </div>
        )}

        <div>
          <div>
            <div className="wrapper rounded">
              <div className="mt-3 p-4 ">
                <table
                  className={`table masbdavghsvdghcvsghd ${
                    localStorage.getItem("theme") == "light-theme"
                      ? "table-light"
                      : "table-dark"
                  }`}
                >
                  <thead>
                    <tr>
                      <th scope="col" className="text-center text-primary">
                        Type
                      </th>
                      <th scope="col" className="text-center text-primary">
                        razorpay_payment_id
                      </th>
                      <th scope="col" className="text-center text-primary">
                        razorpay_order_id
                      </th>
                      <th scope="col" className="text-center text-primary">
                        Date
                      </th>
                      <th scope="col" className="text-center text-primary">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map((transaction, index) => (
                      <tr key={index}>
                        <td className="text-right text-center">
                          {transaction.payment_type == "Deposit" ? (
                            <p style={{ color: "green" }}>
                              {transaction.payment_type}
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>
                              {transaction.payment_type}
                            </p>
                          )}
                        </td>
                        <td className="text-center">
                          {transaction.razorpay_payment_id}
                        </td>
                        <td className="text-center">
                          {transaction.razorpay_order_id}
                        </td>
                        <td className="text-center">{transaction.date}</td>
                        <td className="text-right text-center">
                          {transaction.payment_type == "Deposit" ? (
                            <p style={{ color: "green" }}>
                              {transaction.amount}
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>{transaction.amount}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Add To Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="text-primary">Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default MyWallet;
