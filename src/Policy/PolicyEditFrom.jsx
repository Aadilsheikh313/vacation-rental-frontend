import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { policesGet, policesUpdate } from "../config/redux/action/policeyAction";
import styles from "../stylesModule/Policy/policyEdit.module.css";
import { Col, Row } from "react-bootstrap";

const PolicyEditForm = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { policy, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.policy
  );

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (policy) {
      setFormData(policy);
    }
  }, [policy]);

  // generic nested change handler
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

  useEffect(() => {
    if (propertyId) {
      dispatch(policesGet(propertyId)); // pass karo propertyId
    }
  }, [dispatch, propertyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;
    dispatch(policesUpdate({ propertyId, policesData: formData }));
  };

  if (!formData) return <p className={styles.loading}>Loading policy...</p>;

  return (
    <div className={styles.PolicyEditFormContainer}>
      <h2 className={styles.formTitle}> Edit Property Policy</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Row className={styles.policyeditrow}> 
          <Col sm={12} md={6}>
           {/* ✅ Check In */}
        <div className={styles.formGroup}>
          <label>Check In Start</label>
          <input
            type="text"
            value={formData.checkIn.start}
            onChange={(e) => handleChange(e, "checkIn.start")}
          />
          <label>Check In End</label>
          <input
            type="text"
            value={formData.checkIn.end}
            onChange={(e) => handleChange(e, "checkIn.end")}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.checkIn.earlyCheckIn.allowed}
              onChange={(e) => handleChange(e, "checkIn.earlyCheckIn.allowed")}
            />
            Early Check In Allowed
          </label>
          <input
            type="text"
            value={formData.checkIn.earlyCheckIn.note}
            onChange={(e) => handleChange(e, "checkIn.earlyCheckIn.note")}
          />
        </div>

          </Col>
          <Col sm={12} md={6}>
           {/* ✅ Check Out */}
        <div className={styles.formGroup}>
          <label>Check Out Start</label>
          <input
            type="text"
            value={formData.checkOut.start}
            onChange={(e) => handleChange(e, "checkOut.start")}
          />
          <label>Check Out End</label>
          <input
            type="text"
            value={formData.checkOut.end}
            onChange={(e) => handleChange(e, "checkOut.end")}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.checkOut.lateCheckOut.allowed}
              onChange={(e) => handleChange(e, "checkOut.lateCheckOut.allowed")}
            />
            Late Check Out Allowed
          </label>
          <input
            type="text"
            value={formData.checkOut.lateCheckOut.charges}
            onChange={(e) => handleChange(e, "checkOut.lateCheckOut.charges")}
          />
        </div>

          </Col>
        </Row>
        <Row className={styles.policyeditrow}> 
          <Col sm={12} md={6}>
          {/* ✅ Cancellation */}
        <div className={styles.formGroup}>
          <label>Free Cancellation (hours)</label>
          <input
            type="number"
            value={formData.cancellation.freeCancellation.durationHours}
            onChange={(e) =>
              handleChange(e, "cancellation.freeCancellation.durationHours")
            }
          />
          <label>Penalty (within duration)</label>
          <input
            type="text"
            value={formData.cancellation.withinDuration.penalty}
            onChange={(e) =>
              handleChange(e, "cancellation.withinDuration.penalty")
            }
          />
          <label>No Show Penalty</label>
          <input
            type="text"
            value={formData.cancellation.noShow.penalty}
            onChange={(e) => handleChange(e, "cancellation.noShow.penalty")}
          />
          <label>Peak Season Advance Days</label>
          <input
            type="number"
            value={formData.cancellation.peakSeason.requiredAdvanceDays}
            onChange={(e) =>
              handleChange(e, "cancellation.peakSeason.requiredAdvanceDays")
            }
          />
          <label>Peak Season Penalty</label>
          <input
            type="text"
            value={formData.cancellation.peakSeason.penalty}
            onChange={(e) => handleChange(e, "cancellation.peakSeason.penalty")}
          />
        </div>

          </Col>
          <Col sm={12} md={6}>
           {/* ✅ House Rules */}
        <div className={styles.formGroup}>
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
          />
        </div>
          </Col>
        </Row>
       
        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {isLoading ? "Updating..." : "Update Policy"}
        </button>
      </form>

      {message && (
        <p
          className={`${styles.message} ${
            isSuccess
              ? styles.success
              : isError
              ? styles.error
              : styles.info
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PolicyEditForm;
