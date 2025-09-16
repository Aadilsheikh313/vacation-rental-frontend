import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Alert, Card } from "react-bootstrap";
import { GetGuestPastBookingPost } from "../config/redux/action/guestDashAction";

const PastBooking = () => {
  const dispatch = useDispatch();

  // Redux state
  const { PastBookings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.guestDash
  );

  // On component mount -> fetch bookings
  useEffect(() => {
    dispatch(GetGuestPastBookingPost());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Past Bookings</h4>

      {/* Loading State */}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* Error State */}
      {isError && <Alert variant="danger">{message || "Something went wrong"}</Alert>}

      {/* Success but no bookings */}
      {isSuccess && PastBookings?.length === 0 && (
        <Alert variant="info">No past bookings found</Alert>
      )}

      {/* Show bookings */}
      <div className="row">
        {PastBookings?.map((booking) => (
          <div className="col-md-4 mb-3" key={booking._id}>
            <Card>
              <Card.Body>
                <Card.Title>{booking.property?.title || "Property"}</Card.Title>
                <Card.Text>
                  <strong>Check In:</strong>{" "}
                  {new Date(booking.checkIn).toLocaleDateString()} <br />
                  <strong>Check Out:</strong>{" "}
                  {new Date(booking.checkOut).toLocaleDateString()} <br />
                  <strong>Status:</strong> {booking.bookingStatus}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastBooking;
