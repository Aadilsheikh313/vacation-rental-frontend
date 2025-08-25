import React from "react";
import styles from "../stylesModule/propertyView.module.css";

const Policies = () => {
    return (
        <div className={styles.PoliciesConatiner}>
            <div className={styles.CheckinAndCheckout}>
                <h3>Check-in & Check-out</h3>
            </div>
            <div className={styles.CancellationPolicy}>
                <h3>Cancellation Policy</h3>
            </div>
            <div className={styles.HouseRules}>
                <h3>House Rules</h3>
            </div>
            <div className={styles.PaymentAndFees}>
                 <h3>Payment & Fees</h3>
            </div>
        </div>
    )
}
export default Policies;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getSinglePosts,
//   softdeletePropertyPosts,
// } from "../config/redux/action/propertyAction";
// import { confirmDelete } from "../utils/confirmDelete";
// import ReviewForm from "../Review/ReviewForm";
// import ReviewList from "../Review/ReviewList";
// import { Card, Spinner } from "react-bootstrap";
// import { showError } from "../utils/toastUtils";
// import CheckBookingConflict from "../Booking/CheckBookingConflict";
// import styles from "../stylesModule/propertyView.module.css";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import LeafletMap from "../Map/MapComponent";
// import RoomsDetails from "../assets/RoomsDetails.jpg";
// import Overview from "../RoomsDescription/Overview";
// import Amenities from "../RoomsDescription/Amenities";
// import Policies from "../RoomsDescription/Policies";
// import { resetSinglePost } from "../config/redux/reducer/propertyReducer";


// const PropertyView = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [showCheckConflict, setShowCheckConflict] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   const { isLoading, singlePost, isError, message } = useSelector(
//     (state) => state.post
//   );
//   const { token, user, loggedIn } = useSelector((state) => state.auth);
//   const { reviewPosts, isLoading: reviewLoading } = useSelector(
//     (state) => state.review
//   );

//   const currentUserId = user?._id;

// useEffect(() => {
//   dispatch(getSinglePosts(id));

//   return () => {
//     dispatch(resetSinglePost()); // jab component unmount hoga tab reset hoga
//   };
// }, [dispatch, id]);

//   const handleEdit = () => navigate(`/edit/${id}`);

//   const softhandleDelete = () => {
//     if (!singlePost) return;
//     confirmDelete({
//       id: singlePost._id,
//       token,
//       dispatch,
//       deleteAction: softdeletePropertyPosts,
//       navigate,
//       successRedirectTo: "/",
//     });
//   };

//   const handeleBooking = () => {
//     if (!loggedIn) {
//       showError("You are not logged in. Please login or register.");
//       const goToLogin = window.confirm(
//         "You are not logged in. Do you want to login or register?"
//       );
//       if (goToLogin) navigate("/login");
//       return;
//     }
//     setShowCheckConflict(true);
//   };

//   const handleclickHome = () => navigate("/");

//   if (isLoading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   if (isError) return <p>{message}</p>;
//   if (!singlePost) return <p>No Property Found</p>;

//   return (
//     <div className={styles.container}>
//       {/* Header Banner */}
//       <div className={styles.RoomsDetails}>
//         <div className={styles.Roomsdetilsesimage}>
//           <img src={RoomsDetails} alt="Rooms details" />
//         </div>
//         <div className={styles.overlay}>
//           <h3>Room Details</h3>
//           <p>
//             Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat
//             quibusdam quia assumenda numquam molestias.
//           </p>
//           <div className={styles.breadcrumb}>
//             <input type="button" value="Home" onClick={handleclickHome} /> / Room
//             Details
//           </div>
//         </div>
//       </div>

//       {/* Left Side Image */}
//       <div className={styles.leftImageConatiner}>
//         <img
//           src={singlePost.image?.url}
//           alt={singlePost.title}
//           className={styles.image}
//         />
//       </div>

//       {/* Right Side Details */}
//       <div className={styles.rightConatinerdetails}>
//         <h2 className={styles.heading}>{singlePost.title}</h2>

