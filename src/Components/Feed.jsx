import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    feed && (
      <div>
        <UserCard user={feed.data[2]} />
      </div>
    )
  );
};

export default Feed;
