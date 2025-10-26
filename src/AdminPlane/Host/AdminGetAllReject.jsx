import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVerifedHostAction } from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";
import { Spinner } from "react-bootstrap";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";

const GetAllRejectedHost = () => {
    const dispatch = useDispatch();
    const {
        allReject,
        isLoading,
        isError,
        isSuccess,
        message } = useSelector((state) => state.hostverirejpen);


    useEffect(() => {
        dispatch(GetAllVerifedHostAction());

        return () => {
            dispatch(resetPending());
        }
    }, [dispatch]);

    return (
        <div>
            <h3>All Verify Host</h3>
            <p>Total Verifed Host : <strong>{allReject.length}</strong></p>

            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-danger">Error: {message}</p>}

            {isSuccess && allReject.length === 0 && (
                <p className="text-muted">No verifed hosts found.</p>
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
                                <th>Status</th>
                                <th>Reject</th>
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
                                        <td><td className="text-center">
                                            <button
                                                // onClick={() => handleViewProperties(host)}
                                                className={styles.viewButton}
                                            >
                                                View
                                            </button>
                                        </td></td>
                                        {host.isBanned ? "Banned" : "Active"}
                                        <td>{host.verificationStatus}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleViewHost(host)}
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
        </div>
    )
}
export default GetAllRejectedHost;