import React, { useState } from "react";
import "./menubar.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userSchemaRedux } from "../actions/actions";
import { useDispatch } from "react-redux";
import { setEmail } from "../actions/email_action";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Loader from "./loader";

function Signup() {
  const navigate = useNavigate();
  const [email, emailInput] = useState("");
  const [loading, setLoading] = useState(false);
  // const [pass, passInput] = useState('');
  const verified = false;
  // const [pass2, pass2Input] = useState('');
  const dispatch = useDispatch();
  const url =
    process.env.NODE_ENV === "production"
      ? "https://walrus-app-3x9yr.ondigitalocean.app"
      : "http://localhost:5000";

  const f1 = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password is not match",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  };

  const handleSubmit = async (e) => {
    console.log("hello harsh");
    setLoading(true);
    e.preventDefault();
    // if (pass !== pass2) {

    //     f1();

    // }
    // else {
    try {
      console.log("try");
      const a = await axios.post(`${url}/signup`, { email, verified });

      console.log("after try");

      if (a.data.signup) {
        console.log(a.data.userSchema);
        dispatch(userSchemaRedux(a.data.userSchema));
        dispatch(setEmail(email));
        Swal.fire({
          title: "Email is sent",
          text:
            "Please check\n\n" +
            `${email}` +
            "\n\nand click on the link to verify",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "",
          text: "Email already exist",
          icon: "error",
        });
        console.log("error");
      }
      setLoading(false);
    } catch (e) {
      console.log("error " + e);
      setLoading(false);
    }
    // }
  };
  return (
    <div>
      <div
        className="modal fade modal2 text-primary"
        id="signup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="exampleModalLabel">
                Sign up
              </h5>
            </div>
            <div className="modal-body">
              <div className="container">
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    controlId="formBasicEmail2"
                    className="text-center"
                  >
                    <Form.Label className="mt-4">Email address</Form.Label>

                    <Form.Control
                      className="emailField m-auto mt-3"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        emailInput(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="text-center">
                    <Button
                      variant="primary mt-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <div style={{ marginLeft: 10, marginRight: 10 }}>
                          <Loader />
                        </div>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </Form.Group>
                  <div className="row">
                    <button
                      type="button"
                      className="rdbutton text-primary"
                      data-toggle="modal"
                      data-target="#signin"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      Already have account ? Sign in
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
