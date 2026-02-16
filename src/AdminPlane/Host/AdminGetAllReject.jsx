import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRejectHostAction } from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";
import styles from "../../adminStylesModule/Host/admingetAllRejectHost.module.css";
import ProfileModel from "./HostProfileDetials";
import ReVerifationModel from "./Reverifiey";
import CustomSpinner from "../../comman/Spinner";
import { Card } from "react-bootstrap";

const GetAllRejectedHost = () => {
    const dispatch = useDispatch();

    const [selectedHost, setSelectedHost] = useState(null);
    const [hostProfileModel, setHostProfileModel] = useState(false);

    // 🔹 New state for admin details modal
    const [adminModal, setAdminModal] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);

    //Reverfication model
    const [reverfiaction, setReverification] = useState(false);
    const [reverifyHostId, setReverifyHostId] = useState(null);

    const {
        allReject,
        isLoading,
        isError,
        isSuccess,
        message } = useSelector((state) => state.verifyRejectPending);



    useEffect(() => {
        dispatch(GetAllRejectHostAction());

        return () => {
            dispatch(resetPending());
        }
    }, [dispatch]);

    // 🔹 Handle verificationStatus click — show admin verification details
    const handleViewAdminDetails = (host) => {
        const rejectedAudit = host.audit?.find((a) => a.action === "rejected");
        const appliedAudit = host.audit?.find((a) => a.action === "applied");

        if (rejectedAudit) {
            const details = {
                adminName: rejectedAudit.adminDetails?.name || "N/A",
                adminEmail: rejectedAudit.adminDetails?.email || "N/A",
                adminPhone: rejectedAudit.adminDetails?.phone || "N/A",
                note: rejectedAudit.note || host.adminNote || "N/A",
                rejectedDate: new Date(rejectedAudit.date).toLocaleString(),
                appliedDate: appliedAudit
                    ? new Date(appliedAudit.date).toLocaleString()
                    : "N/A",
            };
            setAdminDetails(details);
            setAdminModal(true);
        } else {
            alert("No verification details found for this host.");
        }
    };

    const handleReverification = (hostId) => {
        setReverifyHostId(hostId);
        setReverification(true);
    };

    return (
        <div className={styles.Rejectcontainer}>

            <div className={styles.tableWrapper}>
                <Card className={styles.summaryCard}>
                    <Card.Body>
                        <h3>All Rejected Host</h3>
                        <h5>Total Rejected Host :  <span className={styles.totalPendingCount}>{allReject.length}</span></h5>
                    </Card.Body>
                </Card>
                {isLoading && (
                    <div >
                        <CustomSpinner />
                        <p>Loading...</p>
                    </div>
                )}


                {isError && <p className="text-danger">Error: {message}</p>}

                {isSuccess && allReject.length === 0 && (
                    <p className={styles.noHostsFound}>No rejected hosts found.</p>
                )}

                {!isLoading && allReject.length > 0 && (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Reject</th>
                                    <th>ReVerifed</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allReject.map((host, index) => (
                                        <tr key={host._id}>
                                            <td>{index + 1}</td>
                                            <td>{host.user.name}</td>
                                            <td>{host.user.email}</td>
                                            <td>{host.user.phone}</td>

                                            <td>
                                                <button
                                                    onClick={() => handleViewAdminDetails(host)}
                                                    className={styles.viewButton}
                                                >
                                                    {host.verificationStatus}
                                                </button>

                                            </td>
                                            <td>
                                                <button
                                                    className={styles.viewButton}
                                                    onClick={() => handleReverification(host._id)}
                                                >
                                                    Reverify
                                                </button>
                                            </td>
                                            <td className={styles.viewButtonCell}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedHost(host);
                                                        setHostProfileModel(true);
                                                    }}
                                                    className={styles.viewButton}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}

                {hostProfileModel && selectedHost && (
                    <div className={styles.modalBackdrop}>
                        <div className={`${styles.modalCard} animate-slide-up`}>
                            <button
                                onClick={() => setHostProfileModel(false)}
                                className={styles.closeButton}
                            >
                                &times;
                            </button>
                            <ProfileModel user={selectedHost.user} host={selectedHost} />
                        </div>
                    </div>
                )}

                {/* 🔹 Admin Details Modal */}
                {adminModal && adminDetails && (
                    <div className={styles.modalBackdrop}>
                        <div className={`${styles.modalCard} animate-slide-up`}>
                            <button
                                onClick={() => setAdminModal(false)}
                                className={styles.closeButton}
                            >
                                &times;
                            </button>
                            <h3 className="text-center mb-3">Admin Verified Details</h3>
                            <p>
                                <strong>Admin Name:</strong> {adminDetails.adminName}
                            </p>
                            <p>
                                <strong>Admin Email:</strong> {adminDetails.adminEmail}
                            </p>
                            <p>
                                <strong>Admin Phone:</strong> {adminDetails.adminPhone}
                            </p>
                            <p>
                                <strong>Verification Note:</strong> {adminDetails.note || host.adminNote}
                            </p>
                            <p>
                                <strong>Host Applied On:</strong> {adminDetails.appliedDate}
                            </p>
                            <p>
                                <strong>Verified On:</strong> {adminDetails.rejectedDate}
                            </p>
                        </div>
                    </div>
                )}

                {/* Reverification Modal */}
                <ReVerifationModel
                    show={reverfiaction}
                    onClose={() => setReverification(false)}
                    hostId={reverifyHostId}
                />
            </div>
        </div>
    )
}
export default GetAllRejectedHost;