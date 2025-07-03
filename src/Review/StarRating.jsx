import React from "react";

const StarRating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <span className="text-warning">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalfStar && <span>½</span>}
      {Array.from({ length: maxStars - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <span key={`empty-${i}`} className="text-secondary">☆</span>
      ))}
    </span>
  );
};

export default StarRating;
