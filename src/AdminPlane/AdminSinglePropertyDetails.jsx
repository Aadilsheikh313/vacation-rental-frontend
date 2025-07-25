import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { getSinglePropertyAdminPosts } from "../config/redux/action/adminHomeDashAction";
import { useState } from "react";
import LeafletMap from "../Map/MapComponent";
import Avatar from "../comman/Avatar";
import { HiArrowLeft } from 'react-icons/hi';


const AdminSinglePropertyDetails = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const nvigate = useNavigate();

  const {
    adminSingleProperty,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHomeDash);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePropertyAdminPosts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const location = adminSingleProperty?.location;
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

  const {
    title,
    city,
    state,
    price,
    description,
    image,
    bookings,
    reviews,
    payments,
    totalRevenue,
    totalBookings,
    avgRating,
    userId,
    propertyPostedOn,
  } = adminSingleProperty;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🏡 Property Details</h2>

      <Card className="mb-4 shadow">
        {image?.url && (
          <Card.Img variant="top" src={image.url} style={{ maxHeight: "300px", objectFit: "cover" }} />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Location:</strong> {city}, {state} <br />
            <strong>Price:</strong> ₹{price} / night <br />
            <strong>Description:</strong> {description} <br />
            <strong>Posted By:</strong> {userId?.name} | {userId?.email} <br />
            <strong>Phone :</strong> {userId?.phone} <br />
            <strong>Posted On:</strong> {propertyPostedOn ? new Date(propertyPostedOn).toLocaleDateString() : "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-3 p-3">
            <h5>📊 Booking Summary</h5>
            <p><strong>Total Bookings:</strong> {totalBookings}</p>
            <p><strong>Total Revenue:</strong> ₹{totalRevenue}</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 p-3">
            <h5>⭐ Reviews Summary</h5>
            <p><strong>Total Reviews:</strong> {reviews?.length || 0}</p>
            <p><strong>Average Rating:</strong> {avgRating}</p>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4>🧾 Bookings</h4>
          {bookings?.length > 0 ? (
            bookings.map((booking, idx) => {
              const userReview = reviews?.find(
                (rev) => rev.user?._id === booking.user?._id
              );

              return (
                <Card key={idx} className="mb-3 p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Avatar user={booking.user} />
                    <strong>{booking.user?.name}</strong>
                  </div>
                  <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><strong>Phone:</strong> {booking.user?.phone}</p>

                  {userReview ? (
                    <Card className="mt-3 p-2 bg-light">
                      <h6 className="mb-1">📝 Review by this user</h6>
                      <p><strong>Rating:</strong> ⭐ {userReview.rating}</p>
                      <p><strong>Comment:</strong> {userReview.comment}</p>
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
        <Col>
          <h4>💸 Payments</h4>
          {payments?.length > 0 ? (
            payments.map((payment, idx) => (
              <Card key={idx} className="mb-2 p-2">
                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                <p><strong>Status:</strong> {payment.status}</p>
              </Card>
            ))
          ) : (
            <Alert variant="info">No payments recorded.</Alert>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4>📝 Reviews</h4>
          {reviews?.length > 0 ? (
            reviews
              .filter(
                (review) =>
                  !bookings?.some((booking) => booking.user?._id === review.user?._id)
              )
              .map((review, idx) => (
                <Card key={idx} className="mb-2 p-2">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Avatar user={review.user} />
                    <strong>{review.user?.name}</strong>
                  </div>
                  <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                </Card>
              ))
          ) : (
            <Alert variant="info">No reviews available.</Alert>
          )}

        </Col>
      </Row>
      <div className="mt-4">
        <h4>Where you'll be</h4>
        <div className="map-container">
          {loadingMap ? (
            <p>Loading map...</p>
          ) : coordinates ? (
            <LeafletMap lat={coordinates.lat} lng={coordinates.lng} title={city} />
          ) : (
            <p>Map not available</p>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => nvigate("/admin/home")}
          style={{ marginTop: '10px', color: "blue", background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <HiArrowLeft size={24} style={{ color: "blueviolet" }} />
          Back Home
        </button>

      </div>
    </Container>
  );
};

export default AdminSinglePropertyDetails;
