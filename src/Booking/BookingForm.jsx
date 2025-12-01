
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import { getSinglePosts } from "../config/redux/action/propertyAction";
import { setExistingBooking } from "../config/redux/reducer/bookingReducer";
import { showError } from "../utils/toastUtils";

import CheckBookingConflict from "./CheckBookingConflict";
import Payment from "../Payment/Payment";

import styles from "../stylesModule/Booking/bookingFrom.module.css";
import RoomsBooking from "../assets/RoomsDetails.jpg";

import { FaPhone } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import CustomSpinner from "../comman/Spinner";
import {
  checkBookingConflictPosts,
  createTempBookingPosts,
  postBookingPropertyPosts
} from "../config/redux/action/bookingAction ";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const { singlePost } = useSelector((state) => state.post);
  const { conflictData, existingBooking, isLoading, isError, tempBooking, message } = useSelector(
    (state) => state.booking
  );
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
    serviceFee: 100,
    paymentMethod: "online",
  });

  const [priceDetails, setPriceDetails] = useState({
    nights: 0,
    roomAmount: 0,
    gstRate: 0,
    gstAmount: 0,
    totalPrice: 0,
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);

  useEffect(() => {
    if (propertyId) dispatch(getSinglePosts(propertyId));
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (singlePost?.price && formData.checkIn && formData.checkOut) {
      const nights = Math.ceil(
        (new Date(formData.checkOut) - new Date(formData.checkIn)) /
        (1000 * 60 * 60 * 24)
      );
      const validNights = nights > 0 ? nights : 0;
      const roomAmount = Number(singlePost.price) * validNights;

      let gstRate = 0;
      if (Number(singlePost.price) >= 1001 && Number(singlePost.price) <= 7499) gstRate = 12;
      else if (Number(singlePost.price) >= 7500) gstRate = 18;

      const gstAmount = Number(((roomAmount * gstRate) / 100).toFixed(2));
      const totalPrice = Number((roomAmount + Number(formData.serviceFee) + gstAmount).toFixed(2));

      setPriceDetails({ nights: validNights, roomAmount, gstRate, gstAmount, totalPrice });
    } else {
      setPriceDetails({ nights: 0, roomAmount: 0, gstRate: 0, gstAmount: 0, totalPrice: 0 });
    }
  }, [formData.checkIn, formData.checkOut, formData.serviceFee, singlePost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["adults", "children", "infants", "pets"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        guests: { ...prev.guests, [name]: parseInt(value, 10) || 0 },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStartBooking = async (method) => {
    if (!token) return navigate("/login");

    const { checkIn, checkOut, guests } = formData;

    if (!checkIn || !checkOut) return showError("Please select check-in and check-out dates.");
    if (new Date(checkOut) <= new Date(checkIn)) return showError("Check-out must be after check-in.");
    if (guests.adults < 1) return showError("At least one adult is required.");

    const bookingDates = {
      checkIn: checkIn + "T00:00:00",
      checkOut: checkOut + "T00:00:00",
    };

    const resultAction = await dispatch(
      checkBookingConflictPosts({
        propertyId,
        userId: user._id,
        checkIn: bookingDates.checkIn,
        checkOut: bookingDates.checkOut,
      })
    );

    if (!checkBookingConflictPosts.fulfilled.match(resultAction)) {
      return showError("Failed to check booking availability.");
    }

    const data = resultAction.payload;

    if (data.alreadyBookedByUser && data.existingBooking) {
      dispatch(setExistingBooking(data.existingBooking));
      setShowConflictModal(true);
      return;
    }

    if (data.alreadyBooked && data.bookedDates?.length > 0) {
      setShowConflictModal(true);
      return;
    }

    const bookingPayload = {
      propertyId,
      checkIn,
      checkOut,
      guests,
      serviceFee: formData.serviceFee,
      totalAmount: priceDetails.totalPrice,
    };

    // 💵 CASH BOOKING
    if (method === "cash") {
      const res = await dispatch(
        postBookingPropertyPosts({
          propertyId,
          bookingData: bookingPayload,
          token,
        })
      );
      if (postBookingPropertyPosts.fulfilled.match(res)) {
        navigate("/my-bookings");
      }
      return;
    }
    // 💳 ONLINE PAYMENT
    const tempRes = await dispatch(
      createTempBookingPosts({
        token,
        payload: bookingPayload,
      })
    );

    if (createTempBookingPosts.fulfilled.match(tempRes)) {
      setPaymentPayload({
        propertyId,
        formData,
        priceDetails,
      });
      setShowPaymentModal(true);
    }

  };



  return (
    <Container className={styles.bookingFormWrapper}>
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

            <Form className={styles.bookingFrom}>
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

              <Row className="mb-3">
                {["adults", "children", "infants", "pets"].map((g, i) => (
                  <Col md={3} key={i}>
                    <Form.Group>
                      <Form.Label className="text-capitalize">{g}</Form.Label>
                      <Form.Control type="number" name={g} min="0" value={formData.guests[g]} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

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
                <Button onClick={() => handleStartBooking("cash")} className={styles.bookBtn}>
                  Cash Payment
                </Button>
                <Button onClick={() => handleStartBooking("online")} className={styles.bookBtn}>
                  Online Payment
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>

      {showPaymentModal && tempBooking && paymentPayload && (
        <Payment
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          singlePost={singlePost.title}
        />
      )}


      {showConflictModal && (
        <CheckBookingConflict
          conflictData={conflictData}
          existingBooking={existingBooking}
          isError={isError}
          message={message}
          onClose={() => setShowConflictModal(false)}
        />
      )}

      <div className={styles.serviecCard}>
        <Card className={styles.CardService}>
          <FaPhone />
          <h3>Need Help?</h3>
          <p>Call our reservation team</p>
          <p>{singlePost?.directContact?.phone}<br />{singlePost?.directContact?.email}</p>
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
