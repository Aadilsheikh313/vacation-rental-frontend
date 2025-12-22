import React from "react";
import styles from "../stylesModule/Review/review.module.css";

const CategoryStarRating = ({ value, max = 5 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className={styles.categoryStars}>
      {[...Array(max)].map((_, i) => {
        if (i < full) return <span key={i} className={styles.starFull}>★</span>;
        if (i === full && half) return <span key={i} className={styles.starHalf}>★</span>;
        return <span key={i} className={styles.starEmpty}>★</span>;
      })}
    </div>
  );
};

export default CategoryStarRating;
