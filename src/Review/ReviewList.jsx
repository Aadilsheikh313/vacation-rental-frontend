import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewPosts, editReviewPosts } from "../config/redux/action/reviewAction";
import StarRating from "./StarRating";

const ReviewList = ({ reviews, isLoading, showAll, toggleShowAll, currentUserId, token, propertyId }) => {
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  const reviewsToShow = showAll ? reviews : reviews.slice(0, 5);

  const handleEdit = (review) => {
    const newComment = prompt("Edit your comment:", review.comment);
    const newRating = prompt("Edit your rating (1-5):", review.rating);

    if (newComment && newRating) {
      dispatch(
        editReviewPosts({
          reviewId: review._id,
          propertyId,
          comment: newComment,
          rating: newRating,
          token,

        })
      );
    }
  };

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviewPosts({ reviewId, token, propertyId, }));
    }
  };

  return (
    <>
      <ul className="list-group">
        {reviewsToShow.map((review) => {
          const user = review.user || {};
          const userName = user.name || "Anonymous";
          const initial = userName.charAt(0).toUpperCase();
          const avatarUrl = user.avatar?.url;
          const isOwnReview = user._id === currentUserId;

          return (
            <li key={review._id} className="list-group-item d-flex gap-3 align-items-start">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="rounded-circle"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}
                >
                  {initial}
                </div>
              )}

              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <strong>{userName}</strong>
                  <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                </div>
               
                <span className="text-warning">
                  <StarRating rating={review.rating} />
                </span> — {review.comment}

                {isOwnReview && (
                  <div className="mt-2 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleEdit(review)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(review._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {reviews.length > 5 && (
        <button className="btn btn-outline-primary mt-3" onClick={toggleShowAll}>
          {showAll ? "Show Less Reviews" : "Show All Reviews"}
        </button>
      )}
    </>
  );
};

export default ReviewList;