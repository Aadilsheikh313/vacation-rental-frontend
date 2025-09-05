import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { getSinglePosts } from "../config/redux/action/propertyAction";
import { showError, showSuccess } from "../utils/toastUtils";
import PaymentModal from "../Payment/Index";
import styles from "../stylesModule/bookingFrom.module.css";
import RoomsBooking from '../assets/RoomsDetails.jpg';
import { FaPhone, FaStopwatch20, FaWatchmanMonitoring } from "react-icons/fa6";
import { MdOutlineWatch, MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const { singlePost } = useSelector((state) => state.post);
  const { isLoading } = useSelector((state) => state.booking);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
    numberOfNights: 1,
    serviceFee: 100,
    taxes: 50,
    paymentMethod: "card",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);


  useEffect(() => {
    if (propertyId) dispatch(getSinglePosts(propertyId));
  }, [dispatch, propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["adults", "children", "infants", "pets"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        guests: {
          ...prev.guests,
          [name]: parseInt(value) || 0,
        },
      }));
    } else {
      const updated = { ...formData, [name]: value };

      if (updated.checkIn && updated.checkOut) {
        const checkInDate = new Date(updated.checkIn);
        const checkOutDate = new Date(updated.checkOut);
        const diff = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        updated.numberOfNights = diff > 0 ? diff : 1;
      }

      setFormData(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { checkIn, checkOut } = formData;

    if (new Date(checkIn) < new Date())
      return showError("Check-in date cannot be in the past.");
    if (new Date(checkOut) <= new Date(checkIn))
      return showError("Check-out must be after check-in.");

    const totalCost =
      (singlePost?.price || 0) * formData.numberOfNights +
      parseInt(formData.serviceFee) +
      parseInt(formData.taxes);

    // ✅ Just open the modal and pass data — no API call yet
    setPaymentData({
      amount: totalCost,
      formData,
      propertyId,
    });
    setShowPaymentModal(true);
  };


  const totalCost =
    (singlePost?.price || 0) * formData.numberOfNights +
    parseInt(formData.serviceFee) +
    parseInt(formData.taxes);

  const handleclickHome = () => {
    navigate("/")
  }

  return (
    <Container className={styles.bookingFormWrapper}>
      <div className={styles.bookingTopImage}>
        <img src={RoomsBooking} alt="RoomBookingImage" />
        <div className={styles.overlay}></div>
        <div className={styles.ImageUpperContent}>
          <h3>Booking</h3>
          <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
        </div>
        <div className={styles.breadcrumb}>
          <input type="button" value="Home" onClick={handleclickHome} /> / Booking
        </div>
      </div>
      <Card className={styles.bookingCard}>
        {isLoading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {singlePost && (
          <div className="mb-4">
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
              <p><strong>Phone:</strong> {singlePost.userId?.phone} / ({singlePost.userId?.email})</p>
            </div>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="checkIn">
                <Form.Label className={styles.formLabel}>Check-In</Form.Label>
                <Form.Control type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required className={styles.formControl} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="checkOut">
                <Form.Label>Check-Out</Form.Label>
                <Form.Control type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="numberOfNights">
                <Form.Label>Nights</Form.Label>
                <Form.Control type="number" name="numberOfNights" value={formData.numberOfNights} onChange={handleChange} min="1" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="adults">
                <Form.Label>Adults</Form.Label>
                <Form.Control type="number" name="adults" value={formData.guests.adults} onChange={handleChange} min="1" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="children">
                <Form.Label>Children</Form.Label>
                <Form.Control type="number" name="children" value={formData.guests.children} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="infants">
                <Form.Label>Infants</Form.Label>
                <Form.Control type="number" name="infants" value={formData.guests.infants} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="pets">
                <Form.Label>Pets</Form.Label>
                <Form.Control type="number" name="pets" value={formData.guests.pets} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="serviceFee">
                <Form.Label>Service Fee</Form.Label>
                <Form.Control type="number" name="serviceFee" value={formData.serviceFee} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="taxes">
                <Form.Label>Taxes</Form.Label>
                <Form.Control type="number" name="taxes" value={formData.taxes} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <div className={styles.totalPrice}>
            <strong>Total Price:</strong> ₹{totalCost}
          </div>
          {showPaymentModal && paymentData && (
            <PaymentModal
              show={showPaymentModal}
              onHide={() => setShowPaymentModal(false)}
              amount={paymentData.amount}
              propertyId={paymentData.propertyId}
              formData={paymentData.formData}
            />
          )}

          <Button type="submit" className={styles.bookBtn}>
            {isLoading ? "Booking..." : "Book Now"}
          </Button>
        </Form>
      </Card>
      <div className={styles.serviecCard}>
        <Card className={styles.CardService}>
          <FaPhone />
          <h3>Need Help?</h3>
          <p>Call our reservation team</p>
          <p>{singlePost?.directContact?.phone} <br />
            {singlePost?.directContact?.email}</p>
        </Card>
        <Card className={styles.CardService}>
          <MdOutlineWatchLater />
          <h3>Check-in Time</h3>
          <p>2:00 PM onwards</p>
          <p> <strong>Check-out:</strong> 11:00 AM</p>
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
