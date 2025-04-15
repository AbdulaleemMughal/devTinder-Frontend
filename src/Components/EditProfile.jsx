import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import Toast from "./Toast";
import { RxCross2 } from "react-icons/rx";
import Badge from "./Badge";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photo, setPhoto] = useState(user.photo);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [value, setValue] = useState("");

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
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setError(err.message + " while editing Profile");
      //   console.log(err);
    }
  };

  const handleSkills = () => {
    const newSkill = {
      id: new Date(),
      skill: value,
    };

    setSkills((prev) => [...prev, newSkill]);
    console.log(skills);
    setValue("");
  };

  const deleteSkill = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
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
                <option value="">Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </label>
            <label>
              Skills:
              <div className="skills">
                {skills.map((s) => (
                  // <div className="badge" key={s.id}>
                  //   {s.skill}{" "}
                  //   <RxCross2
                  //     onClick={() => deleteSkill(s.id)}
                  //     style={{ fontSize: "14px", cursor: "pointer" }}
                  //   />
                  // </div>
                  <Badge
                    key={s.id}
                    skill={s.skill}
                    onDelete={() => deleteSkill(s.id)}
                  />
                ))}
              </div>
              <div className="skill-input">
                <input
                  type="text"
                  placeholder="Enter Skills here..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={handleSkills}>Add</button>
              </div>
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
