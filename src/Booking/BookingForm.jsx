import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import { getSinglePosts } from "../config/redux/action/propertyAction";
import { showError } from "../utils/toastUtils";

import PaymentModal from "../Payment/Payment";
import CheckBookingConflict from "./CheckBookingConflict";

import styles from "../stylesModule/Booking/bookingFrom.module.css";
import RoomsBooking from "../assets/RoomsDetails.jpg";

import { FaPhone } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import CustomSpinner from "../comman/Spinner";
import { setExistingBooking } from "../config/redux/reducer/bookingReducer";
import { checkBookingConflictPosts } from "../config/redux/action/bookingAction ";
import Payment from "../Payment/Payment";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const { singlePost } = useSelector((state) => state.post);
  const { conflictData, existingBooking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
    serviceFee: 100,
    paymentMethod: "card",
  });

  const [priceDetails, setPriceDetails] = useState({
    nights: 0,
    roomAmount: 0,
    gstRate: 0,
    gstAmount: 0,
    totalPrice: 0,
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);

  // Fetch property details
  useEffect(() => {
    if (propertyId) dispatch(getSinglePosts(propertyId));
  }, [dispatch, propertyId]);

  // Auto calculate price
  useEffect(() => {
    if (singlePost?.price && formData.checkIn && formData.checkOut) {
      const nights = Math.ceil(
        (new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)
      );
      const validNights = nights > 0 ? nights : 0;
      const roomAmount = singlePost.price * validNights;

      let gstRate = 0;
      if (singlePost.price >= 1001 && singlePost.price <= 7499) gstRate = 12;
      else if (singlePost.price >= 7500) gstRate = 18;

      const gstAmount = (roomAmount * gstRate) / 100;
      const totalPrice = roomAmount + parseInt(formData.serviceFee) + gstAmount;

      setPriceDetails({ nights: validNights, roomAmount, gstRate, gstAmount, totalPrice });
    }
  }, [formData.checkIn, formData.checkOut, formData.serviceFee, singlePost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["adults", "children", "infants", "pets"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        guests: { ...prev.guests, [name]: parseInt(value) || 0 },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { checkIn, checkOut, guests } = formData;

    // Validation
    if (!checkIn || !checkOut) return showError("Please select check-in and check-out dates.");
    if (new Date(checkOut) <= new Date(checkIn)) return showError("Check-out must be after check-in.");
    if (guests.adults < 1) return showError("At least one adult is required.");

    // Normalize dates
    const normalizeDate = (dateStr) => {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      return d.toISOString();
    };

    const bookingDates = {
      checkIn: normalizeDate(formData.checkIn),
      checkOut: normalizeDate(formData.checkOut),
    };

    // 🔹 Dispatch conflict check
    const resultAction = await dispatch(
      checkBookingConflictPosts({
        propertyId,
        userId: user._id,
        checkIn: bookingDates.checkIn,
        checkOut: bookingDates.checkOut,
      })
    );

    if (checkBookingConflictPosts.fulfilled.match(resultAction)) {
      const data = resultAction.payload;

      // 1️⃣ Same user existing booking
      if (data.alreadyBookedByUser && data.existingBooking) {
        dispatch(setExistingBooking(data.existingBooking));
        setShowConflictModal(true);
        return;
      }

      // 2️⃣ Other user(s) overlapping bookings
      if (data.alreadyBooked && Array.isArray(data.bookedDates) && data.bookedDates.length > 0) {
        setShowConflictModal(true);
        return;
      }

      // 3️⃣ No conflicts → proceed to payment
      setPaymentData({
        propertyId,
        userId: user._id,
        priceDetails,
        formData,
      });
      setShowPaymentModal(true);
    } else {
      showError(resultAction.payload || "Failed to check booking availability. Please try again.");
    }
  };

  return (
    <Container className={styles.bookingFormWrapper}>
      {/* Banner */}
      <div className={styles.bookingTopImage}>
        <img src={RoomsBooking} alt="RoomBookingImage" />
        <div className={styles.overlay}></div>
        <div className={styles.ImageUpperContent}>
          <h3>Book Your Perfect Stay</h3>
          <p>Escape the ordinary and discover unforgettable moments.</p>
        </div>
        <div className={styles.breadcrumb}>
          <input type="button" value="Home" onClick={() => navigate("/")} /> / Booking
        </div>
      </div>

      {/* Form */}
      <Card className={styles.bookingCard}>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>
            {singlePost && (
              <>
                <img src={singlePost.image?.url} alt={singlePost.title} className={styles.propertyImage} />
                <div className={styles.propertyDetails}>
                  <h4>{singlePost.title}</h4>
                  <p>{singlePost.description}</p>
                  <p><strong>Price:</strong> ₹{singlePost.price}/night</p>
                  <p><strong>City:</strong> {singlePost.city}</p>
                  <p><strong>Address:</strong> {singlePost.location}</p>
                  <p><strong>Host:</strong> {singlePost.userId?.name}</p>
                  <p><strong>Phone:</strong> {singlePost.userId?.phone} / {singlePost.userId?.email}</p>
                </div>
              </>
            )}

            <Form onSubmit={handleSubmit} className={styles.bookingFrom}>
              {/* Dates */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Check-In</Form.Label>
                    <Form.Control type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Check-Out</Form.Label>
                    <Form.Control type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Guests */}
              <Row className="mb-3">
                {["adults", "children", "infants", "pets"].map((g, idx) => (
                  <Col md={3} key={idx}>
                    <Form.Group>
                      <Form.Label>{g.charAt(0).toUpperCase() + g.slice(1)}</Form.Label>
                      <Form.Control type="number" name={g} value={formData.guests[g]} onChange={handleChange} min={g === "adults" ? 1 : 0} />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Price */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Service Fee</Form.Label>
                    <Form.Control type="number" name="serviceFee" value={formData.serviceFee} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>GST</Form.Label>
                    <Form.Control type="text" value={`${priceDetails.gstRate}% (₹${priceDetails.gstAmount})`} disabled />
                  </Form.Group>
                </Col>
              </Row>

              <div className={styles.totalPriceBox}>
                <p><strong>Nights:</strong> {priceDetails.nights}</p>
                <p><strong>Room Amount:</strong> ₹{priceDetails.roomAmount}</p>
                <p><strong>Service Fee:</strong> ₹{formData.serviceFee}</p>
                <p><strong>GST:</strong> ₹{priceDetails.gstAmount}</p>
                <h4><strong>Total Price:</strong> ₹{priceDetails.totalPrice}</h4>
              </div>

              <div className={styles.BookingBTN}>
                <Button type="submit" disabled={isLoading} className={styles.bookBtn}>
                  {isLoading ? "Booking..." : "Book Now"}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && paymentData && (
        <Payment
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          propertyId={paymentData.propertyId}
          userId={paymentData.userId}
          priceDetails={paymentData.priceDetails}
        />
      )}


      {/* Booking Conflict Modal */}
      {showConflictModal && (
        <CheckBookingConflict
          conflictData={conflictData}
          existingBooking={existingBooking}
          isError={isError}
          message={message}
          onClose={() => setShowConflictModal(false)}
        />
      )}

      {/* Info Cards */}
      <div className={styles.serviecCard}>
        <Card className={styles.CardService}>
          <FaPhone />
          <h3>Need Help?</h3>
          <p>Call our reservation team</p>
          <p>{singlePost?.directContact?.phone} <br /> {singlePost?.directContact?.email}</p>
        </Card>
        <Card className={styles.CardService}>
          <MdOutlineWatchLater />
          <h3>Check-in Time</h3>
          <p>2:00 PM onwards</p>
          <p><strong>Check-out:</strong> 11:00 AM</p>
        </Card>
        <Card className={styles.CardService}>
          <IoLocationOutline />
          <h3>Prime Location</h3>
          <p>Downtown district</p>
          <p>{singlePost?.location}</p>
        </Card>
      </div>
    </Container>
  );
};

export default BookingForm;
