import { useEffect, useState } from "react";
import styles from "../stylesModule/UserProfile/userProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { profilereset } from "../config/redux/reducer/userReducer";
import {
  userProfileAction,
  userProfileUpdateAction,
} from "../config/redux/action/userAction";
import CustomSpinner from "../comman/Spinner";
import { FaCheckCircle, FaClock, FaTimesCircle, FaUserEdit } from "react-icons/fa";
import { MdOutlineAddAPhoto, MdOutlineEdit } from "react-icons/md";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { showWarning } from "../utils/toastUtils";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userProfile: user, Host, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.userProfile);
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
    governmentID: "",
    governmentIDNumber: "",
    governmentIDImage: null,
    cancelledChequeImage: null,
    upiId: "",
    qrCodeImage: null,
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  // ✅ Fetch user profile on mount
  useEffect(() => {
    if (tokenObj.token) dispatch(userProfileAction(tokenObj));
    return () => dispatch(profilereset());
  }, [dispatch, token]);

  // ✅ Populate data when user & host are fetched
  useEffect(() => {
    if (user && Host) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
        dob: user.dob || "",
        gender: user.gender || "",
        location: user.location || "",
        avatar: null,
        governmentID: Host.governmentID || "",
        governmentIDNumber: Host.governmentIDNumber || "",
        governmentIDImage: null,
        cancelledChequeImage: null,
        upiId: Host?.payout?.upiId || "",
        qrCodeImage: null,
        accountHolderName: Host?.payout?.bankDetails?.accountHolderName || "",
        accountNumber: Host?.payout?.bankDetails?.accountNumber || "",
        bankName: Host?.payout?.bankDetails?.bankName || "",
        ifscCode: Host?.payout?.bankDetails?.ifscCode || "",
      });
    }
  }, [user, Host]);

  // ✅ Handle file input (avatar / cheque / QR)
  const handleFileChange = (field, file) => {
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };
  
  // ✅ Add this function before return(...)
const handleFieldChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  // ✅ Submit profile update (generic)
  const handleSubmit = async (updatedField = null) => {
    const updatedFormData = new FormData();
    if (updatedField) {
      const key = Object.keys(updatedField)[0];
      updatedFormData.append(key, updatedField[key]);
    } else {
      Object.keys(formData).forEach((key) => {
        if (formData[key]) updatedFormData.append(key, formData[key]);
      });
    }

    await dispatch(userProfileUpdateAction({ tokenObj, formData: updatedFormData }));
    setEditField(null);
  };

  const handleHostSubmit = async () => {
    const { governmentID, governmentIDNumber, governmentIDImage } = formData;
    if (!governmentID || !governmentIDNumber || !governmentIDImage)
      return showWarning("All Government ID fields are required!");

    const updatedFormData = new FormData();
    updatedFormData.append("governmentID", governmentID);
    updatedFormData.append("governmentIDNumber", governmentIDNumber);
    updatedFormData.append("governmentIDImage", governmentIDImage);

    await dispatch(userProfileUpdateAction({ tokenObj, formData: updatedFormData }));
    setEditField(null);
  };

  return (
    <div className={styles.profileContainer}>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <Row>
            {/* Avatar */}
            <Col md="2">
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

            {/* User Info */}
            <Col md="4">
              {user && (
                <div className={styles.BaseContainer}>
                  <p className={styles.UserRole}><strong>Role:</strong> {user?.role}</p>
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
                              Your account has been temporarily restricted due to policy review. {user.banReason}
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
              )}
            </Col>

            {/* Host Verification */}
            <Col md="6">
              {user?.role === "host" && (
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
              )}
            </Col>
          </Row>

          {isError && <p className={styles.errorText}>Error: {message}</p>}

          {user && (
            <div className={styles.profileDetails}>
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

              {/* ===== Host Specific Section ===== */}
              {user?.role === "host" && (
                <>
                    {/* Government ID Section */}
                  <HostGovernmentID
                    Host={Host}
                    formData={formData}
                    setFormData={setFormData}
                    editField={editField}
                    setEditField={setEditField}
                    handleHostSubmit={handleHostSubmit}
                  />

                  {/* Cancelled Cheque, QR, and Bank Section */}
                  <HostBankDetails
                    Host={Host}
                    formData={formData}
                    setFormData={setFormData}
                    editField={editField}
                    setEditField={setEditField}
                    handleSubmit={handleSubmit}
                    handleFileChange={handleFileChange}
                  />

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

                </>
              )}


              <p className={styles.registerDate}>
                <strong>Registered On:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </>
      )
      }
    </div >
  );
};

