import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { addUser } from "../utils/userSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      navigate("/login");
      dispatch(addUser(null));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="flex-1">
          <Link to="/" className="btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 profile">
            <p className="name">Welcome, {user.firstName}</p>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn-ghost btn-circle avatar"
              >
                <div className="avatar-img">
                  <img
                    onClick={() => setDropdown(!dropdown)}
                    alt="Tailwind CSS Navbar component"
                    src={user.photo}
                  />
                </div>
              </div>
              {dropdown && (
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile" className="justify-between profile">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                  <li>
                    <a>Change Password</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
