import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePosts, softdeletePropertyPosts } from "../config/redux/action/propertyAction";
import { resetSinglePost } from "../config/redux/reducer/propertyReducer";
import styles from "../stylesModule/propertyView.module.css";
import { Card, Spinner } from "react-bootstrap";
import RoomsDetails from "../assets/RoomsDetails.jpg";
import CheckBookingConflict from "../Booking/CheckBookingConflict";
import { showError } from "../utils/toastUtils";
import { FaEdit, FaLocationArrow, FaTrashAlt } from "react-icons/fa";
import RoomsDescriptionBth from "../RoomsDescription/RoomsDetailsBtn";
import Overview from "../RoomsDescription/Overview";
import ReviewList from "../Review/ReviewList";
import Amenities from "../RoomsDescription/Amenities";
import Policies from "../RoomsDescription/Policies";
import LeafletMap from "../Map/MapComponent";
import ReviewForm from "../Review/ReviewForm";


const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCheckConflict, setShowCheckConflict] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAll, setShowAll] = useState(false);


  const { singlePost, isLoading, isError, message } = useSelector(
    (state) => state.post
  );
  const { token, user, loggedIn } = useSelector((state) => state.auth);


  // Check if current user already posted a review
  const hasUserReviewed = singlePost?.reviews?.some(
    (review) => review.userId?._id === user?._id
  ) || false;


  useEffect(() => {
    if (id) {
      dispatch(getSinglePosts(id));
    }
    return () => {
      dispatch(resetSinglePost());
    };
  }, [dispatch, id]);

  const handeleBooking = () => {
    if (!loggedIn) {
      showError("You are not logged in. Please login or register.");
      const goToLogin = window.confirm(
        "You are not logged in. Do you want to login or register?"
      );
      if (goToLogin) navigate("/login");
      return;
    }
    setShowCheckConflict(true);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  const handleclickHome = () => navigate("/");
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

  if (isError) {
    return <p className="text-red-500">Error: {message}</p>;
  }

  if (!singlePost) {
    return <p>No property details found.</p>;
  }
  //✅ Latitude & Longitude extract
  const lat = singlePost.coordinates?.coordinates?.[1];
  const lng = singlePost.coordinates?.coordinates?.[0];

  return (
    <div className={styles.container}>
      <div className={styles.RoomsDetails}>
        <div className={styles.Roomsdetilsesimage}>
          {/* <img src={RoomsDetails} alt="Rooms details" /> */}
        </div>
        <div className={styles.overlay}>
          <h3>Room Details</h3>
          <p>
            Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat
            quibusdam quia assumenda numquam molestias.
          </p>
          <div className={styles.breadcrumb}>
            <input type="button" value="Home" onClick={handleclickHome} /> / Room
            Details
          </div>
        </div>
      </div>
      <div className={styles.propertyWrapper}>
        {/* Left Side Image */}
        <div className={styles.leftImageConatiner}>
          <img
            src={singlePost.image?.url}
            alt={singlePost.title}
            className={styles.image}
          />
        </div>
        {/* Right Side Details */}
        <div className={styles.rightConatinerdetails}>
          <h2 className={styles.heading}>{singlePost.title}</h2>

          {singlePost.totalReviews > 0 ? (
            <p className={styles.totalReview}>
              <b>Rating</b> ⭐ {singlePost.avgRating} (
              {singlePost.totalReviews} reviews)
            </p>
          ) : (
            <p className={styles.Norivew}>No rating and reviews yet.</p>
          )}

          <Card className={styles.priceCard}>
            <p>
              <strong>Price:</strong> ₹{singlePost.price}/night <br />
              *Taxes and fees not included
            </p>
          </Card>

          <Card className={styles.addresDetails}>
            <p>
              <strong>Category:</strong> {singlePost.category}
            </p>
            <p>
              <strong>Country:</strong> {singlePost.country}
            </p>
            <p>
              <strong>City:</strong> {singlePost.city}
            </p>
            <p>
              <strong>Address:</strong> {singlePost.location}
            </p>
          </Card>

          <Card className={styles.hostDetails}>
            <p>
              <strong>Posted on:</strong>{" "}
              {new Date(singlePost.propertyPostedOn).toLocaleDateString()}
            </p>
            <p>
              <strong>Hosted by:</strong> {singlePost.userId?.name}
            </p>
            <p>
              <strong>Contact:</strong> {singlePost.userId?.phone} /{" "}
              {singlePost.userId?.email}
            </p>
          </Card>

          {/* Booking Conflict Check */}
          {showCheckConflict && (
            <CheckBookingConflict
              propertyId={id}
              token={token}
              userId={user?._id}
              onConflictCheck={() => navigate(`/bookingFrom/${id}`)}
            />
          )}

          {/* Guest Booking Button */}
          {user?.role === "guest" && (
            <div className="mt-4">
              <button
                onClick={handeleBooking}
                className={styles.bookingBtn}
              >
                Booking
              </button>
            </div>
          )}
          {/* Owner Controls */}
          {user?.role !== "guest" && singlePost.userId?._id === user?._id && (
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className={`btn btn-warning me-2 ${styles.button}`}
              >
                <FaEdit className="me-2" /> Edit
              </button>
              <button
                onClick={softhandleDelete}
                className={`btn btn-danger ${styles.button}`}
              >
                <FaTrashAlt className="me-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <RoomsDescriptionBth activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && <Overview />}
      {activeTab === "amenities" && <Amenities />}
      {activeTab === "policies" && <Policies />}
      {/* Show Reviews Section */}
      {activeTab === "reviews" && (
        <>
          <ReviewList
            reviews={singlePost.reviews || []}
            isLoading={isLoading}
            showAll={showAll}
            toggleShowAll={() => setShowAll(!showAll)}
            currentUserId={user?._id}
            token={token}
            propertyId={id}
          />

          {/* Review Form – Only show if user is guest and has NOT reviewed */}
          {user?.role === "guest" && !hasUserReviewed && (
            <div className="mt-5">
              {!showReviewForm ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write a Review
                </button>
              ) : (
                <>
                  <h4>Write a Review</h4>
                  <ReviewForm propertyId={singlePost._id} />
                </>
              )}
            </div>
          )}
        </>
      )}
      <hr />
      {lat && lng && (
        <div className="mt-4">
          <h3><FaLocationArrow /> Location on Map</h3>
          <LeafletMap lat={lat} lng={lng} title={singlePost.title} />
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
