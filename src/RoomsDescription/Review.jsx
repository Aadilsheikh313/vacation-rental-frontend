import React, { useEffect } from "react";
import ReviewForm from "../Review/ReviewForm";
import ReviewList from "../Review/ReviewList";
import StarRating from "../Review/StarRating";
import { getAllReviewPosts } from "../config/redux/action/reviewAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "../stylesModule/Review/review.module.css";

const Review = ({ singlePost, user, token, id }) => {
  const dispatch = useDispatch();

  const { reviewPosts, isLoading: reviewLoading } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (id) {
      dispatch(getAllReviewPosts(id));
    }
  }, [dispatch, id]);

  const hasUserReviewed = reviewPosts?.some(
    (r) => r?.user?._id === user?._id
  );

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewRow}>
        {/* ✅ Left summary card */}
        <div className={styles.leftCol}>
          <div className={styles.summaryCard}>
            <h1 className={styles.avgRating}>
              {singlePost?.avgRating?.toFixed(1) || 0}
            </h1>
            <div className={styles.starWrapper}>
              <StarRating rating={singlePost?.avgRating || 0} />
            </div>
            <p className={styles.reviewCount}>
              Based on {singlePost?.totalReviews || 0} reviews
            </p>

            <div className={styles.breakdownWrapper}>
              {["cleanliness", "comfort", "service", "location"].map(
                (category) => (
                  <div key={category} className={styles.breakdownItem}>
                    <p className={styles.breakdownLabel}>
                      {category}
                      <span className={styles.breakdownValue}>
                        {singlePost?.ratings?.[category] || "-"}
                      </span>
                    </p>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${(singlePost?.ratings?.[category] || 0) * 20}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ✅ Right reviews section */}
        <div className={styles.rightCol}>
          <div className={styles.reviewCard}>
            <h4 className={styles.reviewTitle}>Guest Reviews</h4>

            {/* Review Form at Top */}
            {user?.role === "guest" && !hasUserReviewed && (
              <div className={styles.reviewFormWrapper}>
                <h5 className={styles.formTitle}>Write a Review</h5>
                <ReviewForm propertyId={id} />
              </div>
            )}

            {/* Review List */}
            <ReviewList
              reviews={reviewPosts || []}
              isLoading={reviewLoading}
              currentUserId={user?._id}
              token={token}
              propertyId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
