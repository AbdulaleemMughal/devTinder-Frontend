import axios from "axios";
import "../Styles/connections.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSLice";
import Toast from "./Toast";
import { BASE_URL } from "../utils/contants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, []);

  const reveiwRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/reveiw/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));

    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return <h1>No request found</h1>;

  if (requests.data.length === 0) return <h1>No Connection found.</h1>;

  return (
    <div>
      {showToast && <Toast message={requests.message} />}
      <div className="connections">
        <h1>All Request</h1>
        {requests?.data.map((c) => {
          const { _id, firstName, lastName, photo, age, gender, about } =
            c.fromUserId;

          return (
            <div key={_id} className="connection-card">
              <img src={photo} />
              <div className="content">
                <p className="name">
                  {firstName} {lastName}
                </p>
                <p className="age">Age: {age}</p>
                <p className="gender">Gender: {gender}</p>
                <p className="about">{about}</p>
              </div>
              <div className="request-btn">
                <button onClick={() => reveiwRequest("rejected", c._id)}>
                  Reject
                </button>
                <button onClick={() => reveiwRequest("accepted", c._id)}>
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
