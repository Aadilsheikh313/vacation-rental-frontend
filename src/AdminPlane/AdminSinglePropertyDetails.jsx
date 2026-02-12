import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Alert, Card, Badge } from "react-bootstrap";
import { getSinglePropertyAdminPosts } from "../config/redux/action/adminHomeDashAction";
import { useState } from "react";
import LeafletMap from "../Map/MapComponent";
import Avatar from "../comman/Avatar";
import { HiArrowLeft } from 'react-icons/hi';
import { getAdminReviewAnalytics, toggleReviewVisibility } from "../config/redux/action/reviewAction";
import CircularRating from "../Review/CircularRating";
import StarRating from "../Review/StarRating";
import {
  FaStar,
  FaRegStar,
  FaCalendarAlt,
  FaHome,
  FaReply,
  FaUserCircle,
  FaStarHalfAlt,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import styles from "../stylesModule/Admin/AdminHome/Home.module.css"


const AdminSinglePropertyDetails = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const nvigate = useNavigate();

  const { token } = useSelector((state) => state.adminAuth);
  const {
    adminSingleProperty,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.adminHomeDash);
  const { analytics } = useSelector((state) => state.review);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePropertyAdminPosts(id));
      dispatch(getAdminReviewAnalytics({ propertyId: id, token }));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    const coords = adminSingleProperty?.property?.coordinates?.coordinates;

    if (!coords || coords.length !== 2) {
      setLoadingMap(false);
      return;
    }

    // MongoDB GeoJSON → Leaflet
    setCoordinates({
      lat: coords[1], // latitude
      lng: coords[0], // longitude 
    });

    setLoadingMap(false);
  }, [adminSingleProperty]);


  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {message || "Something went wrong!"}
        </Alert>
      </Container>
    );
  }

  if (!adminSingleProperty) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          No Property Found.
        </Alert>
      </Container>
    );
  }

  // STEP 1: analytics + lists
  const {
    property,
    reviews,
    bookings,
    payments,

    totalBookings,
    completedBookings,
    cancelledBookings,

    totalRevenue,
    onlineRevenue,
    cashRevenue,
    totalTax,
    serviceCharge,
  } = adminSingleProperty;

  // STEP 2: property details
  const {
    title,
    city,
    state,
    price,
    description,
    image,
    userId,
    propertyPostedOn,
  } = property || {};




  return (
    <div className={styles.pageWrapper}>
    <Container fluid className={styles.page}>
      <h2 className={styles.pageTitle}>🏡 Property Details</h2>

      <Card className={styles.propertyCard}>
        {image?.url && <img src={image.url} className={styles.propertyImage} />}
        <div className={styles.propertyInfo}>
          <h3>{title}</h3>
          <p><b>Location:</b> {city}, {state}</p>
          <p><b>Price:</b> ₹{price} / night</p>
          <p><b>Description:</b> {description}</p>
          <p><b>Host:</b> {userId?.name} ({userId?.email})</p>
          <p><b>Phone:</b> {userId?.phone}</p>
          <p><b>Posted:</b> {new Date(propertyPostedOn).toLocaleDateString()}</p>
        </div>
      </Card>

      <Row className={styles.statsRow}>
        <Col md={6}>
          <Card className={styles.statCard}>
            <h5><MdOutlineDashboard /> Booking & Revenue</h5>
            <p>Total Bookings: {totalBookings}</p>
            <p>Completed: {completedBookings}</p>
            <p>Cancelled: {cancelledBookings}</p>
            <hr />
            <p>Total Revenue: ₹{totalRevenue}</p>
            <p>Online: ₹{onlineRevenue}</p>
            <p>Cash: ₹{cashRevenue}</p>
            <hr />
            <p>Tax: ₹{totalTax}</p>
            <p>Admin Fee: ₹{serviceCharge}</p>

          </Card>

        </Col>
        <Col md={6}>
          {/* Review analiyse getAdminReviewAnalytics */}
          <div className="darkMode">
            <Card className={styles.ReviewAnalytics} >
              <h5 className={styles.heading}><FaRegStar /> What Guests Loved</h5>
              {/* 🔵 Circular Meter */}
              <CircularRating value={analytics?.admin?.avgRating || 0} />
              <div
                className={styles.starrating}
                title={`Average Rating: ${analytics?.admin?.avgRating || 0}`}
              >
                <StarRating rating={analytics?.admin?.avgRating || 0} />
                <p className={styles.reviewCount}>
                  Based on {analytics?.admin?.totalReviews || 0} reviews
                </p>
              </div>

              <div className={styles.breakdownWrapper}>
                {[
                  { label: "Cleanliness :-", value: analytics?.admin?.cleanlinessAvg },
                  { label: "Comfort :-", value: analytics?.admin?.comfortAvg },
                  { label: "Service :- ", value: analytics?.admin?.serviceAvg },
                  { label: "Location :- ", value: analytics?.admin?.locationAvg },
                ].map(({ label, value }) => (
                  <div key={label} className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>{label}</span>

                    {/* Progress bar */}
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${(value ?? 0) * 20}%` }}
                      />
                    </div>

                    <span className={styles.breakdownValue}>
                      {value ?? 0}
                    </span>
                  </div>

                ))}
              </div>

            </Card>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4 className={styles.bookingheading}>🧾 Bookings</h4>
          {bookings?.length > 0 ? (
            bookings.map((booking, idx) => {
              const userReview = reviews?.find(
                (rev) => rev.user?._id === booking.user?._id
              );
              const bookingPayment = payments?.find(
                (pay) => pay.bookingId === booking._id
              );

              return (
                <Card key={idx} className={styles.bookingdetailscard
                }>
                  <div className={styles.bookingusername}>
                    <Avatar user={bookings.user?.name} />
                    <strong>{booking.user?.name}</strong>
                  </div>
                  <p><strong>Booking ID:</strong> {booking.bookingCode || booking._id}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><strong>Phone:</strong> <a href={`tel:${booking.user?.phone}`}>{booking.user?.phone} </a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${booking.user?.email}`}> {booking.user?.email}</a></p>
                  <hr />

                  <h6 className={styles.paymentdetails}>
                    💸 Payment Details
                    
                    {bookingPayment?.paymentMethod === "razorpay" && (
                      <Badge bg="success">Online Paid</Badge>
                    )}

                    {bookingPayment?.paymentMethod === "cash" && (
                      <Badge bg="warning" text="dark">Cash</Badge>
                    )}

                    {bookingPayment?.status === "refunded" && (
                      <Badge bg="danger">Refunded</Badge>
                    )}
                  </h6>

                  {bookingPayment ? (
                    <>
                      <p>
                        <strong>Payment Type:</strong>{" "}
                        {bookingPayment.paymentMethod === "razorpay"
                          ? "Online"
                          : bookingPayment.paymentMethod || "Cash"}
                      </p>

                      <p><strong>Payment ID:</strong> {bookingPayment.razorpay_payment_id || "N/A"}</p>

                      <p><strong>Payment Method:</strong> {bookingPayment.paymentGateway}</p>

                      <p><strong>Amount:</strong> ₹{bookingPayment.amount}</p>

                      <p><strong>Status:</strong> {bookingPayment.status}</p>

                      <p><strong>Platform Fee:</strong> ₹{bookingPayment.platformFee}</p>

                      <p>
                        <strong>Paid On:</strong>{" "}
                        {new Date(bookingPayment.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <Alert variant="secondary">
                      Payment not completed / not available because using a cash 
                    </Alert>
                  )}
                  {userReview ? (
                    <Card className={styles.reviewCard}>
                      <h6 className="mb-1">📝 Review by this user</h6>
                      <p><strong>Rating:</strong> ⭐ {userReview.rating}</p>
                      <p> <strong>Date: </strong>{new Date(userReview.updatedAt).toLocaleDateString()}</p>
                      <p><strong>Cleanliness:</strong>⭐ {userReview.cleanliness}</p>
                      <p><strong>Comfort:</strong> ⭐ {userReview.comfort}</p>
                      <p><strong>Service:</strong>⭐ {userReview.service}</p>
                      <p><strong>Location:</strong> ⭐ {userReview.location}</p>
                      <p><strong>Comment:</strong> {userReview.comment}</p>
                      {userReview.hostReply ? (
                        <>
                          <p>
                            <strong>Host Reply Date:</strong>{" "}
                            {new Date(userReview.hostReply.repliedAt).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Message:</strong> {userReview.hostReply.message}
                          </p>
                        </>
                      ) : (
                        <p className="text-muted">
                          Host has not replied yet.
                        </p>
                      )}

                      {/* ===== ADMIN REVIEW VISIBILITY STATUS ===== */}
                      <div className="mt-2">

                        {userReview.isHidden ? (
                          <>
                            <Alert variant="warning" className={styles.visiblereview}>
                              🚫 This review is currently <strong>HIDDEN</strong> from guests.
                            </Alert>

                            <button
                              className={styles.visiblereviewBTHS}
                              onClick={() =>
                                dispatch(
                                  toggleReviewVisibility({
                                    reviewId: userReview._id,
                                    token,
                                    isHidden: false,
                                  })
                                )
                              }
                            >
                              Show Review
                            </button>
                          </>
                        ) : (
                          <>
                            <Alert variant="success" className={styles.visiblereview}>
                              👁️ This review is <strong>VISIBLE</strong> to guests.
                            </Alert>

                            <button
                            // "btn btn-danger btn-sm"
                              className={styles.visiblereviewBTH}
                              onClick={() =>
                                dispatch(
                                  toggleReviewVisibility({
                                    reviewId: userReview._id,
                                    token,
                                    isHidden: true,
                                    reason: "Hidden by admin",
                                  })
                                )
                              }
                            >
                              Hide Review
                            </button>
                          </>
                        )}

                      </div>

                    </Card>
                  ) : (
                    <Alert variant="warning" className="mt-3">
                      Guest completed the booking but did not provide a review.
                    </Alert>
                  )}

                </Card>
              );
            })
          ) : (
            <Alert variant="info">No bookings yet.</Alert>
          )}

        </Col>
      </Row>

      <Row className={styles.ReviewList}>
        <Col>
          {/* ===== HEADING ===== */}
          <h4 className={styles.reviewHeading}>
            <FaStarHalfAlt className={styles.reviewHeadingIcon} />

            <span className={styles.reviewTitleDesktop}>
              Guest Reviews & Ratings
            </span>

            <span className={styles.reviewTitleMobile}>
              Reviews
            </span>

            <span className={styles.reviewCountBadge}>
              {reviews?.filter(r => !r.isHidden).length || 0}
            </span>
          </h4>

          {/* ===== REVIEW CARDS ===== */}
          {reviews?.length > 0 ? (
            reviews
              .filter(review => !review.isHidden)
              .map(review => {
                const hasHostReply =
                  review.hostReply?.message &&
                  review.hostReply?.repliedAt;

                return (
                  <Card key={review._id} className={styles.reviewCard}>
                    {/* ---------- USER HEADER ---------- */}
                    <div className={styles.reviewHeader}>
                      <Avatar user={review.user} />

                      <div>
                        <strong className={styles.userName}>
                          {review.user?.name}
                        </strong>

                        <div className={styles.reviewDate}>
                          <FaCalendarAlt />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* ---------- RATING ---------- */}
                    <div className={styles.ratingRow}>
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                      <span className={styles.ratingValue}>
                        {review.rating}/5
                      </span>
                    </div>

                    {/* ---------- COMMENT ---------- */}
                    <p className={styles.reviewComment}>
                      {review.comment}
                    </p>

                    {/* ---------- HOST REPLY ---------- */}
                    {hasHostReply ? (
                      <div className={styles.hostReplyBox}>
                        <div className={styles.hostHeader}>
                          <FaHome /> Host Reply
                        </div>

                        <p className={styles.hostMessage}>
                          <FaReply /> {review.hostReply.message}
                        </p>

                        <span className={styles.hostReplyDate}>
                          Replied on{" "}
                          {new Date(
                            review.hostReply.repliedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.noReply}>
                        <FaUserCircle /> Host has not replied yet
                      </div>
                    )}
                  </Card>
                );
              })
          ) : (
            <Alert variant="info">
              No guest reviews yet.
            </Alert>
          )}
        </Col>
      </Row>

      <div className={styles.leafletcontainer}>
        <h4>Where you'll be</h4>
        <div className={styles.mapcontainer}>
          {loadingMap ? (
            <p>Loading map...</p>
          ) : coordinates ? (
            <LeafletMap
              lat={coordinates.lat}
              lng={coordinates.lng}
              title={city}
            />
          ) : (
            <p>Map not available</p>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => nvigate("/admin/home")}
          className={styles.backButton}
        >
          <HiArrowLeft size={24} style={{ color: "blueviolet" }} />
          Back Home
        </button>

      </div>
    </Container>
    </div>
  );
};

export default AdminSinglePropertyDetails;
