// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Spinner, Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
// import { getSinglePosts } from "../config/redux/action/propertyAction";
// import { showError, showSuccess } from "../utils/toastUtils";
// import PaymentModal from "../Payment/Index";
// import styles from "../stylesModule/Booking/bookingFrom.module.css";
// import RoomsBooking from "../assets/RoomsDetails.jpg";
// import { FaPhone } from "react-icons/fa6";
// import { MdOutlineWatchLater } from "react-icons/md";
// import { IoLocationOutline } from "react-icons/io5";
// import CustomSpinner from "../comman/Spinner";

// const BookingForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id: propertyId } = useParams();

//   // 🔹 Main booking form data
//   const [formData, setFormData] = useState({
//     checkIn: "",
//     checkOut: "",
//     guests: { adults: 1, children: 0, infants: 0, pets: 0 },
//     serviceFee: 100,
//     taxes: 50,
//     paymentMethod: "card",
//   });

//   // 🔹 Price details
//   const [priceDetails, setPriceDetails] = useState({
//     nights: 0,
//     roomAmount: 0,
//     gstRate: 0,
//     gstAmount: 0,
//     totalPrice: 0,
//   });

//   const { singlePost } = useSelector((state) => state.post);
//   const { isLoading } = useSelector((state) => state.booking);
//   const { user, token } = useSelector(state => state.auth);


//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentData, setPaymentData] = useState(null);
//   const [showConflictCheck, setShowConflictCheck] = useState(false);


//   // 🔹 Auto calculate whenever checkIn/checkOut/serviceFee changes
//   useEffect(() => {
//     if (singlePost?.price && formData.checkIn && formData.checkOut) {
//       const nights = Math.ceil(
//         (new Date(formData.checkOut) - new Date(formData.checkIn)) /
//         (1000 * 60 * 60 * 24)
//       );

//       const validNights = nights > 0 ? nights : 0;
//       const roomAmount = singlePost.price * validNights;

//       // ✅ GST Rate Logic
//       let gstRate = 0;
//       if (singlePost.price >= 1001 && singlePost.price <= 7499) gstRate = 12;
//       else if (singlePost.price >= 7500) gstRate = 18;

//       const gstAmount = (roomAmount * gstRate) / 100;

//       const totalPrice =
//         roomAmount + parseInt(formData.serviceFee) + gstAmount;

//       setPriceDetails({
//         nights: validNights,
//         roomAmount,
//         gstRate,
//         gstAmount,
//         totalPrice,
//       });
//     }
//   }, [formData.checkIn, formData.checkOut, formData.serviceFee, singlePost]);

//   // 🔹 Fetch property details
//   useEffect(() => {
//     if (propertyId) dispatch(getSinglePosts(propertyId));
//   }, [dispatch, propertyId]);

//   // 🔹 Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (["adults", "children", "infants", "pets"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         guests: { ...prev.guests, [name]: parseInt(value) || 0 },
//       }));
//     } else {
//       const updated = { ...formData, [name]: value };

//       if (updated.checkIn && updated.checkOut) {
//         const diff = Math.ceil(
//           (new Date(updated.checkOut) - new Date(updated.checkIn)) /
//           (1000 * 60 * 60 * 24)
//         );
//         updated.numberOfNights = diff > 0 ? diff : 1;
//       }

//       setFormData(updated);
//     }
//   };

//   // 🔹 Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { checkIn, checkOut, guests, serviceFee, taxes, paymentMethod } =
//       formData;

//     // ✅ Validations
//     if (new Date(checkIn) < new Date())
//       return showError("Check-in date cannot be in the past.");
//     if (new Date(checkOut) <= new Date(checkIn))
//       return showError("Check-out must be after check-in.");
//     if (guests.adults < 1) return showError("At least one adult is required.");

//     // ✅ Trigger conflict check modal before proceeding to payment
//     setShowConflictCheck(true);

//     // Prepare data for backend
//     const bookingPayload = {
//       checkIn,
//       checkOut,
//       guests,
//       serviceFee,
//       taxes,
//       paymentMethod,
//     };

//     try {
//       setPaymentData({
//         amount: priceDetails.totalPrice,
//         propertyId,
//         formData: bookingPayload,
//       });

//       setShowPaymentModal(true);
//     } catch (err) {
//       showError(err.message || "Failed to book property");
//     }
//   };

//   const handleHomeClick = () => navigate("/");

//   return (
//     <Container className={styles.bookingFormWrapper}>
//       {/* 🔹 Top Banner */}
//       <div className={styles.bookingTopImage}>
//         <img src={RoomsBooking} alt="RoomBookingImage" />
//         <div className={styles.overlay}></div>
//         <div className={styles.ImageUpperContent}>
//           <h3>Book Your Perfect Stay</h3>
//           <p>
//             Escape the ordinary and discover comfort, warmth, and unforgettable
//             moments. Your next beautiful memory starts with a single booking.
//           </p>
//         </div>
//         <div className={styles.breadcrumb}>
//           <input type="button" value="Home" onClick={handleHomeClick} /> /
//           Booking
//         </div>
//       </div>

