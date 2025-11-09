// components/AdminTogglePropertyModal.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminBannedProperty.module.css";
import { showError, showSuccess } from "../../utils/toastUtils";
import {
    banPropertyByAdmin,
    unbanPropertyByAdmin,
} from "../../config/redux/action/adminActivePropertyAction";
import { resetBanPropertyState } from "../../config/redux/reducer/adminActivePropertyReducer";
import AdminBanPropertyLogList from "./AdminBanPropertyLogList";
import { FaBan, FaCheckSquare } from "react-icons/fa";

const AdminTogglePropertyModal = ({ property, onClose }) => {
    const dispatch = useDispatch();
    const [reasonOrNote, setReasonOrNote] = useState("");
    const [isInactivating, setIsInactivating] = useState(property.expired ? false : true);
    const [showLogs, setShowLogs] = useState(false);

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.adminBannedProperty);

    useEffect(() => {
        if (isSuccess) showSuccess(message);
        if (isError) showError(message);
        dispatch(resetBanPropertyState());
    }, [isSuccess, isError, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reasonOrNote.trim()) {
            return showError("Please enter a valid reason or note.");
        }

        if (isInactivating) {
            dispatch(banPropertyByAdmin({ propertyId: property._id, reason: reasonOrNote }));
        } else {
            dispatch(unbanPropertyByAdmin({ propertyId: property._id, note: reasonOrNote }));
        }

        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalBackdrop} >
                    <button onClick={onClose} className={styles.closeButton}>
                        &times;
                    </button>
                    <h3
                        className={`${styles.title} ${isInactivating ? styles.inactive : styles.active}`}
                    >
                        {isInactivating ? (
                            <>
                                <FaBan /> Inactivate Property
                            </>
                        ) : (
                            <>
                                <FaCheckSquare /> Activate Property
                            </>
                        )}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <p><strong>Title:</strong> {property.title}</p>
                    <p><strong>Status:</strong> {property.expired ? "Inactive" : "Active"}</p>

                    <textarea
                        className={styles.textareaField}
                        value={reasonOrNote}
                        onChange={(e) => setReasonOrNote(e.target.value)}
                        placeholder={isInactivating ? "Reason for inactivation..." : "Note for activation..."}
                    />

                    <div className={styles.formActions}>
                        <select
                            className={styles.selectField}
                            value={isInactivating ? "inactive" : "active"}
                            onChange={(e) => setIsInactivating(e.target.value === "inactive")}
                        >
                            <option value="inactive">Inactivate</option>
                            <option value="active">Activate</option>
                        </select>

                        <button
                            type="submit"
                            className={styles.btnPrimary}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : isInactivating ? "Inactivate" : "Activate"}
                        </button>
                    </div>
                </form>

                <button className={styles.btnSecondary} onClick={() => setShowLogs(true)}>
                    Show Ban Details
                </button>

                {showLogs && (
                    <div className={styles.separateOverlay}>
                        <div className={styles.separateContainer}>
                            <button
                                onClick={() => setShowLogs(false)}
                                className={styles.closeButton}
                            >
                                &times;
                            </button>
                            <AdminBanPropertyLogList propertyId={property._id} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminTogglePropertyModal;
