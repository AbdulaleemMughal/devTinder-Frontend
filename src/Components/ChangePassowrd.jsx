import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import Toast from "./Toast";

const ChangePassowrd = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [update, setUpdate] = useState("");

  const changePassword = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/profile/password",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      setUpdate(res.data);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      setError("");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      {showToast && <Toast message={update} />}
      <div className="card">
        <div className="login-card">
          <h2>Chnage Your Passowrd</h2>
          <div className="login-inputs">
            <label>
              Old Password:
              <input
                type="text"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label>
              New Password:
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <p className="error">{error}</p>
            <div className="btn-login">
              <button onClick={changePassword}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassowrd;
