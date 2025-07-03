import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";
import { getSinglePosts } from "../config/redux/action/propertyAction";
import { showError, showSuccess } from "../utils/toastUtils";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { checkIn, checkOut } = formData;

    if (new Date(checkIn) < new Date())
      return showError("Check-in date cannot be in the past.");
    if (new Date(checkOut) <= new Date(checkIn))
      return showError("Check-out must be after check-in.");

    try {
      await dispatch(postBookingPropertyPosts({ propertyId, bookingDate: formData })).unwrap();
      showSuccess("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      if (
        error === "Property already booked for selected dates" ||
        error?.message === "Property already booked for selected dates"
      ) {
        showError("This property is already booked for the selected dates.");
      } else {
        showError(error || "Failed to book the property.");
      }
    }
  };

  const totalCost =
    (singlePost?.price || 0) * formData.numberOfNights +
    parseInt(formData.serviceFee) +
    parseInt(formData.taxes);

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <h2 className="mb-4">Book This Property</h2>

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
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
            />
            <h4>{singlePost.title}</h4>
            <p>{singlePost.description}</p>
            <p><strong>Price:</strong> ₹{singlePost.price}/night</p>
            <p><strong>City:</strong> {singlePost.city}</p>
            <p><strong>Address:</strong> {singlePost.location}</p>
            <p><strong>Host:</strong> {singlePost.userId?.name}</p>
            <p><strong>Phone:</strong> {singlePost.userId?.phone} / ({singlePost.userId?.email})</p>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="checkIn">
                <Form.Label>Check-In</Form.Label>
                <Form.Control type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
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

          <Form.Group className="mb-3" controlId="paymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </Form.Group>

          <div className="mb-3 text-lg">
            <strong>Total Price:</strong> ₹{totalCost}
          </div>

          <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
            {isLoading ? "Booking..." : "Book Now"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BookingForm;
