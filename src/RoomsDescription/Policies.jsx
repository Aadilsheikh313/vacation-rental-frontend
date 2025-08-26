import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { policesGet } from "../config/redux/action/policeyAction";
import styles from "../stylesModule/propertyView.module.css";

const Policies = () => {
  const { id: propertyId } = useParams();
  const dispatch = useDispatch();

  const { policy, isLoading, isError, message } = useSelector(
    (state) => state.policy
  );

  // 🔹 Fetch policy on mount
  useEffect(() => {
    if (propertyId) {
      dispatch(policesGet(propertyId));
    }
  }, [dispatch, propertyId]);

  if (isLoading) return <p>Loading policy...</p>;
  if (isError) return <p className="text-red-500">{message || "Failed to load policy"}</p>;
  if (!policy) return <p>No policy found for this property.</p>;

  return (
    <div className={styles.PoliciesConatiner}>
      {/* ✅ Check-in & Check-out */}
      <div className={styles.CheckinAndCheckout}>
        <h3>Check-in & Check-out</h3>
        <p><strong>Check-In:</strong> {policy.checkIn?.start} - {policy.checkIn?.end}</p>
        <p>
          <strong>Early Check-In:</strong>{" "}
          {policy.checkIn?.earlyCheckIn?.allowed ? "Allowed" : "Not Allowed"}{" "}
          ({policy.checkIn?.earlyCheckIn?.note})
        </p>
        <p><strong>Check-Out:</strong> {policy.checkOut?.start} - {policy.checkOut?.end}</p>
        <p>
          <strong>Late Check-Out:</strong>{" "}
          {policy.checkOut?.lateCheckOut?.allowed ? "Allowed" : "Not Allowed"}{" "}
          ({policy.checkOut?.lateCheckOut?.charges})
        </p>
      </div>

      {/* ✅ Cancellation */}
      <div className={styles.CancellationPolicy}>
        <h3>Cancellation Policy</h3>
        <p><strong>Free Cancellation:</strong> {policy.cancellation?.freeCancellation?.durationHours} hours before</p>
        <p><strong>Within Duration:</strong> {policy.cancellation?.withinDuration?.penalty}</p>
        <p><strong>No Show:</strong> {policy.cancellation?.noShow?.penalty}</p>
        <p>
          <strong>Peak Season:</strong> {policy.cancellation?.peakSeason?.requiredAdvanceDays} days before -{" "}
          {policy.cancellation?.peakSeason?.penalty}
        </p>
      </div>

      {/* ✅ House Rules */}
      <div className={styles.HouseRules}>
        <h3>House Rules</h3>
        <p><strong>Smoking:</strong> {policy.houseRules?.smoking?.allowed ? "Allowed" : "Not Allowed"} ({policy.houseRules?.smoking?.note})</p>
        <p><strong>Pets:</strong> {policy.houseRules?.pets?.allowed ? "Allowed" : "Not Allowed"} (Fee: ${policy.houseRules?.pets?.fee})</p>
        <p><strong>Max Occupancy:</strong> {policy.houseRules?.maxOccupancy}</p>
        <p><strong>Quiet Hours:</strong> {policy.houseRules?.quietHours?.from} - {policy.houseRules?.quietHours?.to}</p>
        <p><strong>Valid ID Required:</strong> {policy.houseRules?.validIdRequired ? "Yes" : "No"}</p>
      </div>

      {/* ✅ Payment & Fees */}
      <div className={styles.PaymentAndFees}>
        <h3>Payment & Fees</h3>
        <p><strong>Credit Card Required:</strong> {policy.paymentAndFees?.creditCardRequired ? "Yes" : "No"}</p>
        <p>
          <strong>City Tax:</strong> ${policy.paymentAndFees?.cityTax?.amount} {policy.paymentAndFees?.cityTax?.unit}{" "}
          ({policy.paymentAndFees?.cityTax?.included ? "Included" : "Not Included"})
        </p>
        <p>
          <strong>Resort Fee:</strong> ${policy.paymentAndFees?.resortFee?.amount} {policy.paymentAndFees?.resortFee?.unit}
        </p>
        <p>
          <strong>Parking:</strong>{" "}
          {policy.paymentAndFees?.parking?.available
            ? `${policy.paymentAndFees?.parking?.type} - $${policy.paymentAndFees?.parking?.amount} ${policy.paymentAndFees?.parking?.unit}`
            : "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default Policies;
