import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewPosts, getAllReviewPosts } from "../config/redux/action/reviewAction";
import { resetStatus } from "../config/redux/reducer/reviewReducer";
import StarInput from "./StarInput";
import { showWarning } from "../utils/toastUtils";

const ReviewForm = ({ propertyId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { token , loggedIn  } = useSelector((state) => state.auth);
  const { isLoading, message, isError } = useSelector((state) => state.review);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a comment before submitting your review.");
      return;
    }

   const res =  await dispatch(createReviewPosts({ propertyId, token, rating, comment }));
   if(res?.payload?.message === "You have already reviewed this property"){
    showWarning("🛑 You already reviewed this property.");
   }else if(res?.payload?.success){
    showSuccess("✅ Review submitted successfully.");
   }else {
      showError("❌ Failed to post review.");
    }
    
    await dispatch(getAllReviewPosts(propertyId)); // ✅ Refresh only current property's reviews

    setRating(5);
    setComment("");
  };

  useEffect(() => {
    if (message || isError) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, isError, dispatch]);

  if (!token || !loggedIn) {
    return <div className="alert alert-warning">You must be logged in to write a review.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {message && (
        <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}
     
      <div className="mb-3">
        <label htmlFor="rating">Rating:</label>
        <StarInput rating={rating} setRating={setRating} />
      </div>

      <div className="mb-3">
        <label htmlFor="comment">Comment:</label>
        <textarea
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Posting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