//       {/* 🔹 Booking Form */}
//       <Card className={styles.bookingCard}>
//         {isLoading ? (
//           <CustomSpinner />
//         ) : (
//           <>
//             {singlePost && (
//               <>
//                 <img
//                   src={singlePost.image.url}
//                   alt={singlePost.title}
//                   className={styles.propertyImage}
//                 />
//                 <div className={styles.propertyDetails}>
//                   <h4>{singlePost.title}</h4>
//                   <p>{singlePost.description}</p>
//                   <p>
//                     <strong>Price:</strong> ₹{singlePost.price}/night
//                   </p>
//                   <p>
//                     <strong>City:</strong> {singlePost.city}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {singlePost.location}
//                   </p>
//                   <p>
//                     <strong>Host:</strong> {singlePost.userId?.name}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {singlePost.userId?.phone} /{" "}
//                     {singlePost.userId?.email}
//                   </p>
//                 </div>
//               </>
//             )}



//               {showConflictCheck && (
//                 <CheckBookingConflict
//                   propertyId={propertyId}
//                   token={token}        // from Redux auth
//                   userId={user._id}    // current logged-in user
//                   bookingDates={{ checkIn: formData.checkIn, checkOut: formData.checkOut }}
//                   onConflictCheck={() => {
//                     // ✅ No conflict → proceed to payment modal
//                     setPaymentData({
//                       amount: priceDetails.totalPrice,
//                       propertyId,
//                       formData,
//                     });
//                     setShowPaymentModal(true);
//                     setShowConflictCheck(false); // hide conflict check
//                   }}
//                 />
//               )}

//               {/* Payment Modal */}
//               {showPaymentModal && paymentData && (
//                 <PaymentModal
//                   show={showPaymentModal}
//                   onHide={() => setShowPaymentModal(false)}
//                   amount={paymentData.amount}
//                   propertyId={paymentData.propertyId}
//                   formData={paymentData.formData}
//                 />
//               )}

