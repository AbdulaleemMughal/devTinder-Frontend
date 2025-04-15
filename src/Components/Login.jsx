import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

      console.log(res?.data);
      dispatch(addUser(res?.data));
      return navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return (
    <div className="card">
      <div className="login-card">
        <h2>Login</h2>
        <div className="login-inputs">
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
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
