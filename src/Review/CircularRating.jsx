import React, { useEffect, useState } from "react";
import styles from "../stylesModule/Review/review.module.css";

const CircularRating = ({ value }) => {
  const [progress, setProgress] = useState(0);
  const percentage = (value / 5) * 100;

  useEffect(() => {
    setTimeout(() => {
      setProgress(percentage);
    }, 200); // smooth delay
  }, [percentage]);

  return (
    <div
      className={styles.circle}
      style={{
        background: `conic-gradient(
          #FFD700 ${progress}%,
          #FFB347 ${progress + 8}%,
          #eee 0%
        )`,
      }}
    >
      <span className={styles.circleText}>{value.toFixed(1)}</span>
    </div>
  );
};

export default CircularRating;
