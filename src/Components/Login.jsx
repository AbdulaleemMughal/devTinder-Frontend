import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import Toast from "./Toast";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
      return navigate("/feed");
    } catch (err) {
      setError(err.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card">
        <div className="login-card">
          <h2>{isSignUp ? "SignUp" : "Login"}</h2>
          <div className="login-inputs">
            {isSignUp && (
              <>
                <label>
                  First Name:
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label>
                  last Name:
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label>
              Email Id:
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <p className="error">{error}</p>
            <div className="btn-login">
              {!isSignUp ? (
                <button onClick={handleLogin}>Login</button>
              ) : (
                <button onClick={handleSignUp}>SignUp</button>
              )}
            </div>
            <p className="signup" onClick={() => setIsSignUp(!isSignUp)}>
              {!isSignUp
                ? "New User! Please SignUp.."
                : "Existing User! Please Login.."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
