// ReviewForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewPosts } from "../config/redux/action/reviewAction";
import { resetStatus } from "../config/redux/reducer/reviewReducer";
import StarInput from "./StarInput";
import {
  showSuccess,
  showError,
  showWarning,
} from "../utils/toastUtils";

const ReviewForm = ({ propertyId, onClose }) => {
  const dispatch = useDispatch();

  const { token, loggedIn } = useSelector((state) => state.auth);
  const { isLoading, message, isError } = useSelector((state) => state.review);

  // ⭐ Ratings
  const [rating, setRating] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [comfort, setComfort] = useState(5);
  const [service, setService] = useState(5);
  const [location, setLocation] = useState(5);
  const [comment, setComment] = useState("");

  /* ===============================
     SHOW REDUX MESSAGE IN TOAST
  =============================== */
  useEffect(() => {
    if (!message) return;

    if (isError) {
      showError(message);
    } else {
      showSuccess(message);

      // ✅ SAFE CALL
      if (typeof onClose === "function") {
        onClose();
      }
    }

    dispatch(resetStatus());
  }, [message, isError, dispatch, onClose]);


  /* ===============================
     SUBMIT REVIEW
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      showWarning("Please write a comment before submitting.");
      return;
    }

    dispatch(
      createReviewPosts({
        propertyId,
        token,
        rating,
        cleanliness,
        comfort,
        service,
        location,
        comment,
      })
    );

    // Reset form
    setRating(5);
    setCleanliness(5);
    setComfort(5);
    setService(5);
    setLocation(5);
    setComment("");
  };

  if (!loggedIn || !token) {
    return (
      <div className="alert alert-warning">
        Please login to write a review
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Write a Review</h5>

      {/* Overall */}
      <div className="mb-3">
        <label>Overall Rating</label>
        <StarInput rating={rating} setRating={setRating} />
      </div>

      {/* Sub ratings */}
      <div className="mb-3">
        <label>Cleanliness</label>
        <StarInput rating={cleanliness} setRating={setCleanliness} />
      </div>

      <div className="mb-3">
        <label>Comfort</label>
        <StarInput rating={comfort} setRating={setComfort} />
      </div>

      <div className="mb-3">
        <label>Service</label>
        <StarInput rating={service} setRating={setService} />
      </div>

      <div className="mb-3">
        <label>Location</label>
        <StarInput rating={location} setRating={setLocation} />
      </div>

      {/* Comment */}
      <div className="mb-3">
        <label>Comment</label>
        <textarea
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>

      <button className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Posting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
