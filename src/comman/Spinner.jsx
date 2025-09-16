
import React from "react";
import styles from "../stylesModule/Comman/Spinner.module.css";

const CustomSpinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default CustomSpinner;
