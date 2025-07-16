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
import styles from "../stylesModule/propertyView.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import LeafletMap from "../Map/MapComponent";



const PropertyView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showCheckConflict, setShowCheckConflict] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);



  const { isLoading, singlePost, isError, message } = useSelector((state) => state.post);
  const { token, user, loggedIn } = useSelector((state) => state.auth);


  const currentUserId = user?._id;
  const { reviewPosts, isLoading: reviewLoading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getSinglePosts(id));
    dispatch(getAllReviewPosts(id));
    return () => dispatch(resetSinglePost());
  }, [dispatch, id]);

  useEffect(() => {
    const location = singlePost?.location;
    if (!location) return;

    const fetchCoordinates = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/geocode?q=${encodeURIComponent(location)}`);
        if (!res.ok) throw new Error("Failed to fetch coordinates");
        const data = await res.json();


        if (data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        }

      } catch (err) {
        console.error("Geocoding failed", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchCoordinates();
  }, [singlePost]);

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
    <div className={`container ${styles.container}`}>
      <h2 className={styles.heading}>{singlePost.title}</h2>
      <img
        src={singlePost.image.url}
        alt={singlePost.title}
        className={styles.image}
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
            <div className="mt-4">
              <button onClick={handleEdit} className={`btn btn-warning me-2 ${styles.button}`}>
                <FaEdit className="me-2" /> Edit
              </button>
              <button onClick={softhandleDelete} className={`btn btn-danger ${styles.button}`}>
                <FaTrashAlt className="me-2" /> Delete
              </button>
            </div>

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

      {
        user?.role === "guest" && (
          <div className="mt-4">
            <button onClick={handeleBooking} className="btn btn-success me-2">Booking</button>
          </div>

        )
      }


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
      <hr />
      <div className="mt-4">
        <h4>Where you'll be</h4>
        <div className="map-container">
          {loadingMap ? (
            <p>Loading map...</p>
          ) : coordinates ? (
            <LeafletMap lat={coordinates.lat} lng={coordinates.lng} title={singlePost.city} />
          ) : (
            <p>Map not available</p>
          )}
        </div>
      </div>


    </div>
  );
};

export default PropertyView;
