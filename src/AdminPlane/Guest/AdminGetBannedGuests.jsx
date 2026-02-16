import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/Guest/adminbannedguest.module.css";
import { Card, Spinner } from "react-bootstrap";
import AdminBannedUserModal from "../BannedUser/AdminBannedUserModal";
import { resetAdminGuesttState } from "../../config/redux/reducer/adminGuestReducer";
import { getAllBannedGuest } from "../../config/redux/action/adminGuestAction";


const AdminGetBannedGuest = () => {
    const dispatch = useDispatch();
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isBanned, setIsBanned] = useState(false);

    const {
        bannedGuests,
        bannedGuestsCount,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminGuest);

    useEffect(() => {
        dispatch(getAllBannedGuest());

        return () => {
            dispatch(resetAdminGuesttState());
        };
    }, [dispatch]);

    const handleViewProperties = (guest) => {
        setSelectedGuest(guest);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGuest(null);
    };

    return (
        <div className={styles.bannedGuestsContainer}>
            <div className={styles.tableWrapper}>
            <Card className={styles.summaryCard}>
                <Card.Body>
                    <h3>Total Banned Guest : <span>{bannedGuestsCount}</span></h3>
                </Card.Body>
            </Card>


            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-red-500">Error: {message}</p>}
            {isSuccess && bannedGuests.length === 0 && (
                <p className="text-gray-600">No Banned  Guests Found.</p>
            )}

            {!isLoading && bannedGuests.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Created At</th>
                                <th>Total Booking</th>
                                <th>View</th>
                                <th>Active/Banned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedGuests.map((guest, index) => (
                                <tr key={guest._id}>
                                    <td>{index + 1}</td>
                                    <td>{guest.name}</td>
                                    <td>{guest.email}</td>
                                    <td>{guest.phone}</td>
                                    <td>{new Date(guest.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">{guest.totalBookings}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleViewProperties(guest)}
                                            className={styles.viewButton}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedUserId(guest._id);
                                                setBanModalOpen(true);
                                                setIsBanned(guest.isBanned);
                                            }}
                                            className="btn btn-sm btn-warning"
                                        >
                                            {guest.isBanned ? "Banned" : "Active"}
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
            {/* Modal */}
            {isModalOpen && selectedGuest && (
                <div className={`${styles.modalBackdrop}`}>
                    <div className={`${styles.modalCard} animate-slide-up`}>
                        <button
                            onClick={handleCloseModal}
                            className={styles.closeButton}
                        >
                            &times;
                        </button>
                        <h3 className={styles.modalTitle}>
                            Properties of {selectedGuest.name}
                        </h3>

                        {selectedGuest?.bookings?.length > 0 ? (
                            <div className={styles.cardGrid}>
                                {selectedGuest.bookings.map((booking, idx) => (
                                    <div key={idx} className={styles.card}>
                                        <img
                                            src={booking.image}
                                            alt="property"
                                            className={styles.cardImage}
                                        />
                                        <div className={styles.cardContent}>
                                            <h4>{booking.propertyTitle}</h4>
                                            <p>Address :{booking.location}</p>
                                            <p>Price: ₹{booking.price}</p>
                                            <p>Booked-On: {new Date(booking.bookedOn).toLocaleDateString()}</p>
                                            <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                                            <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                                            <p>Status: {booking.status}</p>
                                        </div>
                                        <hr />
                                        <div className={styles.ownerInfo}>
                                            <h5>Property Owner</h5>
                                            <p><strong>Name:</strong> {booking.host?.name || "N/A"}</p>
                                            <p><strong>Email:</strong> {booking.host?.email || "N/A"}</p>
                                            <p><strong>Phone:</strong> {booking.host?.phone || "N/A"}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noPropertyText}>No properties found for this guest booking.</p>
                        )}

                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default AdminGetBannedGuest;
