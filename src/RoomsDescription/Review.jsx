import React, { useEffect } from "react";
import ReviewList from "../Review/ReviewList";
import StarRating from "../Review/StarRating";
import CategoryStarRating from "../Review/CategoryStarRating";
import CircularRating from "../Review/CircularRating";
import {
  getAllReviewPosts,
  getReviewAnalytics,
} from "../config/redux/action/reviewAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "../stylesModule/Review/review.module.css";

const Review = ({ user, token, id }) => {
  const dispatch = useDispatch();
  const { reviewPosts, analytics, isLoading } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (id) {
      dispatch(getAllReviewPosts(id));
      dispatch(getReviewAnalytics({ propertyId: id, token }));
    }
  }, [dispatch, id, token]);

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewRow}>

        {/* LEFT SUMMARY */}
        <div className={styles.leftCol}>
          <div className={styles.summaryCard}>

            {/* 🔵 Circular Meter */}
            <CircularRating value={analytics?.avgRating || 0} />

            <StarRating rating={analytics?.avgRating || 0} />

            <p className={styles.reviewCount}>
              Based on {analytics?.totalReviews || 0} reviews
            </p>

            {/* ⭐ Category Breakdown */}
            <div className={styles.breakdownWrapper}>
              {[
                { label: "Cleanliness", value: analytics?.cleanlinessAvg },
                { label: "Comfort", value: analytics?.comfortAvg },
                { label: "Service", value: analytics?.serviceAvg },
                { label: "Location", value: analytics?.locationAvg },
              ].map(({ label, value }) => (
                <div key={label} className={styles.breakdownItem}>
                  <span className={styles.breakdownLabel}>{label}</span>

                  <CategoryStarRating value={value ?? 0} />

                  <span className={styles.breakdownValue}>
                    {value ?? 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT REVIEWS */}
        <div className={styles.rightCol}>
          <div className={styles.reviewCard}>
            <h4 className={styles.reviewTitle}>Guest Reviews</h4>

            <ReviewList
              reviews={reviewPosts || []}
              isLoading={isLoading}
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
