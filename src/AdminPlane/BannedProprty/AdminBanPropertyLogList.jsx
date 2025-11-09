// components/AdminBanPropertyLogList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminBanLogList.module.css";
import { formatDate, formatTime } from "../../utils/dateUtils.js";
import { fetchBanPropertyLogs } from "../../config/redux/action/adminActivePropertyAction.js";
import { RiFileCopy2Line } from "react-icons/ri";

const AdminBanPropertyLogList = ({ propertyId, onUnbanNoteSubmit }) => {
  const dispatch = useDispatch();
  const [unbanNote, setUnbanNote] = useState("");

  const { banPropertyLogs, PRoperty, isLoading, isError, message } = useSelector(
    (state) => state.adminBannedProperty
  );
  
  useEffect(() => {
    if (propertyId) {
      dispatch(fetchBanPropertyLogs(propertyId));
    }
  }, [dispatch, propertyId]);

  const property = banPropertyLogs?.length
    ? banPropertyLogs[0]?.targetUser || {}
    : {};

  const title = PRoperty?.title || "Property";

  const isCurrentlyBanned = !!property?.inActiveAt && !property?.ActiveAt;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Fetching property logs...</p>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">{message || "Failed to load logs."}</p>;
  }

  if (!banPropertyLogs || banPropertyLogs.length === 0) {
    return <p>No ban/unban logs available for this property.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        <RiFileCopy2Line /> Ban / Unban Property Logs
      </h2>
      <p className={styles.subTitle}>{title}</p>

      <div className="overflow-x-auto max-h-[400px]">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Admin</th>
              <th>Action</th>
              <th>Reason / Note</th>
              <th>Log Time</th>
            </tr>
          </thead>
          <tbody>
            {banPropertyLogs.map((log, index) => {
              const user = log?.targetUser || {};
              const admin = log?.performedBy || {};

              return (
                <tr key={log._id || index} className={styles.tableRow}>
                  <td>{index + 1}</td>

                  <td className={styles.cellUser}>
                    <div><strong>{user.name || "N/A"}</strong></div>
                    <div className={styles.cellEmail}>{user.email || "-"}</div>
                    <div className="text-sm">{user.phone || "-"}</div>
                  </td>

                  <td>
                    <div><strong>{admin.name || "N/A"}</strong></div>
                    <div className={styles.cellEmail}>{admin.email || "-"}</div>
                    <div className="text-sm">{admin.phone || "-"}</div>
                  </td>

                  <td
                    className={
                      log.action === "ban"
                        ? styles.actionBan
                        : styles.actionUnban
                    }
                  >
                    {log.action?.toUpperCase() || "-"}
                  </td>

                  <td>{log.reason || log.note || "-"}</td>

                  <td>
                    <div><strong>Date:</strong> {formatDate(log.createdAt)}</div>
                    <div><strong>Time:</strong> {formatTime(log.createdAt)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isCurrentlyBanned && (
        <div className={styles.unbanForm}>
          <input
            type="text"
            className={styles.unbanInput}
            placeholder="Note for unbanning..."
            value={unbanNote}
            onChange={(e) => setUnbanNote(e.target.value)}
          />
          <button
            onClick={() => {
              if (!unbanNote.trim()) {
                alert("Please enter a note before unbanning!");
                return;
              }
              onUnbanNoteSubmit?.(unbanNote);
              setUnbanNote("");
            }}
            className={styles.unbanButton}
          >
            Unban
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBanPropertyLogList;
