import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVerifedHostAction } from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";
import { Card } from "react-bootstrap";
import styles from "../../adminStylesModule/Host/adminVerfied.module.css";
import ProfileModel from "./HostProfileDetials";
import CustomSpinner from "../../comman/Spinner";

const GetAllVerifyHost = () => {
    const dispatch = useDispatch();
    const {
        allVerifed,
        isLoading,
        isError,
        isSuccess,
        message } = useSelector((state) => state.verifyRejectPending);

    const [propertyModel, setPropertyModel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hostProfileModel, setHostProfileModel] = useState(false);
    const [selectedHost, setSelectedHost] = useState(null);

    // 🔹 New state for admin details modal
    const [adminModal, setAdminModal] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);


    useEffect(() => {
        dispatch(GetAllVerifedHostAction());

        return () => {
            dispatch(resetPending());
        }
    }, [dispatch]);

    const handleViewProperties = (host) => {
        setPropertyModel(host);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPropertyModel(null);
    };

    // 🔹 Handle verificationStatus click — show admin verification details
    const handleViewAdminDetails = (host) => {
        const appliedAudit = host.audit?.find((a) => a.action === "applied");
        const verifiedAudit = host.audit?.find((a) => a.action === "verified");
        const rejectedAudit = host.audit?.find((a) => a.action === "rejected");
        const reverifiedAudit = host.audit?.find((a) => a.action === "reverified");

        let details = {
            appliedDate: appliedAudit ? new Date(appliedAudit.date).toLocaleString() : "N/A",
            verifiedDate: verifiedAudit ? new Date(verifiedAudit.date).toLocaleString() : "N/A",
            rejectedDate: rejectedAudit ? new Date(rejectedAudit.date).toLocaleString() : "N/A",
            reverifiedDate: reverifiedAudit ? new Date(reverifiedAudit.date).toLocaleString() : "N/A",
            adminVerify: verifiedAudit?.adminDetails || null,
            adminReject: rejectedAudit?.adminDetails || null,
            adminReverify: reverifiedAudit?.adminDetails || null,
            verifyNote: verifiedAudit?.note || "N/A",
            rejectNote: rejectedAudit?.note || "N/A",
            reverifyNote: reverifiedAudit?.note || "N/A",
            status: host.verificationStatus
        };

        setAdminDetails(details);
        setAdminModal(true);
    };


    return (
        <div className={styles.GetallVefiedHostConatiner}>
            <div className={styles.tableWrapper}>
                <Card className={styles.summaryCard}>
                    <Card.Body>
                        <h3>All Verify Host</h3>
                        <h5>Total Verifed Host :  <span className={styles.totalPendingCount}>{allVerifed.length}</span></h5>
                    </Card.Body>
                </Card>
                {isLoading && (
                    <div >
                        <CustomSpinner />
                        <p>Loading...</p>
                    </div>
                )}

                {isError && <p className="text-danger">Error: {message}</p>}

                {isSuccess && allVerifed.length === 0 && (
                    <p className="text-center text-primary">No verifed hosts found.</p>
                )}

                {!isLoading && allVerifed.length > 0 && (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Total Post</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th>Verify</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allVerifed.map((host, index) => (
                                        <tr key={host._id}>
                                            <td>{index + 1}</td>
                                            <td>{host?.user?.name || "N/A"}</td>
                                            <td>{host?.user?.email || "N/A"}</td>
                                            <td>{host?.user?.phone || "N/A"}</td>
                                            <td className={styles.propertyCountCell}>
                                                <span className={styles.propertyCount}>
                                                    {host.hostProperties.length}
                                                </span>

                                                <button
                                                    onClick={() => handleViewProperties(host)}
                                                    className={styles.viewButton}
                                                >
                                                    Property
                                                </button>
                                            </td>

                                            <td>
                                                <span
                                                    className={`${styles.statusBadge} ${host.isBanned
                                                        ? styles.statusBanned
                                                        : styles.statusActive
                                                        }`}
                                                >
                                                    {host.isBanned ? "Banned" : "Active"}
                                                </span>
                                            </td>


                                            <td className="">
                                                <button
                                                    onClick={() => {
                                                        setSelectedHost(host);
                                                        setHostProfileModel(true);
                                                    }}
                                                    className={styles.profileButton}
                                                >
                                                    Profile
                                                </button>

                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleViewAdminDetails(host)}
                                                    className={`${styles.statusBadge} ${host.verificationStatus === "Verified"
                                                        ? styles.statusVerified
                                                        : host.verificationStatus === "Reverified"
                                                            ? styles.statusReverified
                                                            : host.verificationStatus === "Rejected"
                                                                ? styles.statusRejected
                                                                : styles.statusPending
                                                        }`}
                                                >
                                                    {host.verificationStatus}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
                }
                {/* propertyModel */}
                {
                    isModalOpen && propertyModel && (
                        <div className={styles.propertyCard}>
                            <div className={`${styles.modalCard} animate-slide-up`}>
                                <button onClick={handleCloseModal}
                                    className={styles.closeButton}
                                >
                                    &times;
                                </button>
                            </div>
                            <h3 className={styles.modalTitle}>
                                Owened Property {propertyModel.name}
                            </h3>
                            {
                                propertyModel?.Properties?.length > 0 ? (
                                    <div className={styles.cardGrid}>
                                        {propertyModel.Properties.map((property, idx) => (
                                            <div key={property._id || idx} className={styles.card}>
                                                <img
                                                    src={property.image?.url}
                                                    alt="property"
                                                    className={styles.cardImage}
                                                />
                                                <div className={styles.cardContent}>
                                                    <h4>{property.title}</h4>
                                                    <p>{property.location}</p>
                                                    <p>₹{property.price}</p>
                                                    <p className={styles.postedDate}>
                                                        Posted on: {new Date(property.propertyPostedOn).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={styles.noPropertyText}>
                                        No properties found for this host.
                                    </p>
                                )
                            }

                        </div>
                    )
                }

                {/* 🔹 Admin Details Modal */}
                {
                    adminModal && adminDetails && (
                        <div className={styles.modalBackdrop}>
                            <div className={`${styles.modalCard} animate-slide-up`}>
                                <button
                                    onClick={() => setAdminModal(false)}
                                    className={styles.closeButton}
                                >
                                    &times;
                                </button>

                                <h3 className="text-center mb-3">Admin Verification History</h3>

                                {/* Applied Section */}
                                <p><strong>Host Applied On:</strong> {adminDetails.appliedDate}</p>

                                {/* Verified Section */}
                                {adminDetails.adminVerify && (
                                    <>
                                        <hr />
                                        <h5>✅ Verified By</h5>
                                        <p><strong>Name:</strong> {adminDetails.adminVerify.name}</p>
                                        <p><strong>Email:</strong> {adminDetails.adminVerify.email}</p>
                                        <p><strong>Phone:</strong> {adminDetails.adminVerify.phone}</p>
                                        <p><strong>Note:</strong> {adminDetails.verifyNote}</p>
                                        <p><strong>Date:</strong> {adminDetails.verifiedDate}</p>
                                    </>
                                )}

                                {/* Rejected Section */}
                                {adminDetails.adminReject && (
                                    <>
                                        <hr />
                                        <h5>❌ Rejected By</h5>
                                        <p><strong>Name:</strong> {adminDetails.adminReject.name}</p>
                                        <p><strong>Email:</strong> {adminDetails.adminReject.email}</p>
                                        <p><strong>Phone:</strong> {adminDetails.adminReject.phone}</p>
                                        <p><strong>Reason:</strong> {adminDetails.rejectNote}</p>
                                        <p><strong>Date:</strong> {adminDetails.rejectedDate}</p>
                                    </>
                                )}

                                {/* Reverified Section */}
                                {adminDetails.adminReverify && (
                                    <>
                                        <hr />
                                        <h5>🔁 Reverified By</h5>
                                        <p><strong>Name:</strong> {adminDetails.adminReverify.name}</p>
                                        <p><strong>Email:</strong> {adminDetails.adminReverify.email}</p>
                                        <p><strong>Phone:</strong> {adminDetails.adminReverify.phone}</p>
                                        <p><strong>Note:</strong> {adminDetails.reverifyNote}</p>
                                        <p><strong>Date:</strong> {adminDetails.reverifiedDate}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                }

                {
                    hostProfileModel && selectedHost && (
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
                    )
                }
            </div>
        </div >

    )
}
export default GetAllVerifyHost;