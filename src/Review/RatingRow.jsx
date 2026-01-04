import React from "react";
import StarRating from "./StarRating";
import styles from "../stylesModule/Review/reviewList.module.css";

const RatingRow = ({ label, value }) => {
  if (value === undefined || value === null) return null;

  return (
    <div className={styles.breakdownItem}>
      <span className={styles.breakdownLabel}>{label}</span>

      <div className={styles.breakdownStars}>
        <StarRating rating={value} />
        <span className={styles.breakdownValue}>
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default RatingRow;
