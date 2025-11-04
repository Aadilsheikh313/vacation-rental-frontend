import React, { useEffect, useState } from "react";
import styles from "../../adminStylesModule/adminGetAllHost.module.css";
import { FaUserCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { BiSolidBank } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../utils/toastUtils";
import {
    VerifyOrRejectHostAction,
    GetUserProfileAction,
} from "../../config/redux/action/adminVerifedHostAction";
import VerifiedModal from "./VerifiedModal";
import RejectedModal from "./RejectedModal";
import { useNavigate } from "react-router-dom";

const ProfileModel = ({ user, host }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?._id || host?.user?._id || null;

    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const { userProfile, isLoading } = useSelector(
        (state) => state.verifyRejectPending
    );

    // 🔹 Fetch User Profile when modal opens
    useEffect(() => {
        if (userId) {
            dispatch(GetUserProfileAction(userId));
        }
    }, [dispatch, userId]);


    // 🧭 Data fallback for safety
    const userData = userProfile?.user || user || {};
    const hostData = userProfile?.hostDetails && Object.keys(userProfile.hostDetails).length > 0
        ? userProfile.hostDetails
        : host || {};

    const handleVerify = async (note) => {
        try {
            await dispatch(
                VerifyOrRejectHostAction({ hostId: hostData._id, action: "verify", note })
            );
            showSuccess("✅ Host verified successfully!");
            navigate("/host-users");
        } catch {
            showError("❌ Failed to verify host!");
        }
    };

    const handleReject = async (note) => {
        try {
            await dispatch(
                VerifyOrRejectHostAction({ hostId: hostData._id, action: "reject", note })
            );
            showSuccess("🚫 Host rejected successfully!");
            navigate("/host-users");
        } catch {
            showError("❌ Failed to reject host!");
        }
    };

    if (isLoading) return <p>Loading host details...</p>;
    if (!userData._id) return <p>No user details found!</p>;

    return (
        <div>
            <h3 className={styles.modalTitle}>Host Details — {userData.name}</h3>

            <div className={styles.modalContent}>
                {/* ===================== BASIC INFO ===================== */}
                <section className={styles.section}>
                    <h4><FaUserCircle /> Basic Info</h4>

                    <img
                        src={
                            userData.avatar?.url ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="User Profile"
                        className={styles.imagePreview}
                    />

                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Gender:</strong> {userData.gender || "Not provided"}</p>
                    <p><strong>Bio:</strong> {userData.bio || "No bio available"}</p>
                    <p>
                        <strong>DOB:</strong>{" "}
                        {userData.dob
                            ? new Date(userData.dob).toLocaleDateString()
                            : "Not provided"}
                    </p>
                    <p><strong>Location:</strong> {userData.location || "Not specified"}</p>
                    <p>
                        <strong>Verification Status:</strong>{" "}
                        {hostData.verificationStatus || "N/A"}
                    </p>
                    <p>
                        <strong>Admin Note:</strong>{" "}
                        {hostData.adminNote || "No admin note available"}
                    </p>
                </section>

                {/* ===================== GOVT ID ===================== */}
                <section className={styles.section}>
                    <h4><HiIdentification /> Government ID</h4>
                    <p><strong>ID Type:</strong> {hostData.governmentID || "N/A"}</p>
                    <p><strong>ID Number:</strong> {hostData.governmentIDNumber || "N/A"}</p>

                    {hostData?.governmentIDImage?.url ? (
                        <img
                            src={hostData.governmentIDImage.url}
                            alt="Government ID"
                            className={styles.imagePreview}
                        />
                    ) : (
                        <p>No government ID image available</p>
                    )}

                </section>

                {/* ===================== BANK DETAILS ===================== */}
                <section className={styles.section}>
                    <h4><BiSolidBank /> Bank Details</h4>
                    <p>
                        <strong>Account Holder:</strong>{" "}
                        {hostData?.payout?.bankDetails?.accountHolderName || "N/A"}
                    </p>
                    <p>
                        <strong>Account Number:</strong>{" "}
                        {hostData?.payout?.bankDetails?.accountNumber || "N/A"}
                    </p>
                    <p>
                        <strong>IFSC:</strong>{" "}
                        {hostData?.payout?.bankDetails?.ifscCode || "N/A"}
                    </p>
                    <p>
                        <strong>Bank Name:</strong>{" "}
                        {hostData?.payout?.bankDetails?.bankName || "N/A"}
                    </p>
                    <p>
                        <strong>Branch:</strong>{" "}
                        {hostData?.payout?.bankDetails?.branchName || "N/A"}
                    </p>

                    {hostData?.cancelledChequeImage?.url ? (
                        <img
                            key={hostData.cancelledChequeImage.url}
                            src={hostData.cancelledChequeImage.url}
                            alt="Cancelled Cheque"
                            className={styles.imagePreview}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/150?text=Cheque+Unavailable";
                            }}
                        />
                    ) : (
                        <p>No cancelled cheque uploaded</p>
                    )}

                </section>

                {/* ===================== UPI / QR ===================== */}
                <section className={styles.section}>
                    <h4><BsQrCodeScan /> UPI / QR Code</h4>
                    <p><strong>UPI ID:</strong> {hostData?.payout?.upiId || "N/A"}</p>


                    {hostData?.payout?.qrCodeUrl ? (
                        <img
                            src={hostData.payout.qrCodeUrl}
                            alt="QR Code"
                            className={styles.imagePreview}
                        />
                    ) : (
                        <p>No QR code uploaded</p>
                    )}
                </section>

                {/* ===================== RATINGS / EARNINGS ===================== */}
                <section className={styles.section}>
                    <h4><MdVerifiedUser /> Host Performance</h4>
                    <p>
                        <strong>Average Rating:</strong>{" "}
                        {hostData?.rating?.avgRating || 0} ⭐
                    </p>
                    <p>
                        <strong>Total Reviews:</strong>{" "}
                        {hostData?.rating?.totalReviews || 0}
                    </p>
                    <p>
                        <strong>Total Earnings:</strong> ₹
                        {hostData?.earnings?.totalEarnings || 0}
                    </p>
                </section>

                {/* ===================== ACTION BUTTONS ===================== */}
                {hostData.verificationStatus === "pending" && (
                    <div className={styles.actionButtons}>
                        <Button variant="success" onClick={() => setShowVerifyModal(true)}>
                            <MdVerifiedUser /> Verify
                        </Button>
                        <Button variant="danger" onClick={() => setShowRejectModal(true)}>
                            <IoCloseCircleOutline /> Reject
                        </Button>
                    </div>
                )}
            </div>

            {/* ===================== MODALS ===================== */}
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
