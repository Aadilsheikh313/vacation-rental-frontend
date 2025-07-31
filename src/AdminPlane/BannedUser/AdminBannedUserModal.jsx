import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../utils/toastUtils";
import { resetBanState } from "../../config/redux/reducer/adminBannedUserReducer";
import { banUserByAdmin, unbanUserByAdmin } from "../../config/redux/action/adminBannedUserAction";

const AdminBannedUserModal = ({ userId, onClose }) => {
    const dispatch = useDispatch();
    const [reason, setReason] = useState("");
    const [note, setNote] = useState("");
    const [selectedAction, setSelectedAction] = useState("ban");

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
            dispatch(banUserByAdmin({ userId, reason }));
        } else {
            dispatch(unbanUserByAdmin({ userId, note }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[450px] relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-2xl font-bold text-red-500">
                    &times;
                </button>
                <h3 className="text-xl font-semibold mb-4">🔒 Ban/Unban Host</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>User ID</label>
                        <input
                            type="text"
                            value={userId}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {selectedAction === "ban" ? (
                        <div>
                            <label>Reason</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                placeholder="Ban reason"
                            />
                        </div>
                    ) : (
                        <div>
                            <label>Note</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                placeholder="Unban note"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : selectedAction === "ban" ? "Ban" : "Unban"}
                        </button>

                        <select
                            value={selectedAction}
                            onChange={(e) => setSelectedAction(e.target.value)}
                            className="select select-bordered"
                        >
                            <option value="ban">Ban</option>
                            <option value="unban">Unban</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminBannedUserModal;
