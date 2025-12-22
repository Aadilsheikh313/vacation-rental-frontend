import React from "react";
import { useDispatch } from "react-redux";
import {  editReviewPosts } from "../config/redux/action/reviewAction";
import StarRating from "./StarRating";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import styles from "../stylesModule/Review/reviewList.module.css";

const ReviewList = ({ reviews, isLoading, currentUserId, token, propertyId }) => {
  const dispatch = useDispatch();

  if (isLoading) return <p className={styles.loading}>Loading reviews...</p>;
  if (!reviews || reviews.length === 0) return <p className={styles.noReviews}>No reviews yet.</p>;

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


  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => {
        const user = review.user || {};
        const userName = user.name || "Anonymous";
        const initial = userName.charAt(0).toUpperCase();
        const avatarUrl = user.avatar?.url;
        const isOwnReview = user._id === currentUserId;

        return (
          <li key={review._id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              {/* Avatar */}
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>{initial}</div>
              )}

              {/* Review Content */}
              <div className={styles.reviewContent}>
                <div className={styles.reviewTop}>
                  <h6 className={styles.userName}>{userName}</h6>

                </div>
                <div className={styles.rating}>
                  <StarRating rating={review.rating} />
                </div>
                <small className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>

                <p className={styles.comment}>"{review.comment}"</p>

                {/* Edit/Delete buttons */}
                {isOwnReview && (
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(review)}
                    >
                      <CiEdit /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
