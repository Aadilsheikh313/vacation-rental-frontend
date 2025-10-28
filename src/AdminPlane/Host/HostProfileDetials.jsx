import React, { useEffect } from "react";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import { FaUserCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { BiSolidBank } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../utils/toastUtils";
import { VerifyOrRejectHostAction } from "../../config/redux/action/adminVerifedHostAction";
import VerifiedModal from "./VerifiedModal";
import RejectedModal from "./RejectedModal";
import { useState } from "react";


const ProfileModel = ({ user, host }) => {
    const dispatch = useDispatch();
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const handleVerify = async (note) => {
        try {
            await dispatch(VerifyOrRejectHostAction({ hostId: host._id, action: "verify", note }));
            showSuccess("Host verified successfully!");
        } catch (error) {
            showError("Failed to verify host!");
        }
    };

    const handleReject = async (note) => {
        try {
            await dispatch(VerifyOrRejectHostAction({ hostId: host._id, action: "reject", note }));
            showSuccess("Host rejected successfully!");
        } catch (error) {
            showError("Failed to reject host!");
        }
    };

    if (!user || !host) return <p>Loading host details...</p>;

    return (
        <div>
            <h3 className={styles.modalTitle}>
                Host Details — {user.name}
            </h3>

            <div className={styles.modalContent}>
                <section className={styles.section}>
                    <h4><FaUserCircle /> Basic Info</h4>
                    <img
                        src={
                            user.avatar?.url ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="User Profile"
                        className={styles.imagePreview}
                    />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Gender:</strong> {user.gender || "Not provided"}</p>
                    <p><strong>Bio:</strong> {user.bio || "No bio available"}</p>
                    <p>
                        <strong>DOB:</strong>{" "}
                        {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
                    </p>
                    <p><strong>Location:</strong> {user.location || "Not specified"}</p>
                    <p>
                        <strong>Applied At:</strong>{" "}
                        {new Date(host.appliedAt).toLocaleString()}
                    </p>
                    <p><strong>Status:</strong> {host.verificationStatus}</p>
                </section>

                <section className={styles.section}>
                    <h4><HiIdentification /> Government ID</h4>
                    <p><strong>ID Type:</strong> {host.governmentID}</p>
                    <p><strong>ID Number:</strong> {host.governmentIDNumber}</p>
                    <img
                        src={host.governmentIDImage?.url}
                        alt="Government ID"
                        className={styles.imagePreview}
                    />
                </section>

                <section className={styles.section}>
                    <h4><BiSolidBank /> Bank Details</h4>
                    <p><strong>Account Holder:</strong> {host.payout.bankDetails.accountHolderName}</p>
                    <p><strong>Account Number:</strong> {host.payout.bankDetails.accountNumber}</p>
                    <p><strong>IFSC:</strong> {host.payout.bankDetails.ifscCode}</p>
                    <p><strong>Bank Name:</strong> {host.payout.bankDetails.bankName}</p>
                    <p><strong>Branch:</strong> {host.payout.bankDetails.branchName}</p>

                    <img
                        src={host.cancelledChequeImage?.url}
                        alt="Cancelled Cheque"
                        className={styles.imagePreview}
                    />
                </section>

                <section className={styles.section}>
                    <h4><BsQrCodeScan /> UPI / QR Code</h4>
                    <p><strong>UPI ID:</strong> {host.payout.upiId}</p>
                    <img
                        src={host.qrCode?.url}
                        alt="QR Code"
                        className={styles.imagePreview}
                    />
                </section>
                {host.verificationStatus == "pending" ? (
                    <div className={styles.actionButtons}>
                        <Button variant="success" onClick={() => setShowVerifyModal(true)}>
                            <MdVerifiedUser /> Verify
                        </Button>
                        <Button variant="danger" onClick={() => setShowRejectModal(true)}>
                            <IoCloseCircleOutline /> Reject
                        </Button>
                    </div>
                ) : (
                    <>  </>
                )}

            </div>

             {/* Modals */}
      <VerifiedModal
        show={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        onSubmit={handleVerify}
      />
      <RejectedModal
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onSubmit={handleReject}
      />
        </div>
    );
};

export default ProfileModel;