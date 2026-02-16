import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/Host/adminCurrentActive.module.css";
import { Card} from "react-bootstrap";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";
import { getAllActiveHostRegister } from "../../config/redux/action/adminHostAction";
import AdminBannedUserModal from "../BannedUser/AdminBannedUserModal";
import CustomSpinner from "../../comman/Spinner";

const AdminGetActvieAllHost = () => {
    const dispatch = useDispatch();
    const [selectedHost, setSelectedHost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    const {
        allActiveHosts,
        allActiveHostsCount,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminHost);

    useEffect(() => {
        dispatch(getAllActiveHostRegister());

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
        <div className={styles.Currentcontainer}>
            <div className={styles.tableWrapper}></div>
            <Card className={styles.summaryCard}>
                <Card.Body>
                    <h3>Total Current Active Hosts</h3>
                    <h5>Total Active Hosts :  <span className={styles.totalPendingCount}>{allActiveHostsCount}</span></h5>
                </Card.Body>

            </Card>

            {isLoading && (
                <div >
                    <CustomSpinner />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-red-500">Error: {message}</p>}
            {isSuccess && allActiveHosts.length === 0 && (
                <p className={styles.noactiveHostFound}>No Active hosts found.</p>
            )}

            {!isLoading && allActiveHosts.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Created At</th>
                                <th>Properties</th>
                                <th>Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allActiveHosts.map((host, index) => (
                                <tr key={host._id}>
                                    <td>{index + 1}</td>
                                    <td>{host.name}</td>
                                    <td>{host.email}</td>
                                    <td>{host.phone}</td>
                                    <td>{new Date(host.createdAt).toLocaleDateString()}</td>
                                    <td className={styles.propertyCountCell}>
                                        <span className={styles.propertyCount}>
                                            {host.propertyCount}
                                        </span>

                                        <button
                                            onClick={() => handleViewProperties(host)}
                                            className={styles.viewButton}
                                        >
                                            Property
                                        </button>
                                    </td>
                                    <td> <button
                                       
                                        className={styles.profileButton}
                                    >
                                        Profile
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
            {banModalOpen && selectedUserId && (
                <AdminBannedUserModal
                    userId={selectedUserId}
                    onClose={() => {
                        setBanModalOpen(false);
                        setSelectedUserId(null);
                    }}
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

export default AdminGetActvieAllHost;
