import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminBanLogList.module.css";
import { formatDate, formatTime } from "../../utils/dateUtils.js"
import { fetchBanPropertyLogs } from "../../config/redux/action/adminActivePropertyAction.js";

const AdminBanPropertyLogList = ({ propertyId }) => {
    const dispatch = useDispatch();
    const [unbanNote, setUnbanNote] = useState("");
    const { banPropertyLogs, isLoading, isError, message } = useSelector(state => state.adminBannedProperty);

    useEffect(() => {
        if (propertyId) dispatch(fetchBanPropertyLogs(propertyId));
    }, [dispatch, propertyId]);


    const filteredLogs = propertyId
        ? banPropertyLogs.filter(log => log.targetProperty?._id === propertyId)
        : banPropertyLogs;

    if (isLoading) return <p>Loading logs...</p>;
    if (isError) return <p className="text-red-500">{message}</p>;
    if (!filteredLogs.length) return <p>No ban/unban propety logs available.</p>;

    const latestLog = filteredLogs[0];
    const isCurrentlyBanned = latestLog?.targetUser?.isBanned;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>📝 Ban/Unban Logs</h2>
            <div className="overflow-x-auto max-h-[400px]">
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Admin</th>
                            <th>Action</th>
                            <th>Reason / Note</th>
                            <th>Ban Info</th>
                            <th>Unban Info</th>
                            <th>Log Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log, index) => {
                            const user = log.targetUser;
                            const admin = log.performedBy;

                            return (
                                <tr key={log._id} className={styles.tableRow}>
                                    <td>{index + 1}</td>

                                    {/* User Info */}
                                    <td className={styles.cellUser}>
                                        <div><strong>{user?.name}</strong></div>
                                        <div className={styles.cellEmail}>{user?.email}</div>
                                        <div className="text-sm">{user?.phone}</div>
                                    </td>

                                    {/* Admin Info */}
                                    <td>
                                        <div><strong>{admin?.name}</strong></div>
                                        <div className={styles.cellEmail}>{admin?.email}</div>
                                        <div className="text-sm">{admin?.phone}</div>
                                    </td>

                                    {/* Action */}
                                    <td className={log.action === "ban" ? styles.actionBan : styles.actionUnban}>
                                        {log.action.toUpperCase()}
                                    </td>

                                    {/* Reason / Note */}
                                    <td>{log.reason || log.note}</td>

                                    {/* Ban Info */}
                                    <td>
                                        {user?.bannedAt ? (
                                            <>
                                                <div><strong>Date:</strong> {formatDate(user.bannedAt)}</div>
                                                <div><strong>Time:</strong> {formatTime(user.bannedAt)}</div>
                                            </>
                                        ) : "-"}
                                    </td>

                                    {/* Unban Info */}
                                    <td>
                                        {user?.unbannedAt ? (
                                            <>
                                                <div><strong>Date:</strong> {formatDate(user.unbannedAt)}</div>
                                                <div><strong>Time:</strong> {formatTime(user.unbannedAt)}</div>
                                            </>
                                        ) : "-"}
                                    </td>

                                    {/* Log Created Time */}
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

            {/* ✅ Show Unban form only if currently banned */}
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
                            if (!unbanNote.trim()) return alert("Please enter a note.");
                            onUnbanNoteSubmit(unbanNote);
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
