import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostRegister } from "../../config/redux/action/adminHostAction";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import { Spinner } from "react-bootstrap";
import AdminBannedUserModal from "../BannedUser/AdminBannedUserModal";
import AdminTogglePropertyModal from "../BannedProprty/AdminBanPropertyModel";
import ProfileModel from "./HostProfileDetials";

const AdminGetAllHost = () => {
    const dispatch = useDispatch();
    const [selectedHost, setSelectedHost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isBanned, setIsBanned] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [propertyActionModalOpen, setPropertyActionModalOpen] = useState(false);
    const [hostProfile, setHostProfile] = useState(false);

    // 🔹 New state for admin details modal
    const [adminModal, setAdminModal] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);

    const {
        allHosts,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminHost);

    useEffect(() => {
        dispatch(getAllHostRegister());

        return () => {
            dispatch(resetAdminHostState());
        };
    }, [dispatch]);

    const handleViewProperties = (host) => {
        setSelectedHost(host);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHost(null);
    };

    // 🔹 Handle verificationStatus click — show admin verification details
    const handleViewAdminDetails = (host) => {
        if (!host.audit || host.audit.length === 0) {
            alert("No audit data available for this host.");
            return;
        }

        // Find different actions from audit logs
        const appliedAudit = host.audit.find((a) => a.action === "applied");
        const verifiedAudit = host.audit.find((a) => a.action === "verified");
        const rejectedAudit = host.audit.find((a) => a.action === "rejected");
        const reverifiedAudit = host.audit.find((a) => a.action === "reverified");

        // Format clean details object
        const details = {
            applied: appliedAudit
                ? {
                    date: new Date(appliedAudit.date).toLocaleString(),
                    note: appliedAudit.note,
                }
                : null,
            verified: verifiedAudit
                ? {
                    admin: verifiedAudit.adminDetails,
                    date: new Date(verifiedAudit.date).toLocaleString(),
                    note: verifiedAudit.note,
                }
                : null,
            rejected: rejectedAudit
                ? {
                    admin: rejectedAudit.adminDetails,
                    date: new Date(rejectedAudit.date).toLocaleString(),
                    note: rejectedAudit.note,
                }
                : null,
            reverified: reverifiedAudit
                ? {
                    admin: reverifiedAudit.adminDetails,
                    date: new Date(reverifiedAudit.date).toLocaleString(),
                    note: reverifiedAudit.note,
                }
                : null,
            status: host.verificationStatus,
        };

        setAdminDetails(details);
        setAdminModal(true);
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Registered Hosts: {allHosts.length}</h2>

            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-red-500">Error: {message}</p>}
            {isSuccess && allHosts.length === 0 && (
                <p className="text-gray-600">No hosts found.</p>
            )}

            {!isLoading && allHosts.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Created At</th>
                                <th>Total Properties</th>
                                <th>View</th>
                                <th>Active/Banned</th>
                                <th>Verifiy/Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allHosts.map((host, index) => (
                                <tr key={host.hostId || index}>
                                    <td title={host?.hostId}>
                                        {host?.hostId ? host.hostId.slice(0, 4) + "..." : "N/A"}
                                    </td>
                                    <td>{host?.user?.name || "N/A"}</td>
                                    <td>{host?.user?.email || "N/A"}</td>
                                    <td>{host?.user?.phone || "N/A"}</td>
                                    <td>{host?.user?.createdAt ? new Date(host.user.createdAt).toLocaleDateString() : "N/A"}</td>
                                    <td
                                        className="text-center">{host.propertyCount}
                                        <button
                                            onClick={() => handleViewProperties(host)}
                                            className={styles.viewButton}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className={styles.viewButton}
                                            onClick={() => {
                                                setSelectedHost(host);
                                                setHostProfile(true);
                                            }}
                                        >
                                            Profile
                                        </button>
                                    </td>

                                    <td className="text-center">
                                        {host.user ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedUserId(host.user._id);
                                                    setBanModalOpen(true);
                                                    setIsBanned(host.isBanned || false);
                                                }}
                                                className="btn btn-sm btn-warning"
                                            >
                                                {host.isBanned ? "Banned" : "Active"}
                                            </button>
                                        ) : (
                                            <span className="text-gray-400">No user</span>
                                        )}

                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleViewAdminDetails(host)}
                                            className={styles.viewButton}
                                        >
                                            {host.verificationStatus}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

            {banModalOpen && selectedUserId && (
                <AdminBannedUserModal
                    userId={selectedUserId}
                    isBanned={isBanned} // <-- pass here
                    onClose={() => {
                        setBanModalOpen(false);
                        setSelectedUserId(null);
                    }}
                />
            )}

            {propertyActionModalOpen && selectedProperty && (
                <div className={`${styles.modalCard} animate-slide-up`}>
                    <AdminTogglePropertyModal
                        property={selectedProperty}
                        onClose={() => {
                            setPropertyActionModalOpen(false);
                            setSelectedProperty(null);
                        }}
                    />
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedHost && (
                <div className={`${styles.modalBackdrop}`}>
                    <div className={`${styles.modalCard} animate-slide-up`}>
                        <button
                            onClick={handleCloseModal}
                            className={styles.closeButton}
                        >
                            &times;
                        </button>
                        <h3 className={styles.modalTitle}>
                            Properties of {selectedHost.name}
                        </h3>

                        {selectedHost?.properties?.length > 0 ? (
                            <div className={styles.cardGrid}>
                                {selectedHost.properties.map((property, idx) => (
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
                                            <p>{property.expired}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedProperty(property);
                                                setPropertyActionModalOpen(true);
                                            }}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {property.expired ? "Inactive" : "Active"}
                                        </button>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noPropertyText}>No properties found for this host.</p>
                        )}
                    </div>
                </div>
            )}



            {hostProfile && selectedHost && (
                <div className={styles.modalBackdrop}>
                    <div className={`${styles.modalCard} animate-slide-up`}>
                        <button
                            onClick={() => setHostProfile(false)}
                            className={styles.closeButton}
                        >
                            &times;
                        </button>
                        <ProfileModel user={selectedHost.user} host={selectedHost} userId={selectedHost.user._id} />
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

                        <h3 className="text-center mb-3">🛠 Host Verification History</h3>

                        {adminDetails.applied && (
                            <>
                                <h5>📤 Applied</h5>
                                <p><strong>Date:</strong> {adminDetails.applied.date}</p>
                                <p><strong>Note:</strong> {adminDetails.applied.note}</p>
                                <hr />
                            </>
                        )}

                        {adminDetails.verified && (
                            <>
                                <h5>✅ Verified By</h5>
                                <p><strong>Name:</strong> {adminDetails.verified.admin?.name}</p>
                                <p><strong>Email:</strong> {adminDetails.verified.admin?.email}</p>
                                <p><strong>Phone:</strong> {adminDetails.verified.admin?.phone}</p>
                                <p><strong>Date:</strong> {adminDetails.verified.date}</p>
                                <p><strong>Note:</strong> {adminDetails.verified.note}</p>
                                <hr />
                            </>
                        )}

                        {adminDetails.rejected && (
                            <>
                                <h5>❌ Rejected By</h5>
                                <p><strong>Name:</strong> {adminDetails.rejected.admin?.name}</p>
                                <p><strong>Email:</strong> {adminDetails.rejected.admin?.email}</p>
                                <p><strong>Phone:</strong> {adminDetails.rejected.admin?.phone}</p>
                                <p><strong>Date:</strong> {adminDetails.rejected.date}</p>
                                <p><strong>Reason:</strong> {adminDetails.rejected.note}</p>
                                <hr />
                            </>
                        )}

                        {adminDetails.reverified && (
                            <>
                                <h5>🔁 Reverified By</h5>
                                <p><strong>Name:</strong> {adminDetails.reverified.admin?.name}</p>
                                <p><strong>Email:</strong> {adminDetails.reverified.admin?.email}</p>
                                <p><strong>Phone:</strong> {adminDetails.reverified.admin?.phone}</p>
                                <p><strong>Date:</strong> {adminDetails.reverified.date}</p>
                                <p><strong>Note:</strong> {adminDetails.reverified.note}</p>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminGetAllHost;