//             </Form>
//           </>
//         )}
//       </Card>

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { getSinglePosts } from "../config/redux/action/propertyAction";
import { showError } from "../utils/toastUtils";
import PaymentModal from "../Payment/Index";
import styles from "../stylesModule/Booking/bookingFrom.module.css";
import RoomsBooking from "../assets/RoomsDetails.jpg";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import CustomSpinner from "../comman/Spinner";
import CheckBookingConflict from "./CheckBookingConflict";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const { singlePost } = useSelector((state) => state.post);
  const { isLoading } = useSelector((state) => state.booking);
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
    serviceFee: 100,
    taxes: 50,
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
  const [showConflictCheck, setShowConflictCheck] = useState(false);

  // Fetch property details
  useEffect(() => {
    if (propertyId) dispatch(getSinglePosts(propertyId));
  }, [dispatch, propertyId]);

  // Auto calculate price whenever relevant fields change
  useEffect(() => {
    if (singlePost?.price && formData.checkIn && formData.checkOut) {
      const nights = Math.ceil(
        (new Date(formData.checkOut) - new Date(formData.checkIn)) /
        (1000 * 60 * 60 * 24)
      );
      const validNights = nights > 0 ? nights : 0;
      const roomAmount = singlePost.price * validNights;

      let gstRate = 0;
      if (singlePost.price >= 1001 && singlePost.price <= 7499) gstRate = 12;
      else if (singlePost.price >= 7500) gstRate = 18;

      const gstAmount = (roomAmount * gstRate) / 100;
      const totalPrice = roomAmount + parseInt(formData.serviceFee) + gstAmount;

      setPriceDetails({
        nights: validNights,
        roomAmount,
        gstRate,
        gstAmount,
        totalPrice,
      });
    }
  }, [formData.checkIn, formData.checkOut, formData.serviceFee, singlePost]);

  // Handle input change
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

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { checkIn, checkOut, guests } = formData;

    // Validations
    if (new Date(checkIn) < new Date())
      return showError("Check-in date cannot be in the past.");
    if (new Date(checkOut) <= new Date(checkIn))
      return showError("Check-out must be after check-in.");
    if (guests.adults < 1) return showError("At least one adult is required.");

    // Show conflict check modal first
    setShowConflictCheck(true);
  };

  const handleHomeClick = () => navigate("/");

  return (
    <Container className={styles.bookingFormWrapper}>
      {/* Top Banner */}
      <div className={styles.bookingTopImage}>
        <img src={RoomsBooking} alt="RoomBookingImage" />
        <div className={styles.overlay}></div>
        <div className={styles.ImageUpperContent}>
          <h3>Book Your Perfect Stay</h3>
          <p>
            Escape the ordinary and discover comfort, warmth, and unforgettable
            moments. Your next beautiful memory starts with a single booking.
          </p>
        </div>
        <div className={styles.breadcrumb}>
          <input type="button" value="Home" onClick={handleHomeClick} /> / Booking
        </div>
      </div>

      {/* Booking Form */}
      <Card className={styles.bookingCard}>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>
            {singlePost && (
              <>
                <img
                  src={singlePost.image.url}
                  alt={singlePost.title}
                  className={styles.propertyImage}
                />
                <div className={styles.propertyDetails}>
                  <h4>{singlePost.title}</h4>
                  <p>{singlePost.description}</p>
                  <p><strong>Price:</strong> ₹{singlePost.price}/night</p>
                  <p><strong>City:</strong> {singlePost.city}</p>
                  <p><strong>Address:</strong> {singlePost.location}</p>
                  <p><strong>Host:</strong> {singlePost.userId?.name}</p>
                  <p>
                    <strong>Phone:</strong> {singlePost.userId?.phone} / {singlePost.userId?.email}
                  </p>
                </div>
              </>
            )}

                        <Form onSubmit={handleSubmit} className={styles.bookingFrom}>
              {/* Dates */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className={styles.Fromlebel}>Check-In</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className={styles.Fromlebel}>Check-Out</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Guests */}
              <Row className="mb-3">
                {["adults", "children", "infants", "pets"].map((guestType, idx) => (
                  <Col md={3} key={idx}>
                    <Form.Group>
                      <Form.Label className={styles.Fromlebel}>
                        {guestType.charAt(0).toUpperCase() + guestType.slice(1)}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name={guestType}
                        value={formData.guests[guestType]}
                        onChange={handleChange}
                        min={guestType === "adults" ? 1 : 0}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              {/* Service Fee & GST */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className={styles.Fromlebel}>Service Fee</Form.Label>
                    <Form.Control
                      type="number"
                      name="serviceFee"
                      value={formData.serviceFee}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className={styles.Fromlebel}>GST</Form.Label>
                    <Form.Control
                      type="text"
                      value={`${priceDetails.gstRate}% (₹${priceDetails.gstAmount})`}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Price Summary */}
              <div className={styles.totalPriceBox}>
                <Row className={styles.totalPriceRow}>
                  <Col xs={12} md={6}>
                    <p>
                      <strong>Nights:</strong> {priceDetails.nights}
                    </p>
                  </Col>
                  <Col xs={12} md={6}>
                    <p>
                      <strong>Room Amount:</strong> ₹{priceDetails.roomAmount}
                    </p>
                  </Col>
                </Row>
                <Row className={styles.totalPriceRow}>
                  <Col xs={12} md={6}>
                    <p>
                      <strong>Service Fee:</strong> ₹{formData.serviceFee}
                    </p>
                  </Col>
                  <Col xs={12} md={6}>
                    <p>
                      <strong>GST ({priceDetails.gstRate}%):</strong> ₹
                      {priceDetails.gstAmount}
                    </p>
                  </Col>
                </Row>
                <hr />
                <h4>
                  <strong>Total Price:</strong> ₹{priceDetails.totalPrice}
                </h4>
              </div>

              {/* Conflict Check */}
              {showConflictCheck && (
                <CheckBookingConflict
                  propertyId={propertyId}
                  token={token}
                  userId={user._id}
                  bookingDates={{ checkIn: formData.checkIn, checkOut: formData.checkOut }}
                  onConflictCheck={() => {
                    setPaymentData({
                      amount: priceDetails.totalPrice,
                      propertyId,
                      formData,
                    });
                    setShowPaymentModal(true);
                    setShowConflictCheck(false);
                  }}
                />
              )}

              {/* Payment Modal */}
              {showPaymentModal && paymentData && (
                <PaymentModal
                  show={showPaymentModal}
                  onHide={() => setShowPaymentModal(false)}
                  amount={paymentData.amount}
                  propertyId={paymentData.propertyId}
                  formData={paymentData.formData}
                />
              )}

              <div className={styles.BookingBTN}>
                <Button type="submit" className={styles.bookBtn}>
                  {isLoading ? "Booking..." : "Book Now"}
                </Button>
              </div>

            </Form>
          </>
        )}
      </Card>

      {/* 🔹 Info Cards */}
      <div className={styles.serviecCard}>
        <Card className={styles.CardService}>
          <FaPhone />
          <h3>Need Help?</h3>
          <p>Call our reservation team</p>
          <p>
            {singlePost?.directContact?.phone} <br />
            {singlePost?.directContact?.email}
          </p>
        </Card>
        <Card className={styles.CardService}>
          <MdOutlineWatchLater />
          <h3>Check-in Time</h3>
          <p>2:00 PM onwards</p>
          <p>
            <strong>Check-out:</strong> 11:00 AM
          </p>
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
