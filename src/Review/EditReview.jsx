import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../stylesModule/Review/editreview.module.css";
import StarInput from "./StarInput";
import {
  editReviewPosts,
} from "../config/redux/action/reviewAction";
import { resetStatus } from "../config/redux/reducer/reviewReducer";
import { showError, showSuccess } from "../utils/toastUtils";

const EditReviewModal = ({ review, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.review
  );
  const { token } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [comfort, setComfort] = useState(5);
  const [service, setService] = useState(5);
  const [location, setLocation] = useState(5);
  const [comment, setComment] = useState("");

  // 🔁 Prefill old data
  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setCleanliness(review.cleanliness);
      setComfort(review.comfort);
      setService(review.service);
      setLocation(review.location);
      setComment(review.comment || "");
    }
  }, [review]);

  // 💾 Save
  const handleSave = () => {
    dispatch(
      editReviewPosts({
        reviewId: review._id,
        token,
        rating,
        cleanliness,
        comfort,
        service,
        location,
        comment,
      })
    );
  };

  // ✅ Close after success
useEffect(() => {
  if (!isLoading && message) {
    if (!isError && message === "Review updated successfully") {
      showSuccess(message);   // ✅ SUCCESS TOAST
      onClose();
      dispatch(resetStatus());
    }

    if (isError) {
      showError(message);     // ❌ ERROR TOAST
      dispatch(resetStatus());
    }
  }
}, [isLoading, isError, message, dispatch, onClose]);


  if (!review) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Your Review</h3>
        <div className={styles.strarline}>
          <label>Overall Rating :-</label>
          <StarInput rating={rating} setRating={setRating} />
        </div>
        <div className={styles.strarline}>
          <label>Cleanliness :-</label>
          <StarInput rating={cleanliness} setRating={setCleanliness} />
        </div>
        <div className={styles.strarline}>
          <label>Comfort :-</label>
          <StarInput rating={comfort} setRating={setComfort} />
        </div>
        <div className={styles.strarline}>
          <label>Service :-</label>
          <StarInput rating={service} setRating={setService} />
        </div>
        <div className={styles.strarline}>
          <label>Location :-</label>
          <StarInput rating={location} setRating={setLocation} />
        </div>
        <div className={styles.strarline}>
          <label>Comment :-</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {isError && <p className={styles.error}>{message}</p>}

        <div className={styles.actions}>
          <button onClick={onClose} disabled={isLoading} 
          className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={isLoading}
            className={styles.saveBtn}>
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
