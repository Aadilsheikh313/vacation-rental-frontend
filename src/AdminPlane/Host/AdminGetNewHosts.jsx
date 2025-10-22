import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import { Card, Spinner, Modal, Button } from "react-bootstrap";
import { GetAllHostPendingAction } from "../../config/redux/action/adminVerifedHostAction";
import { resetPending } from "../../config/redux/reducer/adminVerifedHostReducer";

const AdminGetNewAllHost = () => {
  const dispatch = useDispatch();
  const [selectedHost, setSelectedHost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    allPendingHost,
    TotalPending,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.hostverirejpen);

  useEffect(() => {
    dispatch(GetAllHostPendingAction());

    return () => {
      dispatch(resetPending());
    };
  }, [dispatch]);

  const handleViewHost = (host) => {
    setSelectedHost(host);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHost(null);
  };

  // ========== Handle Verify / Reject ==========
  const handleVerifyHost = () => {
    alert(`✅ Host "${selectedHost.user.name}" verified successfully!`);
    // TODO: dispatch(verifyHostAction(selectedHost._id));
    handleCloseModal();
  };

  const handleRejectHost = () => {
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      alert(`❌ Host "${selectedHost.user.name}" rejected.\nReason: ${reason}`);
      // TODO: dispatch(rejectHostAction(selectedHost._id, reason));
      handleCloseModal();
    }
  };

  return (
    <div className="p-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Total Pending Registered Hosts</Card.Title>
          <Card.Text className="fw-bold text-primary">{TotalPending}</Card.Text>
        </Card.Body>
      </Card>

      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}

      {isError && <p className="text-danger">Error: {message}</p>}

      {isSuccess && allPendingHost.length === 0 && (
        <p className="text-muted">No pending hosts found.</p>
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
                <th>View</th>
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
                  <td className="text-center">
                    <button
                      onClick={() => handleViewHost(host)}
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

      {/* ======= Modal for Host Details ======= */}
      {isModalOpen && selectedHost && (
        <div className={styles.modalBackdrop}>
          <div className={`${styles.modalCard} animate-slide-up`}>
            <button
              onClick={handleCloseModal}
              className={styles.closeButton}
            >
              &times;
            </button>

            <h3 className={styles.modalTitle}>
              Host Details — {selectedHost.user.name}
            </h3>

            <div className={styles.modalContent}>
              <section className={styles.section}>
  <h4>👤 Basic Info</h4>
  <img
    src={
      selectedHost.user.avatar?.url ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    alt="User Profile"
    className={styles.imagePreview}
  />
  <p><strong>Name:</strong> {selectedHost.user.name}</p>
  <p><strong>Email:</strong> {selectedHost.user.email}</p>
  <p><strong>Phone:</strong> {selectedHost.user.phone}</p>
  <p><strong>Gender:</strong> {selectedHost.user.gender || "Not provided"}</p>
  <p><strong>Bio:</strong> {selectedHost.user.bio || "No bio available"}</p>
  <p>
    <strong>DOB:</strong>{" "}
    {selectedHost.user.dob
      ? new Date(selectedHost.user.dob).toLocaleDateString()
      : "Not provided"}
  </p>
  <p><strong>Location:</strong> {selectedHost.user.location || "Not specified"}</p>
  <p>
    <strong>Applied At:</strong>{" "}
    {new Date(selectedHost.appliedAt).toLocaleString()}
  </p>
  <p><strong>Status:</strong> {selectedHost.verificationStatus}</p>
</section>


              <section className={styles.section}>
                <h4>🪪 Government ID</h4>
                <p><strong>ID Type:</strong> {selectedHost.governmentID}</p>
                <p><strong>ID Number:</strong> {selectedHost.governmentIDNumber}</p>
                <img
                  src={selectedHost.governmentIDImage?.url}
                  alt="Government ID"
                  className={styles.imagePreview}
                />
              </section>

              <section className={styles.section}>
                <h4>🏦 Bank Details</h4>
                <p><strong>Account Holder:</strong> {selectedHost.payout.bankDetails.accountHolderName}</p>
                <p><strong>Account Number:</strong> {selectedHost.payout.bankDetails.accountNumber}</p>
                <p><strong>IFSC:</strong> {selectedHost.payout.bankDetails.ifscCode}</p>
                <p><strong>Bank Name:</strong> {selectedHost.payout.bankDetails.bankName}</p>
                <p><strong>Branch:</strong> {selectedHost.payout.bankDetails.branchName}</p>

                <img
                  src={selectedHost.cancelledChequeImage?.url}
                  alt="Cancelled Cheque"
                  className={styles.imagePreview}
                />
              </section>

              <section className={styles.section}>
                <h4>💸 UPI / QR Code</h4>
                <p><strong>UPI ID:</strong> {selectedHost.payout.upiId}</p>
                <img
                  src={selectedHost.qrCode?.url}
                  alt="QR Code"
                  className={styles.imagePreview}
                />
              </section>

              <div className={styles.actionButtons}>
                <Button variant="success" onClick={handleVerifyHost}>
                  ✅ Verify
                </Button>
                <Button variant="danger" onClick={handleRejectHost}>
                  ❌ Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGetNewAllHost;
