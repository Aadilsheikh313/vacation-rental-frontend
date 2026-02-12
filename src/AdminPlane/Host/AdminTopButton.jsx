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
        All Host
      </button>

      <button
        className={`${styles.filterBtn} ${active === "newRegister" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("newRegister")}
      >
        All Pending Host
      </button>

      <button
        className={`${styles.filterBtn} ${active === "Verify" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("Verify")}
      >
        Verify
      </button>

      <button
        className={`${styles.filterBtn} ${active === "Reject" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("Reject")}
      >
        Reject
      </button>

      <button
        className={`${styles.filterBtn} ${active === "active" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("active")}
      >
        Active Host
      </button>

      <button
        className={`${styles.filterBtn} ${active === "online" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("online")}
      >
        Online Host
      </button>

      <button
        className={`${styles.filterBtn} ${active === "logout" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("logout")}
      >
        Logout Host
      </button>

      <button
        className={`${styles.filterBtn} ${active === "banned" ? styles.activeBtn : ""}`}
        onClick={() => handleClick("banned")}
      >
        Banned Host
      </button>
    </div>
  );
};

export default AdminButtonTop;
