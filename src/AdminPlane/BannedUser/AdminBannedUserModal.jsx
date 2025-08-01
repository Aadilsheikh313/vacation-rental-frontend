import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../utils/toastUtils";
import { resetBanState } from "../../config/redux/reducer/adminBannedUserReducer";
import { banUserByAdmin, unbanUserByAdmin } from "../../config/redux/action/adminBannedUserAction";
import AdminBanLogList from "./AdminBanLogList";
import styles from "../../adminStylesModule/adminBannedUserModal.module.css";


const AdminBannedUserModal = ({ userId, isBanned, onClose }) => {
    const dispatch = useDispatch();
    const [reason, setReason] = useState("");
    const [note, setNote] = useState("");
    const [selectedAction, setSelectedAction] = useState(isBanned ? "unban" : "ban");
    const [showLogs, setShowLogs] = useState(false); // 👈 For toggling logs

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.adminBannedUser
    );

    useEffect(() => {
        if (isSuccess) showSuccess(message);
        if (isError) showError(message);
        dispatch(resetBanState());
    }, [isSuccess, isError, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId) return showError("Missing user ID");

        if (selectedAction === "ban") {
            if (!reason.trim()) return showError("Please provide a reason for banning.");
            dispatch(banUserByAdmin({ userId, reason }));
        } else {
            if (!note.trim()) return showError("Please provide a note for unbanning.");
            dispatch(unbanUserByAdmin({ userId, note }));
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>

                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
                <h3 className={styles.title}>🔒 Ban/Unban Host</h3>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <div>
                       <label className={styles.label}>User ID</label>
                        <input
                            type="text"
                            value={userId}
                            disabled
                            className={styles.inputField} 
                        />
                    </div>

                    {selectedAction === "ban" ? (
                        <div>
                            <label className={styles.label}>Reason</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className={styles.textareaField}
                                placeholder="Ban reason"
                            />
                        </div>
                    ) : (
                        <div>
                            <label>Note</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className={styles.textareaField}
                                placeholder="Unban note"
                            />
                        </div>
                    )}
                    <div className={styles.actionRow}>
                        <select
                            value={selectedAction}
                            onChange={(e) => setSelectedAction(e.target.value)}
                            className={styles.selectField}
                        >
                            <option value="ban">Ban</option>
                            <option value="unban">Unban</option>
                        </select>
                         <button
                            type="submit"
                            className={styles.btnPrimary}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : selectedAction === "ban" ? "Ban" : "Unban"}
                        </button>
                    </div>
                </form>

                {/* ✅ Button to show logs */}
                {!showLogs && (
                    <div className={styles.logsSection}>
                        <button
                            className={styles.btnOutline}
                            onClick={() => setShowLogs(true)}
                        >
                            Show Ban Logs
                        </button>
                    </div>
                )}

                {showLogs && (
                    <div className="border-t pt-4 mt-6">
                        <AdminBanLogList
                            userId={userId}
                            onUnbanNoteSubmit={(note) => {
                                dispatch(unbanUserByAdmin({ userId, note }));
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBannedUserModal;
