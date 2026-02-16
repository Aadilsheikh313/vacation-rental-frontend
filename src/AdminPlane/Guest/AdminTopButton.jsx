
import React, { useState } from "react";
import styles from "../../adminStylesModule/Host/topButton.module.css";

const AdminButtonTop = ({ onSelectView }) => {
  const [active, setActive] = useState("all");

  const handleClick = (view) => {
    setActive(view);
    onSelectView(view);
  };

  return (
    <div className={styles.adminButtonBar}>
      <button
        className={`${styles.filterBtn} ${active === "all" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("all")}
      >
        All Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "active" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("active")}
      >
        Active Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "dailyactive" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("dailyactive")}
      >
        Daily Active Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "online" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("online")}
      >
        Online Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "newRegister" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("newRegister")}
      >
        New Register Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "logout" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("logout")}
      >
        Logout Guests
      </button>

      <button
        className={`${styles.filterBtn} ${active === "banned" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("banned")}
      >
        Banned Guests
      </button>
    </div>
  );
};

export default AdminButtonTop;
