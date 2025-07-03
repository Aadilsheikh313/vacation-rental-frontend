import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePosts, softdeletePropertyPosts } from "../config/redux/action/propertyAction";
import { getAllReviewPosts } from "../config/redux/action/reviewAction";
import { resetSinglePost } from "../config/redux/reducer/propertyReducer";
import { confirmDelete } from "../utils/confirmDelete";
import ReviewForm from "../Review/ReviewForm";
import ReviewList from "../Review/ReviewList";
import { Spinner } from "react-bootstrap";
import { showError } from "../utils/toastUtils";
import CheckBookingConflict from "../Booking/CheckBookingConflict";

const PropertyView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showCheckConflict, setShowCheckConflict] = useState(false);


  const { isLoading, singlePost, isError, message } = useSelector((state) => state.post);
  const { token, user, loggedIn } = useSelector((state) => state.auth);


  const currentUserId = user?._id;
  const { reviewPosts, isLoading: reviewLoading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getSinglePosts(id));
    dispatch(getAllReviewPosts(id));
    return () => dispatch(resetSinglePost());
  }, [dispatch, id]);

  const handleEdit = () => navigate(`/edit/${id}`);

  const softhandleDelete = () => {
    if (!singlePost) return;
    confirmDelete({
      id: singlePost._id,
      token,

      dispatch,
      deleteAction: softdeletePropertyPosts,
      navigate,
      successRedirectTo: "/",
    });
  };

  const handeleBooking = () => {
    if (!loggedIn) {
      showError("You are not logged in. Please login or register.")

      const goToLogin = window.confirm("You are not logged in. Do you want to login or register?");
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    // Show conflict modal by rendering <CheckBookingConflict />
    setShowCheckConflict(true);
   
  }

  if (isLoading) {
    if (isLoading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

  };
  if (isError) return <p>{message}</p>;
  if (!singlePost) return <p>No Property Found</p>;

  return (
    <div className="container mt-4">
      <h2>{singlePost.title}</h2>
      <img
        src={singlePost.image.url}
        alt={singlePost.title}
        className="img-fluid mb-3"
        style={{ maxHeight: "350px", objectFit: "cover" }}
      />
      <p><strong>Description:</strong> {singlePost.description}</p>
      <p><strong>Price:</strong> ₹{singlePost.price}/night</p>
      <p><strong>Category:</strong> {singlePost.category}</p>
      <p><strong>Country:</strong> {singlePost.country}</p>
      <p><strong>City:</strong> {singlePost.city}</p>
      <p><strong>Address:</strong> {singlePost.location}</p>
      <p><strong>Posted on:</strong> {new Date(singlePost.propertyPostedOn).toLocaleDateString()}</p>
      <p><strong>Hosted by:</strong> {singlePost.userId?.name}</p>
      <p><strong>Contact:</strong> {singlePost.userId?.phone} / {singlePost.userId?.email}</p>

      {
        user?.role !== "guest" && singlePost.userId?._id === user?._id && (
          <div className="mt-4">
            <button onClick={handleEdit} className="btn btn-warning me-2">✏️ Edit</button>
            <button onClick={softhandleDelete} className="btn btn-danger">🗑️ Delete</button>
          </div>
        )
      }
      {showCheckConflict && (
        <CheckBookingConflict
          propertyId={id}
          token={token}
          userId={user?._id}
          onConflictCheck={() => navigate(`/bookingFrom/${id}`)}
        />
      )}


      <div className="mt-4">
        <button onClick={handeleBooking} className="btn btn-success me-2">Booking</button>
      </div>


      <div className="mt-5">
        <h4>Write a Review</h4>
        <ReviewForm propertyId={singlePost._id} />
      </div>

      <div className="mt-4">
        <p><strong>Rating:</strong> ⭐ {singlePost.avgRating || 0} / 5</p>
        <h4>All Reviews</h4>
        <ReviewList
          reviews={reviewPosts}
          isLoading={reviewLoading}
          showAll={showAllReviews}
          toggleShowAll={() => setShowAllReviews(!showAllReviews)}
          currentUserId={currentUserId}
          token={token}
          loggedIn={loggedIn}
          propertyId={singlePost._id}

        />
      </div>
    </div>
  );
};

export default PropertyView;
