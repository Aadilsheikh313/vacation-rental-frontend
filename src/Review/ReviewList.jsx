import React, { useState } from "react";
import StarRating from "./StarRating";
import RatingRow from "./RatingRow";
import { CiEdit } from "react-icons/ci";
import styles from "../stylesModule/Review/reviewList.module.css";
import EditReviewModel from "./EditReview";
import { useDispatch, useSelector } from "react-redux";
import { hostReplyToReview } from "../config/redux/action/reviewAction";

/* ⏱️ 48 hour edit check */
const canEditReview = (createdAt) => {
  const hoursPassed =
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  return hoursPassed <= 48;
};

const ReviewList = ({ reviews, isLoading, currentUserId }) => {
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const { singlePost } = useSelector((state) => state.post);
  const { token, user, loggedIn } = useSelector((state) => state.auth);

  const isListingOwnerHost =
    loggedIn &&
    user?.role === "host" &&
    singlePost?.userId?._id === user?._id;

  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className={styles.ReviewListConatiner}>
      <ul className={styles.reviewList}>
        {reviews.map((review) => {
          const reviewer = review.user || {};
          const userName = reviewer.name || "Anonymous";
          const initial = userName.charAt(0).toUpperCase();
          const avatarUrl = reviewer.avatar?.url;
          const isOwnReview = reviewer._id === currentUserId;
          const hasHostReply = Boolean(review.hostReply);
          const host = review.hostReply?.host;
          const hostName = host?.name || "Host";
          const hostInitial = hostName.charAt(0).toUpperCase();
          const hostAvatar = host?.avatar?.url;

          return (
            <li key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                {/* Avatar */}
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className={styles.avatar} />
                ) : (
                  <div className={styles.avatarPlaceholder}>{initial}</div>
                )}

                <div className={styles.reviewContent}>
                  {/* Top */}
                  <div className={styles.reviewTop}>
                    <div className={styles.leftTop}>
                      <h6 className={styles.userName}>{userName}</h6>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className={styles.reviewDate}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Ratings */}
                  <div className={styles.RatingFrom}>
                    <RatingRow label="Cleanliness" value={review.cleanliness} />
                    <RatingRow label="Comfort" value={review.comfort} />
                  </div>
                  <div className={styles.RatingFrom}>
                    <RatingRow label="Service" value={review.service} />
                    <RatingRow label="Location" value={review.location} />
                  </div>

                  {/* Comment */}
                  <p className={styles.comment}>“{review.comment}”</p>

                  {/* Host Reply */}
                  {hasHostReply && (
                    <div className={styles.hostReplyWrapper}>
                      {hostAvatar ? (
                        <img
                          src={hostAvatar}
                          alt={hostName}
                          className={styles.avatar}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {hostInitial}
                        </div>
                      )}

                      <div className={styles.hostReplyBox}>
                        <strong>{hostName}</strong>
                        <p>{review.hostReply.message}</p>
                        <small>
                          {new Date(review.hostReply.repliedAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className={styles.actionButtons}>
                    {isOwnReview && canEditReview(review.createdAt) && (
                      <button
                        className={styles.editBtn}
                        onClick={() => {
                          setSelectedReview(review);
                          setShowEditModal(true);
                        }}
                      >
                        <CiEdit /> Edit
                      </button>
                    )}

                    {/* Host buttons */}
                    {isListingOwnerHost && !hasHostReply && (
                      <button
                        className={styles.replyBtn}
                        onClick={() => {
                          setOpenReplyId(review._id);
                          setReplyText("");
                        }}
                      >
                        Reply
                      </button>
                    )}

                    {isListingOwnerHost && hasHostReply && (
                      <button
                        className={styles.editBtn}
                        onClick={() => {
                          setOpenReplyId(review._id);
                          setReplyText(review.hostReply.message);
                        }}
                      >
                        Edit Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Reply Box */}
              {openReplyId === review._id && (
                <div className={styles.replyBox}>
                  <textarea
                    rows="3"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write reply to guest..."
                  />

                  <div className={styles.replyActions}>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setOpenReplyId(null)}
                    >
                      Cancel
                    </button>

                    <button
                      className={styles.postBtn}
                      onClick={() => {
                        if (!replyText.trim()) return;

                        dispatch(
                          hostReplyToReview({
                            reviewId: review._id,
                            token,
                            message: replyText,
                          })
                        );

                        setOpenReplyId(null);
                      }}
                    >
                      {hasHostReply ? "Update Reply" : "Post Reply"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {showEditModal && (
        <EditReviewModel
          review={selectedReview}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ReviewList;
