import React from "react";
import "../Styles/userCard.css";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, photo, age, skills, about } = user;
  const loggedInUser = useSelector((store) => store.user);

  return (
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
          <p className="description">{about}</p>
          {_id !== loggedInUser._id && (
            <div className="card-actions">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
