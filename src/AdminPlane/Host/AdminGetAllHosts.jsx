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
                                        {host?.verificationStatus}
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

        </div>
    );
};

export default AdminGetAllHost;
