import React from "react";
import styles from "../stylesModule/Review/review.module.css";

const CircularRating = ({ value }) => {
  const percentage = (value / 5) * 100;

  return (
    <div
      className={styles.circle}
      style={{
        background: `conic-gradient(#ff385c ${percentage}%, #eee 0%)`,
      }}
    >
      <span className={styles.circleText}>{value}</span>
    </div>
  );
};

export default CircularRating;