// ====== Reusable Editable Components ======
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
      <div className={styles.inputContainer}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={styles.inputBox}
        />
        <button type="button" onClick={() => onSubmit({ [field]: value })} className={styles.saveButton}>
          <FaUserEdit />
        </button>
      </div>
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
      <div className={styles.textAreaContainer}>
        <textarea
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={styles.textAreaBox}
        />
        <button type="button" onClick={() => onSubmit({ [field]: value })} className={styles.saveButton}>
          <FaUserEdit />
        </button>
      </div>
    )}
  </div>
);
/* ======================================================
   ✅ Host Government ID Sub-Component
====================================================== */
const HostGovernmentID = ({ Host, formData, setFormData, editField, setEditField, handleHostSubmit }) => (
  <div className={styles.GovermentId}>
    {editField !== "governmentID" ? (
      <div>
        <Row>
          <Col md="6"><p><strong>ID Type:</strong> {Host?.governmentID || "N/A"}</p></Col>
          <Col md="6"><p><strong>ID Number:</strong> {Host?.governmentIDNumber || "N/A"}</p></Col>
        </Row>
        <img src={Host?.governmentIDImage?.url} alt="Gov ID" className={styles.govImage} />
        <button onClick={() => setEditField("governmentID")} className={styles.editButton}><MdOutlineEdit /></button>
      </div>
    ) : (
      <div className={styles.editSection}>
        <Row>
          <Col md="6">
            <label>ID Type</label>
            <select value={formData.governmentID} onChange={(e) => setFormData({ ...formData, governmentID: e.target.value })}>
              <option value="">Select</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="Passport">Passport</option>
              <option value="voter-id">Voter-id</option>
              <option value="driving-license">Driving-license</option>
              <option value="other">Other</option>
            </select>
          </Col>
          <Col md="6">
            <label>ID Number</label>
            <input
              type="text"
              value={formData.governmentIDNumber}
              onChange={(e) => setFormData({ ...formData, governmentIDNumber: e.target.value })}
            />
          </Col>
        </Row>
        <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, governmentIDImage: e.target.files[0] })} />
        <div className={styles.buttonRow}>
          <button onClick={handleHostSubmit} className={styles.saveButton}><FaUserEdit /> Update</button>
          <button onClick={() => setEditField(null)} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    )}
  </div>
);


/* ======================================================
   ✅ Host Bank + QR + Cheque Sub-Component (Fixed & Editable)
====================================================== */
const HostBankDetails = ({
  Host,
  formData,
  setFormData,
  editField,
  setEditField,
  handleSubmit,
  handleFileChange,
}) => (
  <div className={styles.bankSection}>
    <h4>Payout & Bank Details</h4>

    {/* ✅ VIEW MODE */}
    {editField !== "bankDetails" ? (
      <div>
        <Row>
          <Col md="6">
            <p><strong>Cancelled Cheque:</strong></p>
            {Host?.cancelledChequeImage?.url ? (
              <img
                src={Host.cancelledChequeImage.url}
                alt="Cancelled Cheque"
                className={styles.bankImage}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>

          <Col md="6">
            <p><strong>QR Code:</strong></p>
            {Host?.payout?.qrCodeUrl ? (
              <img
                src={Host.payout.qrCodeUrl}
                alt="UPI QR Code"
                className={styles.bankImage}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <p><strong>UPI ID:</strong> {Host?.payout?.upiId || "N/A"}</p>
          </Col>
          <Col md="6">
            <p>
              <strong>Account Holder:</strong>{" "}
              {Host?.payout?.bankDetails?.accountHolderName || "N/A"}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <p>
              <strong>Account No:</strong>{" "}
              {Host?.payout?.bankDetails?.accountNumber || "N/A"}
            </p>
          </Col>
          <Col md="6">
            <p>
              <strong>Bank Name:</strong>{" "}
              {Host?.payout?.bankDetails?.bankName || "N/A"}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <p>
              <strong>IFSC Code:</strong>{" "}
              {Host?.payout?.bankDetails?.ifscCode || "N/A"}
            </p>
          </Col>
        </Row>

        <button
          onClick={() => setEditField("bankDetails")}
          className={styles.editButton}
        >
          <MdOutlineEdit />
        </button>
      </div>
    ) : (
      /* ✅ EDIT MODE */
      <div className={styles.editSection}>
        <Row>
          <Col md="6">
            <label>Cancelled Cheque Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange("cancelledChequeImage", e.target.files[0])
              }
            />
          </Col>
          <Col md="6">
            <label>UPI QR Code Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange("qrCodeImage", e.target.files[0])
              }
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label>UPI ID</label>
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) =>
                setFormData({ ...formData, upiId: e.target.value })
              }
            />
          </Col>
          <Col md="6">
            <label>Account Holder Name</label>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(e) =>
                setFormData({ ...formData, accountHolderName: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label>Account Number</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
            />
          </Col>
          <Col md="6">
            <label>Bank Name</label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) =>
                setFormData({ ...formData, bankName: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label>IFSC Code</label>
            <input
              type="text"
              value={formData.ifscCode}
              onChange={(e) =>
                setFormData({ ...formData, ifscCode: e.target.value })
              }
            />
          </Col>
        </Row>

        <div className={styles.buttonRow}>
          <button
            onClick={() => handleSubmit()}
            className={styles.saveButton}
          >
            <FaUserEdit /> Update
          </button>
          <button
            onClick={() => setEditField(null)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);


export default UserProfile;
