import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetEditPost } from "../config/redux/reducer/propertyReducer";
import { editPropertyPosts, getSinglePosts } from "../config/redux/action/propertyAction";
import styles from "../stylesModule/edit.module.css";
import { showError, showSuccess } from "../utils/toastUtils";
import AmenitiesEditForm from "../Amenity/AmenitiesEditForm";
import AmenitiesForm from "../Amenity/AmenitiesPostForm";
import PolicyEditForm from "../Policy/PolicyEditFrom";
import PolicyPostForm from "../Policy/PolicyPostFrom";
import { motion, AnimatePresence } from "framer-motion";
import editImage from "../assets/editImage.jpg";

// Icons
import {
  FaMapMarkerAlt, FaTag, FaCity, FaGlobe, FaMoneyBillWave,
  FaFileImage, FaEdit, FaArrowLeft, FaBed, FaUsers,
  FaEye, FaLock, FaDesktop, FaCheckCircle, FaPhone,
  FaRegFileAlt, FaHotel, FaListUl
} from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

const EditProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singlePost, isLoading } = useSelector((state) => state.post);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    country: "",
    city: "",
    location: "",
    expired: false,
    maxGuests: "",
    roomSize: { value: "", unit: "m²" },
    privacy: "Private",
    workspace: false,
    bedType: "",
    facilities: [],
    views: [],
    directContact: { phone: "", email: "" }
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [showAmenityForm, setShowAmenityForm] = useState(null);
  const [showPolicyForm, setShowPolicyForm] = useState(null);

  // Options
  const categories = [
    "Hotels", "Apartments", "Villas", "Guest Houses", "Resorts", "Farmhouses",
    "Cottages", "Bungalows", "Homestays", "Cabins", "Treehouses", "Boathouses",
    "Hostels", "Serviced Apartments", "Tent Stays / Camping", "Houseboats",
    "Luxury Stays", "Bar"
  ];

  const bedTypes = ["Single", "Double", "Queen", "King", "Twin", "Bunk Bed", "Sofa Bed"];

  const facilitiesOptions = [
    "Free WiFi", "TV", "Gaming Console", "Coffee Machine", "Mini Bar",
    "AC", "Heating", "Room Service", "Private Bathroom", "Balcony",
    "Swimming Pool Access", "Fitness Center", "Spa Access", "Parking"
  ];

  const viewsOptions = [
    "City View", "Ocean View", "Mountain View", "City Skyline", "Garden View", "Pool View"
  ];

  useEffect(() => {
    dispatch(getSinglePosts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePost) {
      setFormData({
        ...formData,
        ...singlePost,
        roomSize: singlePost.roomSize || { value: "", unit: "m²" },
        views: singlePost.views || [],
        directContact: singlePost.directContact || { phone: "", email: "" }
      });
      setPreview(singlePost.image?.url || "");
    }
  }, [singlePost]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleDirectContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      directContact: { ...prev.directContact, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRoomSizeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      roomSize: { value: e.target.value, unit: "m²" }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      showError("❌ Session expired. Please login again.");
      return navigate("/login");
    }

    const postData = new FormData();
    for (let key in formData) {
      if (key === "facilities" || key === "views") {
        formData[key].forEach((item) => postData.append(key, item));
      } else if (key === "roomSize" || key === "directContact") {
        postData.append(key, JSON.stringify(formData[key]));
      } else {
        postData.append(key, formData[key]);
      }
    }
    if (image) postData.append("image", image);

    dispatch(editPropertyPosts({ id, updatedData: postData, token }))
      .unwrap()
      .then(() => {
        showSuccess("✅ Property updated successfully!");
        dispatch(resetEditPost());
        navigate("/");
      })
      .catch(() => showError("❌ Failed to update property."));
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.editImage}>
        <img src={editImage} alt="Edit Property" className={styles.editImageDown} />
        <div className={styles.overlay}></div>

        <div className={styles.formWrapper}>
          <h2>Edit Property</h2>
          {isLoading && <p>Loading property details...</p>}

          {/* Property Edit Form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.propertyForm}>
            <Row>
               <Col xs={12} md={6}>
                {/* Title */}
                <label><FaTag /> Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />

              </Col>
               <Col xs={12} md={6}>
                {/* Price */}
                <label><FaMoneyBillWave /> Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />

              </Col>
            </Row>

             <Row>
              <Col xs={12} md={6}>
                 {/* Description */}
             <label><FaMoneyBillWave /> Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
              </Col>
              <Col xs={12} md={6}>
              {/* Category */}
            <label><FaListUl /> Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
            </select>
              </Col>
             </Row>
         


            

            {/* Country & City */}
            <label><FaGlobe /> Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />

            <label><FaCity /> City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />

            {/* Location */}
            <label><FaMapMarkerAlt /> Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />

            {/* Max Guests */}
            <label><FaUsers /> Max Guests</label>
            <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} />

            {/* Bed Type */}
            <label><FaBed /> Bed Type</label>
            <select name="bedType" value={formData.bedType} onChange={handleChange}>
              <option value="">-- Select Bed Type --</option>
              {bedTypes.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>

            {/* Room Size */}
            <label>Room Size (m²)</label>
            <input type="number" value={formData.roomSize?.value || ""} onChange={handleRoomSizeChange} />

            {/* Facilities */}
            <label><FaCheckCircle /> Facilities</label>
            <div>
              {facilitiesOptions.map((fac, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    value={fac}
                    checked={formData.facilities.includes(fac)}
                    onChange={(e) => handleArrayChange(e, "facilities")}
                  /> {fac}
                </label>
              ))}
            </div>

            {/* Views */}
            <label><FaEye /> Views</label>
            <div>
              {viewsOptions.map((view, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    value={view}
                    checked={formData.views.includes(view)}
                    onChange={(e) => handleArrayChange(e, "views")}
                  /> {view}
                </label>
              ))}
            </div>

            {/* Privacy */}
            <label><FaLock /> Privacy</label>
            <select name="privacy" value={formData.privacy} onChange={handleChange}>
              <option value="Private">Private</option>
              <option value="Shared">Shared</option>
              <option value="NoBalcony">No Balcony</option>
            </select>

            {/* Workspace */}
            <label><FaDesktop /> Workspace</label>
            <input type="checkbox" name="workspace" checked={formData.workspace} onChange={handleChange} />

            {/* Direct Contact */}
            <label><FaPhone /> Phone</label>
            <input type="text" name="phone" value={formData.directContact.phone} onChange={handleDirectContactChange} />
            <label>Email</label>
            <input type="email" name="email" value={formData.directContact.email} onChange={handleDirectContactChange} />

            {/* Image Upload */}
            {preview && <img src={preview} alt="Preview" className={styles.updateimge} />}
            <label><FaFileImage /> Upload New Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {/* Expired */}
            <label>Expired</label>
            <input type="checkbox" name="expired" checked={formData.expired} onChange={handleChange} />

            {/* Buttons */}
            <button type="submit"><FaEdit /> Update Property</button>
            <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>
              <FaArrowLeft /> Go Back
            </button>
          </form>

          {/* Amenities Section */}
          <div style={{ marginTop: "30px" }}>
            <h3><FaRegFileAlt /> Manage Amenities</h3>
            <div>
              <button onClick={() => setShowAmenityForm("add")}>+ Add Amenities</button>
              <button onClick={() => setShowAmenityForm("edit")}>✏️ Edit Amenities</button>
            </div>
            <AnimatePresence>
              {showAmenityForm === "add" && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <AmenitiesForm propertyId={id} onClose={() => setShowAmenityForm(null)} />
                </motion.div>
              )}
              {showAmenityForm === "edit" && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <AmenitiesEditForm propertyId={id} onClose={() => setShowAmenityForm(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Policy Section */}
          <div style={{ marginTop: "30px" }}>
            <h3><FaHotel /> Manage Policy</h3>
            <div>
              <button onClick={() => setShowPolicyForm("add")}>+ Add Policy</button>
              <button onClick={() => setShowPolicyForm("edit")}>✏️ Edit Policy</button>
            </div>
            <AnimatePresence>
              {showPolicyForm === "add" && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <PolicyPostForm propertyId={id} onClose={() => setShowPolicyForm(null)} />
                </motion.div>
              )}
              {showPolicyForm === "edit" && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <PolicyEditForm propertyId={id} onClose={() => setShowPolicyForm(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
