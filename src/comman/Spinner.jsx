import React from "react";
import styles from "../stylesModule/Comman/Spinner.module.css";

const CustomSpinner = ({ size = "md" }) => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
    </div>
  );
};

export default CustomSpinner;
