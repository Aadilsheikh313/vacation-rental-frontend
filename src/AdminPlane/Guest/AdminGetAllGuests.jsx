import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminGetAllGuest.module.css";
import { Spinner } from "react-bootstrap";
import { getAllGuestRegister } from "../../config/redux/action/adminGuestAction";
import { resetAdminGuesttState } from "../../config/redux/reducer/adminGuestReducer";
import AdminBannedUserModal from "../BannedUser/AdminBannedUserModal";

const AdminGetAllGuest = () => {
    const dispatch = useDispatch();
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banModalOpen, setBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isBanned, setIsBanned] = useState(false);

    const {
        allGuests,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.adminGuest);

    useEffect(() => {
        dispatch(getAllGuestRegister());

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
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Registered Guests</h2>

            {isLoading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                </div>
            )}

            {isError && <p className="text-red-500">Error: {message}</p>}
            {isSuccess && allGuests.length === 0 && (
                <p className="text-gray-600">No guests found.</p>
            )}

            {!isLoading && allGuests.length > 0 && (
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
                                <th>Active/Banned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allGuests.map((guest, index) => (
                                <tr key={guest._id}>
                                    <td>{index + 1}</td>
                                    <td>{guest.name}</td>
                                    <td>{guest.email}</td>
                                    <td>{guest.phone}</td>
                                    <td>{new Date(guest.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">{guest.propertyCount}</td>
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

                        {selectedGuest?.properties?.length > 0 ? (
  <div className={styles.cardGrid}>
    {selectedGuest.properties.map((property, idx) => (
      <div key={idx} className={styles.card}>
        <img
          src={property.image}
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
  <p className={styles.noPropertyText}>No properties found for this guest booking.</p>
)}

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGetAllGuest;
