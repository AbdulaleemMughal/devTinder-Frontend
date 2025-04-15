import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Badge = ({ skill, onDelete }) => {

  return (
    <div className="user-badge">
      <div className="badge">
        {skill}{" "}
        <RxCross2
          onClick={onDelete}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Badge;
