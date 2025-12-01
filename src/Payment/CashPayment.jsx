import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toastUtils";
import { postBookingPropertyPosts } from "../config/redux/action/bookingAction ";


const CashPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation(); // payload from BookingForm

  if (!state) {
    navigate("/");
    return null;
  }

  const { propertyId, formData, priceDetails, singlePost } = state;

  const handleConfirmCash = async () => {
    try {
      const payload = {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        serviceFee: formData.serviceFee,
        totalAmount: priceDetails.totalPrice,
      };

      await dispatch(
        postBookingPropertyPosts({
          propertyId,
          bookingData: payload,
          token,
        })
      ).unwrap();

      showSuccess("Booking confirmed — please pay at the property!");
      navigate("/my-bookings");
    } catch (err) {
      showError(err?.message || "Cash booking failed");
    }
  };

  return (
    <Card className="p-4 mx-auto mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Cash Payment Confirmation</h3>

      <p><strong>Property:</strong> {singlePost?.title}</p>
      <p>
        <strong>Guests:</strong>
        {formData.guests.adults} Adults, {formData.guests.children} Children,
        {formData.guests.infants} Infants, {formData.guests.pets} Pets
      </p>

      <p><strong>Check-In:</strong> {formData.checkIn}</p>
      <p><strong>Check-Out:</strong> {formData.checkOut}</p>
      <p><strong>Total Nights:</strong> {priceDetails.nights}</p>

      <h4 className="mt-2">
        <strong>Total Amount Due:</strong> ₹{priceDetails.totalPrice}
      </h4>

      <p className="text-muted mt-2">
        Please pay the amount at the property during check-in to complete the booking.
      </p>

      <Button
        variant="success"
        size="lg"
        onClick={handleConfirmCash}
        className="w-100 mt-3"
      >
        Confirm Booking
      </Button>
    </Card>
  );
};

export default CashPayment;
