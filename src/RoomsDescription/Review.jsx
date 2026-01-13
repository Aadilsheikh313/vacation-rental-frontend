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

  const hostAnalytics = analytics?.host;

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
            <CircularRating value={hostAnalytics?.avgRating || 0} />

            <StarRating rating={hostAnalytics?.avgRating || 0} className={styles.starRating}   />

            <p className={styles.reviewCount}>
              Based on {hostAnalytics?.totalReviews || 0} reviews
            </p>

            {/* ⭐ Category Breakdown */}
            <div className={styles.breakdownWrapper}>
              {[
                { label: "Cleanliness", value: hostAnalytics?.cleanlinessAvg },
                { label: "Comfort", value: hostAnalytics?.comfortAvg },
                { label: "Service", value: hostAnalytics?.serviceAvg },
                { label: "Location", value: hostAnalytics?.locationAvg },
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
