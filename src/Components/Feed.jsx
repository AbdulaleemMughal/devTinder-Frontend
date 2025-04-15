import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Toast from "./Toast";

const Feed = () => {
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(
        BASE_URL + "/user/feed",
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(res.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return <h1>No Feed Updated</h1>;
  return (
    feed && (
      <div>
        {toast && <Toast message={feed.message} />}
        <UserCard user={feed.data[0]} />
      </div>
    )
  );
};

export default Feed;
