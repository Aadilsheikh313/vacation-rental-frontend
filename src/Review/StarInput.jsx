import React from "react";

const StarInput = ({ rating, setRating, max = 5 }) => {
  return (
    <div className="mb-2">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: "pointer",
              fontSize: "1.8rem",
              color: starValue <= rating ? "#ffc107" : "#e4e5e9",
            }}
            onClick={() => setRating(starValue)}
            onMouseOver={() => setRating(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarInput;
