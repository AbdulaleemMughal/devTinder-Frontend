import axios from "axios";
import "../Styles/connections.css";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Toast from "./Toast";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connetions", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  if (!connection) return;

  return (
    <div>
      {showToast && <Toast message={connection.message} />}
      <div className="connections">
        <h1>All Connections</h1>
        <div className="connection-card">
          <img src="https://yt3.ggpht.com/q4nxVsWXgtT94Va0g9-uPQNgC-fzBjHW9mRt26LnObMAHs1FJrShTnd6tTCudzbbgcZvjuaP=s88-c-k-c0x00ffffff-no-rj" />
          <div className="content">
            <p className="name">Akshay Saini</p>
            <p className="age">Age: 18</p>
            <p className="gender">Gender: male</p>
            <p className="about">this is Elon musk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
