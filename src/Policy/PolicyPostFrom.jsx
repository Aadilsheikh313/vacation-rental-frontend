import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { policesPost } from "../config/redux/action/policeyAction";
import { resetStatus } from "../config/redux/reducer/policeyReducer";
import { getSinglePosts } from "../config/redux/action/propertyAction";
import styles from "../stylesModule/Policy/policyPost.module.css";
import { Col, Row } from "react-bootstrap";

const PolicyPostForm = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.policy
  );

  const [formData, setFormData] = useState({
    checkIn: {
      start: "3:00 PM",
      end: "12:00 AM",
      earlyCheckIn: { allowed: true, note: "Subject to availability" },
    },
    checkOut: {
      start: "6:00 AM",
      end: "11:00 AM",
      lateCheckOut: { allowed: true, charges: "Additional charges may apply" },
    },
    cancellation: {
      freeCancellation: { durationHours: 48 },
      withinDuration: { penalty: "1 night charge" },
      noShow: { penalty: "Full charge for entire stay" },
      peakSeason: {
        requiredAdvanceDays: 7,
        penalty: "7-day advance cancellation required",
      },
    },
    houseRules: {
      smoking: { allowed: false, note: "Designated areas available" },
      pets: { allowed: true, fee: 50 },
      maxOccupancy: 4,
      quietHours: { from: "10:00 PM", to: "8:00 AM" },
      validIdRequired: true,
    },
    paymentAndFees: {
      creditCardRequired: true,
      cityTax: { amount: 5, unit: "per night", included: false },
      resortFee: { amount: 25, unit: "per night" },
      parking: {
        available: true,
        type: "valet",
        amount: 30,
        unit: "per night",
      },
    },
  });

  const handleChange = (e, path) => {
    const { type, checked, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      keys.slice(0, -1).forEach((k) => (obj = obj[k]));
      obj[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(policesPost({ propertyId, policesData: formData }))
      .unwrap()
      .then(() => {
        dispatch(getSinglePosts(propertyId));
      })
      .catch(() => { });
  };

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Property Policy</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Row>
          <Col sm={12} md={6}>
            {/* Check In */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Check In</h3>
              <input
                type="text"
                value={formData.checkIn.start}
                onChange={(e) => handleChange(e, "checkIn.start")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.checkIn.end}
                onChange={(e) => handleChange(e, "checkIn.end")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.checkIn.earlyCheckIn.allowed}
                  onChange={(e) =>
                    handleChange(e, "checkIn.earlyCheckIn.allowed")
                  }
                />
                Early Check In Allowed
              </label>
              <input
                type="text"
                value={formData.checkIn.earlyCheckIn.note}
                onChange={(e) => handleChange(e, "checkIn.earlyCheckIn.note")}
                className={styles.input}
              />
            </div>
          </Col>
          <Col sm={12} md={6}>
            {/* Check Out */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Check Out</h3>
              <input
                type="text"
                value={formData.checkOut.start}
                onChange={(e) => handleChange(e, "checkOut.start")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.checkOut.end}
                onChange={(e) => handleChange(e, "checkOut.end")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.checkOut.lateCheckOut.allowed}
                  onChange={(e) =>
                    handleChange(e, "checkOut.lateCheckOut.allowed")
                  }
                />
                Late Check Out Allowed
              </label>
              <input
                type="text"
                value={formData.checkOut.lateCheckOut.charges}
                onChange={(e) =>
                  handleChange(e, "checkOut.lateCheckOut.charges")
                }
                className={styles.input}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            {/* Payment & Fees */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Payment & Fees</h3>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.paymentAndFees.creditCardRequired}
                  onChange={(e) =>
                    handleChange(e, "paymentAndFees.creditCardRequired")
                  }
                />
                Credit Card Required
              </label>
              <input
                type="number"
                value={formData.paymentAndFees.cityTax.amount}
                onChange={(e) => handleChange(e, "paymentAndFees.cityTax.amount")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.paymentAndFees.cityTax.unit}
                onChange={(e) => handleChange(e, "paymentAndFees.cityTax.unit")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.paymentAndFees.cityTax.included}
                  onChange={(e) => handleChange(e, "paymentAndFees.cityTax.included")}
                />
                City Tax Included
              </label>
              <input
                type="number"
                value={formData.paymentAndFees.resortFee.amount}
                onChange={(e) => handleChange(e, "paymentAndFees.resortFee.amount")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.paymentAndFees.resortFee.unit}
                onChange={(e) => handleChange(e, "paymentAndFees.resortFee.unit")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.paymentAndFees.parking.available}
                  onChange={(e) =>
                    handleChange(e, "paymentAndFees.parking.available")
                  }
                />
                Parking Available
              </label>
              <select
                value={formData.paymentAndFees.parking.type}
                onChange={(e) => handleChange(e, "paymentAndFees.parking.type")}
                className={styles.input}
              >
                <option value="valet">Valet</option>
                <option value="self">Self</option>
              </select>
              <input
                type="number"
                value={formData.paymentAndFees.parking.amount}
                onChange={(e) => handleChange(e, "paymentAndFees.parking.amount")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.paymentAndFees.parking.unit}
                onChange={(e) => handleChange(e, "paymentAndFees.parking.unit")}
                className={styles.input}
              />
            </div>


          </Col>
          <Col sm={12} md={6}>
            {/* House Rules */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>House Rules</h3>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.houseRules.smoking.allowed}
                  onChange={(e) => handleChange(e, "houseRules.smoking.allowed")}
                />
                Smoking Allowed
              </label>
              <input
                type="text"
                value={formData.houseRules.smoking.note}
                onChange={(e) => handleChange(e, "houseRules.smoking.note")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.houseRules.pets.allowed}
                  onChange={(e) => handleChange(e, "houseRules.pets.allowed")}
                />
                Pets Allowed
              </label>
              <input
                type="number"
                value={formData.houseRules.pets.fee}
                onChange={(e) => handleChange(e, "houseRules.pets.fee")}
                className={styles.input}
              />
              <input
                type="number"
                value={formData.houseRules.maxOccupancy}
                onChange={(e) => handleChange(e, "houseRules.maxOccupancy")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.houseRules.quietHours.from}
                onChange={(e) => handleChange(e, "houseRules.quietHours.from")}
                className={styles.input}
              />
              <input
                type="text"
                value={formData.houseRules.quietHours.to}
                onChange={(e) => handleChange(e, "houseRules.quietHours.to")}
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.houseRules.validIdRequired}
                  onChange={(e) => handleChange(e, "houseRules.validIdRequired")}
                />
                Valid ID Required
              </label>
            </div>
          </Col>
        </Row>
        <Row>

          <Col sm={12} md={6}>

            {/* Cancellation */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Cancellation</h3>
              <input
                type="number"
                value={formData.cancellation.freeCancellation.durationHours}
                onChange={(e) =>
                  handleChange(e, "cancellation.freeCancellation.durationHours")
                }
                className={styles.input}
              />
              <input
                type="text"
                value={formData.cancellation.withinDuration.penalty}
                onChange={(e) =>
                  handleChange(e, "cancellation.withinDuration.penalty")
                }
                className={styles.input}
              />
              <input
                type="text"
                value={formData.cancellation.noShow.penalty}
                onChange={(e) => handleChange(e, "cancellation.noShow.penalty")}
                className={styles.input}
              />
              <input
                type="number"
                value={formData.cancellation.peakSeason.requiredAdvanceDays}
                onChange={(e) =>
                  handleChange(e, "cancellation.peakSeason.requiredAdvanceDays")
                }
                className={styles.input}
              />
              <input
                type="text"
                value={formData.cancellation.peakSeason.penalty}
                onChange={(e) =>
                  handleChange(e, "cancellation.peakSeason.penalty")
                }
                className={styles.input}
              />
            </div>
          </Col>
          <Col sm={12} md={6}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Posting..." : "Create Policy"}
            </button>
          </Col>

        </Row>
      </form>

      {message && (
        <p
          className={`${styles.message} ${isSuccess
            ? styles.success
            : isError
              ? styles.error
              : styles.neutral
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PolicyPostForm;
