import React from "react";
import { RxCross2 } from "react-icons/rx";

const Badge = () => {
  return (
    <div>
      <div className="badge">
        html{" "}
        <RxCross2
          //   onClick={() => deleteSkill(s.id)}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
      </div>
      <div className="badge">
        html{" "}
        <RxCross2
          //   onClick={() => deleteSkill(s.id)}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Badge;
