import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/Host/adminGetAllHost.module.css";
import { Card } from "react-bootstrap";
import {
    GetAllHostPendingAction,
} from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";
import ProfileModel from "./HostProfileDetials";
import CustomSpinner from "../../comman/Spinner";

const AdminGetNewAllHost = () => {
    const dispatch = useDispatch();
    const [selectedHost, setSelectedHost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hostProfileModel, setHostProfileModel] = useState(false);
    const {
        allPendingHost,
        TotalPending,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.verifyRejectPending);

    useEffect(() => {
        dispatch(GetAllHostPendingAction());

        return () => {
            dispatch(resetPending());
        };
    }, [dispatch]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHost(null);
    };

    return (
        <div className={styles.GetallHostConatiner}>
            <Card className={styles.summaryCard}>
                <Card.Body>
                    <h5>Total Pending Registered Hosts : <span className={styles.totalPendingCount}>{TotalPending}</span></h5>
                </Card.Body>
            </Card>

            {isLoading && (
                <div >
                    <CustomSpinner />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className={styles.noPendingHostserror}>Error: {message}</p>}

            {isSuccess && allPendingHost.length === 0 && (
                <p className={styles.noPendingHosts}>No pending hosts found.</p>
            )}

            {!isLoading && allPendingHost.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPendingHost.map((host, index) => (
                                <tr key={host._id}>
                                    <td>{index + 1}</td>
                                    <td>{host.user.name}</td>
                                    <td>{host.user.email}</td>
                                    <td>{host.user.phone}</td>
                                    <td>{host.verificationStatus}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setSelectedHost(host);
                                                setHostProfileModel(true);
                                            }}
                                            className={styles.profileButton}
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
        </div>
    );
};

export default AdminGetNewAllHost;