//         {singlePost.totalReviews > 0 ? (
//           <p className="text-warning">
//             <b>Rating</b> ⭐ {singlePost.avgRating} (
//             {singlePost.totalReviews} reviews)
//           </p>
//         ) : (
//           <p className="text-white-muted">No rating and reviews yet.</p>
//         )}

//         <Card className={styles.priceCard}>
//           <p>
//             <strong>Price:</strong> ₹{singlePost.price}/night <br />
//             *Taxes and fees not included
//           </p>
//         </Card>

//         <Card className={styles.addresDetails}>
//           <p>
//             <strong>Category:</strong> {singlePost.category}
//           </p>
//           <p>
//             <strong>Country:</strong> {singlePost.country}
//           </p>
//           <p>
//             <strong>City:</strong> {singlePost.city}
//           </p>
//           <p>
//             <strong>Address:</strong> {singlePost.location}
//           </p>
//         </Card>

//         <Card className={styles.hostDetails}>
//           <p>
//             <strong>Posted on:</strong>{" "}
//             {new Date(singlePost.propertyPostedOn).toLocaleDateString()}
//           </p>
//           <p>
//             <strong>Hosted by:</strong> {singlePost.userId?.name}
//           </p>
//           <p>
//             <strong>Contact:</strong> {singlePost.userId?.phone} /{" "}
//             {singlePost.userId?.email}
//           </p>
//         </Card>

//         {/* Booking Conflict Check */}
//         {showCheckConflict && (
//           <CheckBookingConflict
//             propertyId={id}
//             token={token}
//             userId={user?._id}
//             onConflictCheck={() => navigate(`/bookingFrom/${id}`)}
//           />
//         )}

//         {/* Guest Booking Button */}
//         {user?.role === "guest" && (
//           <div className="mt-4">
//             <button
//               onClick={handeleBooking}
//               className="btn btn-success me-2"
//             >
//               Booking
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Owner Controls */}
//       {user?.role !== "guest" && singlePost.userId?._id === user?._id && (
//         <div className="mt-4">
//           <button
//             onClick={handleEdit}
//             className={`btn btn-warning me-2 ${styles.button}`}
//           >
//             <FaEdit className="me-2" /> Edit
//           </button>
//           <button
//             onClick={softhandleDelete}
//             className={`btn btn-danger ${styles.button}`}
//           >
//             <FaTrashAlt className="me-2" /> Delete
//           </button>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className={styles.RoomsDescription}>
//         <button
//           className={activeTab === "overview" ? styles.activeTab : ""}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </button>
//         <button
//           className={activeTab === "amenities" ? styles.activeTab : ""}
//           onClick={() => setActiveTab("amenities")}
//         >
//           Amenities
//         </button>
//         <button
//           className={activeTab === "policies" ? styles.activeTab : ""}
//           onClick={() => setActiveTab("policies")}
//         >
//           Policies
//         </button>
//         <button
//           className={activeTab === "reviews" ? styles.activeTab : ""}
//           onClick={() => setActiveTab("reviews")}
//         >
//           Reviews
//         </button>
//       </div>

//       <hr />

//       {/* Tab Content */}
//       <div className={styles.tabContent}>
//         {activeTab === "overview" && <Overview />}
//         {activeTab === "amenities" && <Amenities />}
//         {activeTab === "policies" && <Policies />}
//         {activeTab === "reviews" && (
//           <ReviewList
//             reviews={reviewPosts}
//             isLoading={reviewLoading}
//             showAll={showAllReviews}
//             toggleShowAll={() => setShowAllReviews(!showAllReviews)}
//             currentUserId={currentUserId}
//             token={token}
//             loggedIn={loggedIn}
//             propertyId={singlePost._id}
//           />
//         )}
//       </div>

//       {/* Write Review */}
//       <div className="mt-5">
//         <h4>Write a Review</h4>
//         <ReviewForm propertyId={singlePost._id} />
//       </div>
//     </div>
//   );
// };

// export default PropertyView;
