import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photo, setPhoto] = useState(user.photo);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photo,
          age,
          about,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      console.log(res?.data?.data);
    } catch (err) {
      setError(err.message + " while editing Profile");
      //   console.log(err);
    }
  };

  return (
    <div className="edit-profile">
      <div className="card">
        <div className="login-card">
          <h2>Edit Your Profile</h2>
          <div className="login-inputs">
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Photo:
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </label>
            <label>
              About:
              <textarea
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <p className="error">{error}</p>
            <div className="btn-login">
              <button onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={user} />
      {showToast && <Toast message="Profile Updated" />}
    </div>
  );
};

export default EditProfile;
