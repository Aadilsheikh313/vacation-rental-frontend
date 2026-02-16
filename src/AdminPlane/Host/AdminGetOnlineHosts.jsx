import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/Host/adminOnline.module.css";
import { Card, Spinner } from "react-bootstrap";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";
import { getAllOnlineHostRegister } from "../../config/redux/action/adminHostAction";
import CustomSpinner from "../../comman/Spinner";


const AdminGetOnlineAllHost = () => {
    const dispatch = useDispatch();
    const [selectedHost, setSelectedHost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        onlineHosts,
        totalOnlineHostsCount,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminHost);

    useEffect(() => {
        dispatch(getAllOnlineHostRegister());

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
        <div className={styles.onlineConatiner}>
            <div className={styles.tableWrapper}>

                <Card className={styles.summaryCard}>
                    <Card.Body>
                        <h5>Total Online Registered Hosts:  <span className={styles.totalPendingCount}>{totalOnlineHostsCount}</span></h5>
                    </Card.Body>
                </Card>

                {isLoading && (
                    <div >
                        <CustomSpinner/>
                        <p>Loading...</p>
                    </div>
                )}

                {isError && <p className="text-red-500">Error: {message}</p>}
                {isSuccess && onlineHosts.length === 0 && (
                    <p className={styles.nohostFound}>No Online hosts found.</p>
                )}

                {!isLoading && onlineHosts.length > 0 && (
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
                                </tr>
                            </thead>
                            <tbody>
                                {onlineHosts.map((host, index) => (
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
        </div>
    );
};

export default AdminGetOnlineAllHost;
