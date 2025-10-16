import { useEffect, useState } from "react";
import styles from "../stylesModule/UserProfile/userProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { profilereset } from "../config/redux/reducer/userReducer";
import {
  userProfileAction,
  userProfileUpdateAction,
} from "../config/redux/action/userAction";
import CustomSpinner from "../comman/Spinner";
import { FaCheckCircle, FaClock, FaRegHeart, FaTimesCircle, FaUserEdit } from "react-icons/fa";
import { MdOutlineAddAPhoto, MdOutlineEdit } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    userProfile: user,
    Host,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.userProfile);
  const { token } = useSelector((state) => state.auth);

  const tokenObj = { token };

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    dob: "",
    gender: "",
    location: "",
    avatar: null,
  });

  // ✅ Get user profile on mount
  useEffect(() => {
    if (tokenObj.token) {
      dispatch(userProfileAction(tokenObj));
    }
    return () => dispatch(profilereset());
  }, [dispatch, token]);

  // ✅ Set form data after user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
        dob: user.dob || "",
        gender: user.gender || "",
        location: user.location || "",
        avatar: null,
      });
    }
  }, [user]);

  // ✅ Handle avatar upload
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
      handleSubmit({ avatar: e.target.files[0] });
    }
  };

  // ✅ Generic Submit Function (field-wise)
  const handleSubmit = async (updatedField = null) => {
    const updatedFormData = new FormData();

    // Append only updated field or all data if null
    if (updatedField) {
      const key = Object.keys(updatedField)[0];
      updatedFormData.append(key, updatedField[key]);
    } else {
      Object.keys(formData).forEach((key) => {
        if (formData[key]) updatedFormData.append(key, formData[key]);
      });
    }

    await dispatch(userProfileUpdateAction({ tokenObj, formData: updatedFormData }));
    setEditField(null); // close input after update
  };

  // ✅ Handle field change dynamically
  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={styles.profileContainer}>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <Row>

            <Col md="6">
              <div className={styles.avatarContainer}>
                {user?.avatar?.url ? (
                  <img src={user.avatar.url} alt="Avatar" className={styles.navAvatar} />
                ) : (
                  <div className={styles.navAvatarPlaceholder}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="avatarInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <MdOutlineAddAPhoto
                  className={styles.addPhotoIcon}
                  title="Update Avatar"
                  onClick={() => document.getElementById("avatarInput").click()}
                />
              </div>
            </Col>
            <Col md="6">
              {user?.role === "host" && (
                <>
                  <div className={styles.verifiAndRejectdate}>
                    <div className={styles.hostLeft}>
                      {Host?.verificationStatus === "verified" ? (
                        <>
                          <FaCheckCircle color="#4CAF50" size={22} />
                          <div>
                            <h4 className={styles.colorChangeHeading}>Verification Successful</h4>
                            <p><strong>Status:</strong> Verified</p>
                            <p>
                              <strong>Date:</strong>{" "}
                              {Host?.verifiedAt
                                ? new Date(Host.verifiedAt).toLocaleString()
                                : new Date(Host.updatedAt || Host.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </>
                      ) : Host?.verificationStatus === "rejected" ? (
                        <>
                          <FaTimesCircle color="#E53935" size={22} />
                          <div>
                            <h4 className={styles.colorChangeHeading}>Verification Rejected</h4>
                            <p><strong>Status:</strong> Rejected</p>
                            <p>
                              <strong>Date:</strong>{" "}
                              {Host?.rejectedAt
                                ? new Date(Host.rejectedAt).toLocaleString()
                                : new Date(Host.updatedAt || Host.createdAt).toLocaleString()}
                            </p>
                            <p><strong>Reason:</strong> {Host?.rejectedReason || "Not specified"}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <FaClock color="#FFB300" size={22} />
                          <div>
                            <h4 className={styles.colorChangeHeading}>Verification Pending</h4>
                            <p><strong>Status:</strong> Waiting for admin approval</p>
                            <p>
                              <strong>Last Updated:</strong>{" "}
                              {Host?.updatedAt
                                ? new Date(Host.updatedAt).toLocaleString()
                                : new Date(Host.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>

          {isError && <p className={styles.errorText}>Error: {message}</p>}

          {user && (
            <div className={styles.profileDetails}>
              <div className={styles.BaseContainer}>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <div className={styles.statusContainer}>
                  <p>
                    <strong>Status:</strong>{" "}
                    {user.isBanned ? (
                      <>
                        <FaTimesCircle color="#E53935" /> Banned
                        <Card>
                          <Card.Title>Account Temporarily Restricted by Admin</Card.Title>
                          <Card.Body>
                            Your account has been temporarily restricted by our admin team due to policy
                            review. {user.banReason}
                            <br />
                            {user.unbanNote}
                          </Card.Body>
                        </Card>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle color="#4CAF50" /> Active
                      </>
                    )}
                  </p>
                </div>
              </div>
              {/* ====== NAME ====== */}
              <EditableField
                label="Name"
                field="name"
                value={formData.name}
                userValue={user.name}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />

              {/* ====== PHONE ====== */}
              <EditableField
                label="Phone"
                field="phone"
                value={formData.phone}
                userValue={user.phone}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />

              {/* ====== DOB ====== */}
              <EditableField
                label="DOB"
                field="dob"
                type="date"
                value={formData.dob}
                userValue={user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />

              {/* ====== GENDER ====== */}
              <EditableSelect
                label="Gender"
                field="gender"
                value={formData.gender}
                userValue={user.gender}
                options={["Male", "Female", "Other"]}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />

              {/* ====== LOCATION ====== */}
              <EditableField
                label="Location"
                field="location"
                value={formData.location}
                userValue={user.location}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />

              {/* ====== BIO ====== */}
              <EditableTextarea
                label="Bio"
                field="bio"
                value={formData.bio}
                userValue={user.bio}
                editField={editField}
                setEditField={setEditField}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
              {/* ====== Host Data ====== */}
              {user?.role === "host" && (
                <>
                  <div className={styles.hostSection}>

                    <p><strong>Government ID:</strong> {Host?.governmentID}</p>
                    <p><strong>ID Number:</strong> {Host?.governmentIDNumber}</p>

                    <div className={styles.imageRow}>
                      <img src={Host?.governmentIDImage?.url} alt="Government ID" />
                      <img src={Host?.cancelledChequeImage?.url} alt="Cancelled Cheque" />
                      <img src={Host?.payout?.qrCodeUrl} alt="UPI QR Code" />
                    </div>

                    <div className={styles.bankDetails}>
                      <p><strong>UPI ID:</strong> {Host?.payout?.upiId || "N/A"}</p>
                      <p><strong>Account Number:</strong> {Host?.payout?.bankDetails?.accountNumber || "N/A"}</p>
                      <p><strong>Bank Name:</strong> {Host?.payout?.bankDetails?.bankName || "N/A"}</p>
                      <p><strong>IFSC Code:</strong> {Host?.payout?.bankDetails?.ifscCode || "N/A"}</p>
                    </div>

                    <div className={styles.earnings}>
                      <p><strong>Total Earnings:</strong> ₹{Host?.earnings?.totalEarnings || 0}</p>
                      <p><strong>Pending Payouts:</strong> ₹{Host?.earnings?.pendingPayouts || 0}</p>
                    </div>

                    {/* ====== Full Host Info Section ====== */}
                    <div className={styles.extraHostInfo}>
                      <div className={styles.infoGrid}>
                        <p>
                          <strong>📅 Applied On:</strong>{" "}
                          {Host?.appliedAt
                            ? new Date(Host.appliedAt).toLocaleString()
                            : "N/A"}
                        </p>

                        <p>
                          <strong>💰 Completed Payouts:</strong> ₹
                          {Host?.earnings?.completedPayouts || 0}
                        </p>

                        <p>
                          <strong>🕓 Last Payout Date:</strong>{" "}
                          {Host?.earnings?.lastPayoutAt
                            ? new Date(Host.earnings.lastPayoutAt).toLocaleString()
                            : "N/A"}
                        </p>

                        <p>
                          <strong>💳 Default Payout Method:</strong>{" "}
                          {Host?.payout?.defaultPayoutMethod || "N/A"}
                        </p>

                        <p>
                          <strong>⭐ Rating:</strong>{" "}
                          {Host?.rating?.avgRating || 0} / 5 (
                          {Host?.rating?.totalReviews || 0} reviews)
                        </p>

                        <p>
                          <strong>🏠 Properties Listed:</strong>{" "}
                          {Host?.hostProperties?.length || 0}
                        </p>

                        {Host?.adminNote && (
                          <p>
                            <strong>📝 Admin Note:</strong> {Host.adminNote}
                          </p>
                        )}
                      </div>
                    </div>


                  </div>

                </>
              )}


              <p className={styles.registerDate}><strong>Registered On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </>
      )
      }
    </div >
  );
};

// ====== Reusable Components ======
const EditableField = ({ label, field, value, userValue, editField, setEditField, onChange, onSubmit, type = "text" }) => (
  <div className={styles.fieldContainer}>
    <div className={styles.Pargraph}>
      <p><strong>{label}:</strong> {userValue || "N/A"}</p>
      {editField !== field && (
        <button type="button" onClick={() => setEditField(field)} className={styles.editButton}>
          <MdOutlineEdit />
        </button>
      )}
    </div>

    {editField === field && (
      <>
        <div className={styles.inputContainer}>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className={styles.inputBox}
          />
          <button
            type="button"
            onClick={() => onSubmit({ [field]: value })}
            className={styles.saveButton}
          >
            <FaUserEdit />
          </button>
        </div>

      </>
    )}
  </div>
);

const EditableSelect = ({ label, field, value, userValue, options, editField, setEditField, onChange, onSubmit }) => (
  <div className={styles.fieldContainer}>
    <div className={styles.Pargraph}>
      <p><strong>{label}:</strong> {userValue || "N/A"}</p>
      {editField !== field && (
        <button type="button" onClick={() => setEditField(field)} className={styles.editButton}>
          <MdOutlineEdit />
        </button>
      )}
    </div>

    {editField === field && (
      <>
        <div className={styles.selectContainer}>
          <select value={value} onChange={(e) => onChange(field, e.target.value)} className={styles.inputBox}>
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button type="button" onClick={() => onSubmit({ [field]: value })} className={styles.saveButton}>
            <FaUserEdit />
          </button>
        </div>

      </>
    )}
  </div>
);

const EditableTextarea = ({ label, field, value, userValue, editField, setEditField, onChange, onSubmit }) => (
  <div className={styles.fieldContainer}>
    <div className={styles.Pargraph}>
      <p><strong>{label}:</strong> {userValue || "N/A"}</p>
      {editField !== field && (
        <button type="button" onClick={() => setEditField(field)} className={styles.editButton}>
          <MdOutlineEdit />
        </button>
      )}
    </div>

    {editField === field && (
      <>
        <div className={styles.textAreaContainer}>
          <textarea
            placeholder={`Enter your ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className={styles.textAreaBox}
          />
          <button
            type="button"
            onClick={() => onSubmit({ [field]: value })}
            className={styles.saveButton}
          >
            <FaUserEdit />
          </button>
        </div>

      </>
    )}
  </div>
);

export default UserProfile;
