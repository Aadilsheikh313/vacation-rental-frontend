import { useEffect, useState } from "react";
import styles from "../stylesModule/UserProfile/userProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { profilereset } from "../config/redux/reducer/userReducer";
import {
  userProfileAction,
  userProfileUpdateAction,
} from "../config/redux/action/userAction";
import CustomSpinner from "../comman/Spinner";
import { FaRegHeart, FaUserEdit } from "react-icons/fa";
import { MdOutlineAddAPhoto, MdOutlineEdit } from "react-icons/md";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    userProfile: user,
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
      <h2>
        <FaRegHeart /> Welcome {user?.name} Profile
      </h2>

      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
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

          {isError && <p className={styles.errorText}>Error: {message}</p>}

          {user && (
            <div className={styles.profileDetails}>
              <div className={styles.BaseContainer}>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Email:</strong> {user.email}</p>
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

              <div className={styles.statusContainer}>
                <p><strong>Status:</strong> {user.isBanned ? "Banned" : "Active"}</p>
              </div>

              <p><strong>Registered On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </>
      )}
    </div>
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
        <select value={value} onChange={(e) => onChange(field, e.target.value)} className={styles.inputBox}>
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button type="button" onClick={() => onSubmit({ [field]: value })} className={styles.saveButton}>
          <FaUserEdit />
        </button>
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
      </>
    )}
  </div>
);

export default UserProfile;
