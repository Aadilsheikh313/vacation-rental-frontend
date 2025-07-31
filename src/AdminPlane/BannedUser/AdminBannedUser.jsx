import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetBanState } from "../../config/redux/reducer/adminBannedUserReducer";
import { banUserByAdmin, fetchBanLogs, unbanUserByAdmin } from "../../config/redux/action/adminBannedUserAction";

const AdminBannedUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [selectedAction, setSelectedAction] = useState("ban");

  const { isLoading, isSuccess, isError, message, banLogs } = useSelector(
    (state) => state.adminBannedUser
  );

  // Show toast on success/error
  useEffect(() => {
    if (isSuccess) toast.success(message);
    if (isError) toast.error(message);
    dispatch(resetBanState());
  }, [isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(fetchBanLogs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) return toast.error("User ID is required.");

    if (selectedAction === "ban") {
      dispatch(banUserByAdmin({ userId, reason }));
    } else {
      dispatch(unbanUserByAdmin({ userId, note }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">🚫 Admin Ban/Unban Panel</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-4 border"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="input input-bordered w-full"
          />
        </div>

        {selectedAction === "ban" ? (
          <div className="flex flex-col gap-2">
            <label className="font-medium">Ban Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for ban (optional)"
              className="textarea textarea-bordered"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="font-medium">Unban Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Unban note (optional)"
              className="textarea textarea-bordered"
            />
          </div>
        )}

        <div className="flex items-center gap-4 mt-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader small /> : selectedAction === "ban" ? "Ban User" : "Unban User"}
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

      {/* Logs */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">📜 Ban/Unban Logs</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Target User</th>
                <th>Performed By</th>
                <th>Reason / Note</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {banLogs?.map((log, index) => (
                <tr key={log._id}>
                  <td>{index + 1}</td>
                  <td>{log.action}</td>
                  <td>{log.targetUser?.name || "N/A"}</td>
                  <td>{log.performedBy?.name || "N/A"}</td>
                  <td>{log.reason || log.note || "-"}</td>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {banLogs?.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No logs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBannedUser;
