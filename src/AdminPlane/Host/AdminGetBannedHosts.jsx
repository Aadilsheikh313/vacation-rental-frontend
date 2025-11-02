import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import { Card, Spinner } from "react-bootstrap";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";
import { getAllBannedHostRegister } from "../../config/redux/action/adminHostAction";
import AdminBannedUserModal from "../BannedUser/AdminBannedUserModal";


const AdminGetBannedAllHost = () => {
    const dispatch = useDispatch();
    const [selectedHost, setSelectedHost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBannedHost, setSelectedBannedHost] = useState(null); 
    const [isBanModalOpen, setIsBanModalOpen] = useState(false); 


    const {
        bannedHosts,
        totalBannedHostsCount,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminHost);

    useEffect(() => {
        dispatch(getAllBannedHostRegister());

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
    const handleBanModalOpen = (host) => {
        setSelectedBannedHost(host);
        setIsBanModalOpen(true);
    };
    const handleBanModalClose = () => {
        setSelectedBannedHost(null);
        setIsBanModalOpen(false);
    };


    return (
        <div className="p-4">

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Total Banned Registered Hosts</Card.Title>
                    <Card.Text>{totalBannedHostsCount}</Card.Text>
                </Card.Body>
            </Card>

            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-red-500">Error: {message}</p>}
            {isSuccess && bannedHosts.length === 0 && (
                <p className="text-gray-600">No Banned hosts found.</p>
            )}

            {!isLoading && bannedHosts.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Created At</th>
                                <th>Total Properties</th>
                                <th>View</th>
                                <th>Banned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedHosts.map((host, index) => (
                                <tr key={host._id}>
                                    <td>{index + 1}</td>
                                    <td>{host.name}</td>
                                    <td>{host.email}</td>
                                    <td>{host.phone}</td>
                                    <td>{new Date(host.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">{host.propertyCount}</td>
                                    <td className="text-center">
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
                                            onClick={() => handleBanModalOpen(host)}
                                        >
                                            Ban/Unban
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
            {isBanModalOpen && selectedBannedHost && (
                <AdminBannedUserModal
                    userId={selectedBannedHost._id}
                    isBanned={selectedBannedHost.isBanned}
                    onClose={handleBanModalClose}
                />
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
                                        <button> Active  & Unactive</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noPropertyText}>No properties found for this host.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGetBannedAllHost;
