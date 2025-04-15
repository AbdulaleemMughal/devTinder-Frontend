import React, { useState } from "react";
import "../Styles/userCard.css";
import { useDispatch, useSelector } from "react-redux";
import Badge from "./Badge";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { removeConnections } from "../utils/connectionSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, gender, photo, age, skills, about } = user;
  const loggedInUser = useSelector((store) => store.user);

  const sendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeConnections(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    user && (
      <div className="card-container">
        <div className="custom-card">
          <div className="card-figure">
            <img src={photo} alt="Shoes" />
          </div>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            {age && <p>Age: {age}</p>}
            {gender && <p>Gender: {gender}</p>}
            {skills &&
              skills.map((s) => {
                <p>
                  Skills: <Badge skill={s.skill} />
                </p>;
              })}
            <p className="description">{about}</p>
            {user && _id !== loggedInUser._id && (
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => sendRequest("ignored", _id)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => sendRequest("interested", _id)}
                >
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
