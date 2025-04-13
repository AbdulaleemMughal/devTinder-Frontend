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
        {connection?.data.map((c) => {
          return (
            <div key={c._id} className="connection-card">
              <img src={c?.photo} />
              <div className="content">
                <p className="name">{c.firstName} {c.lastName}</p>
                <p className="age">Age: {c?.age}</p>
                <p className="gender">Gender: {c?.gender}</p>
                <p className="about">{c?.about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
