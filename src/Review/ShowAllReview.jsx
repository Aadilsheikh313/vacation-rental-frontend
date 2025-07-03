import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsForProperty } from "../config/redux/action/reviewAction";

const ShowAllReview = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const { reviewPosts, isLoading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviewsForProperty(propertyId));
  }, [dispatch, propertyId]);

  return (
    <div className="container mt-4">
      <h3>All Reviews</h3>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        reviewPosts.length > 0 ? (
          reviewPosts.map((review) => (
            <div key={review._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">⭐ {review.rating}</h5>
                <p className="card-text">{review.comment}</p>
                <p className="card-text">
                  <small className="text-muted">Posted by {review.user?.name || "Anonymous"}</small>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )
      )}
    </div>
  );
};

export default ShowAllReview;
