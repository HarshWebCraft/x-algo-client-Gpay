import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./profile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { set } from "mongoose";
import {
  loginSuccess,
  angelId,
  deleteBroker,
  addItem,
  removeItem,
  brokerLogin,
  userSchemaRedux,
  allClientData,
} from "../actions/actions";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const email = useSelector((state) => state.email.email);
  const userInitial = email.charAt(0).toUpperCase();

  const clientdata = useSelector((state) => state.account.allClientData);

  console.log(clientdata);
  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [newImg, setnewImg] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [broker, setbroker] = useState("");

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const haandleclose = () => setShow(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(`${url}/profile`, { email });
        if (response.data) {
          setName(response.data.name);
          setNumber(response.data.number);
          setnewImg(response.data.profile_img);
          setbroker(response.data.broker);
          console.log(broker);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  console.log(file);
  console.log(newImg);
  const iconStyle = {
    position: "relative",
    width: "10em",
    height: "10em",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  };

  const iconStyle2 = {
    width: "5em",
    height: "5em",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  };

  const handleSave = async () => {
    setFile(newImg);
    try {
      const response = await axios.post(`${url}/updateprofile`, {
        email,
        number,
        name,
        file,
      });
      if (response.data) {
        console.log(response.data);
        setnewImg(response.data.profile_img);
        Swal.fire({
          icon: "success",
          text: "Profile updated",
        });
        setShow(false);
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          text: "Not updated",
        });
        setShow(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const MainImg = e.target.files[0];
    console.log(MainImg);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setFile(base64);
    };

    if (MainImg) {
      reader.readAsDataURL(MainImg);
    }
  };

  const CloseButton = () => {
    setShow(false);
  };

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem("theme")}`;
  }, []);

  return (
    <div
      className={
        localStorage.getItem("theme") == "light-theme"
          ? "container"
          : "jhvchdfesubgbewhgd container"
      }
    >
      <Navbar />
      <div
        className={
          localStorage.getItem("theme") == "light-theme"
            ? "abnc"
            : "hjvsgcvajsbcnascasc"
        }
      >
        <div className="dbnjavnnmcmasldasxasxa">
          {newImg == "" ? (
            <div style={iconStyle} className="profilePic">
              <div>
                <span className="akju">{userInitial}</span>
              </div>
            </div>
          ) : (
            <img src={newImg} alt="Profile" className="absc" />
          )}
        </div>
        <div className="ksljd">
          <div>
            <table>
              <tr className="vasgvchjca">
                <td>Name :</td>
                <td className="bgwvgahdvbasasdmnabsd">{name}</td>
              </tr>
              <tr className="vasgvchjca">
                <td>Email :</td>
                <td className="bgwvgahdvbasasdmnabsd">{email}</td>
              </tr>
              <tr className="vasgvchjca">
                <td>Mobile No:</td>
                <td className="bgwvgahdvbasasdmnabsd">{number}</td>
              </tr>
              <tr className="vasgvchjca bhgvghvgghgvbn">
                <td className="bgwvgahdvbasasdmnabsd">
                  <Button onClick={handleShow} className="btn btn-primary">
                    Edit
                  </Button>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                {clientdata.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userData.data.clientcode}</td>
                    <td
                      style={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.userData.data.name.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className={"hsdbhbhbsbhfbhfbvhajvnjka"}
          >
            <Modal.Header
              className={
                localStorage.getItem("theme") == "light-theme"
                  ? ""
                  : "kbdsfgvbfnhavfyydcdfnm"
              }
            >
              <Modal.Title>Update Profile</Modal.Title>
              <Button
                type="submit"
                onClick={haandleclose}
                className="btn-close"
                aria-label="Close"
              ></Button>
            </Modal.Header>
            <Modal.Body
              className={
                localStorage.getItem("theme") == "light-theme"
                  ? ""
                  : "kbdsfgvbfnhavfyydcdfnm"
              }
            >
              <Form>
                <div className="kjnavrcrefcefj">
                  <div style={iconStyle2} className="sdnjksdnvbshdvbhjsbhdv">
                    <div>
                      <label htmlFor="ajsd">
                        <div>
                          {newImg ? (
                            <img
                              src={newImg}
                              alt="Profile"
                              className="profilePic2"
                            />
                          ) : (
                            <div style={iconStyle2} className="profilePic3">
                              <div>
                                <span className="akju">{userInitial}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        id="ajsd"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <Row className="col-12 p-2 m-2">
                  <Col xs={2}>
                    <Form.Label>Name:</Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="col-12 p-2 m-2">
                  <Col xs={2}>
                    <Form.Label>Email:</Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Control type="text" value={email} readOnly />
                  </Col>
                </Row>
                <Row className="col-12 p-2 m-2">
                  <Col xs={2}>
                    <Form.Label>Mobile No:</Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Control
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer
              className={
                localStorage.getItem("theme") == "light-theme"
                  ? ""
                  : "kbdsfgvbfnhavfyydcdfnm"
              }
            >
              <Button variant="primary" onClick={handleSave}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Profile;
