import React, { useState } from "react";
import styles from "../adminStylesModule/adminDash.module.css";

const CustomButtonTop = ({ onSelectView }) => {
  const [active, setActive] = useState("all");

  const handleClick = (view) => {
    setActive(view);
    onSelectView(view);
  };

  return (
    <div className={styles.adminButtonBar}>
      <button
        className={`${styles.filterBtn} ${
          active === "all" ? styles.activeBtn : ""
        }`}
        onClick={() => handleClick("all")}
      >
        All Properties
      </button>

      <button
        className={`${styles.filterBtn} ${
          active === "active" ? styles.activeBtn : ""
        }`}
        onClick={() => handleClick("active")}
      >
        Active
      </button>

      <button
        className={`${styles.filterBtn} ${
          active === "cancelled" ? styles.activeBtn : ""
        }`}
        onClick={() => handleClick("cancelled")}
      >
        Cancelled
      </button>

      <button
        className={`${styles.filterBtn} ${
          active === "upcoming" ? styles.activeBtn : ""
        }`}
        onClick={() => handleClick("upcoming")}
      >
        Upcoming
      </button>

      <button
        className={`${styles.filterBtn} ${
          active === "pastbooking" ? styles.activeBtn : ""
        }`}
        onClick={() => handleClick("pastbooking")}
      >
        Past
      </button>
    </div>
  );
};

export default CustomButtonTop;
