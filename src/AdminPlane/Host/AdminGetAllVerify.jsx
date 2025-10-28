import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVerifedHostAction } from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";
import { Spinner } from "react-bootstrap";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import ProfileModel from "./HostProfileDetials";

const GetAllVerifyHost = () => {
    const dispatch = useDispatch();
    const {
        allVerifed,
        isLoading,
        isError,
        isSuccess,
        message } = useSelector((state) => state.hostverirejpen);

    const [propertyModel, setPropertyModel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hostProfileModel, setHostProfileModel] = useState(false);
    const [selectedHost, setSelectedHost] = useState(null);


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

    return (
        <div>
            <h3>All Verify Host</h3>
            <p>Total Verifed Host : <strong>{allVerifed.length}</strong></p>

            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-danger">Error: {message}</p>}

            {isSuccess && allVerifed.length === 0 && (
                <p className="text-muted">No verifed hosts found.</p>
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
                                <th>Verify</th>
                                <th>View</th>
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

                                        <td className="text-center">
                                            {host.propertyCount}
                                            <button
                                                onClick={() => handleViewProperties(host)}
                                                className={styles.viewButton}
                                            >
                                                Property
                                            </button>
                                        </td>
                                        <td>{host.isBanned ? "Banned" : "Active"}</td>
                                        <td>{host.verificationStatus}</td>
                                        <td className="text-center">
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
            {/* propertyModel */}
            {isModalOpen && propertyModel && (
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
                        propertyModel?.properties?.length > 0 ? (
                            <div className={styles.cardGrid}>
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
                                </div>
                            </div>
                        ) : (
                            <p className={styles.noPropertyText}>No properties found for this host.</p>
                        )}
                </div>
            )
            }

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
        </div >

    )
}
export default GetAllVerifyHost;