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
import { MdOutlineAttachEmail } from "react-icons/md";

import { Form, Row, Col, Button } from "react-bootstrap";

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
      setFormData(prev => ({
        ...prev,
        title: singlePost.title || "",
        description: singlePost.description || "",
        price: singlePost.price || "",
        category: singlePost.category || "",
        country: singlePost.country || "",
        city: singlePost.city || "",
        location: singlePost.location || "",
        maxGuests: singlePost.maxGuests || "",
        roomSize: singlePost.roomSize || { value: "", unit: "m²" },
        privacy: singlePost.privacy || "Private",
        workspace: singlePost.workspace || false,
        bedType: singlePost.bedType || "",
        facilities: singlePost.facilities || [],
        views: singlePost.views || [],
        directContact: singlePost.directContact || { phone: "", email: "" },
        expired: singlePost.expired || false
      }));

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
          <Form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.propertyForm}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaTag /> Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaMoneyBillWave /> Price</Form.Label>
                  <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaRegFileAlt /> Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaListUl /> Category</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaGlobe /> Country</Form.Label>
                  <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaCity /> City</Form.Label>
                  <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaMapMarkerAlt /> Location</Form.Label>
                  <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaUsers /> Max Guests</Form.Label>
                  <Form.Control type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaBed /> Bed Type</Form.Label>
                  <Form.Select name="bedType" value={formData.bedType} onChange={handleChange}>
                    <option value="">-- Select Bed Type --</option>
                    {bedTypes.map((b, i) => <option key={i} value={b}>{b}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}>Room Size (m²)</Form.Label>
                  <Form.Control type="number" value={formData.roomSize?.value || ""} onChange={handleRoomSizeChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className={styles.propertyViewandFaci}>
                  <Form.Label className={styles.fromlable}><FaCheckCircle /> Facilities</Form.Label>
                  {facilitiesOptions.map((fac, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={fac}
                      value={fac}
                      checked={formData.facilities.includes(fac)}
                      onChange={(e) => handleArrayChange(e, "facilities")}
                    />
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className={styles.propertyViewandFaci}>
                  <Form.Label className={styles.fromlable}><FaEye /> Views</Form.Label>
                  {viewsOptions.map((view, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={view}
                      value={view}
                      checked={formData.views.includes(view)}
                      onChange={(e) => handleArrayChange(e, "views")}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaLock /> Privacy</Form.Label>
                  <Form.Select name="privacy" value={formData.privacy} onChange={handleChange}>
                    <option value="Private">Private</option>
                    <option value="Shared">Shared</option>
                    <option value="NoBalcony">No Balcony</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="workspace"
                    label={<><FaDesktop /> Workspace</>}
                    checked={formData.workspace}
                    onChange={handleChange}
                    className={styles.fromlable}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaPhone /> Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={formData.directContact.phone} onChange={handleDirectContactChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className={styles.fromlable}><MdOutlineAttachEmail /></Form.Label>
                  <Form.Control type="email" name="email" value={formData.directContact.email} onChange={handleDirectContactChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  name="expired"
                  label="Expired"
                  checked={formData.expired}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                {preview && <img src={preview} alt="Preview" className={styles.updateimge} />}
                <Form.Group>
                  <Form.Label className={styles.fromlable}><FaFileImage /> Upload New Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.backAndEditBTN}>
              <Col md={6}>
                <Button type="button" onClick={() => navigate(-1)} className={styles.backButton}>
                  <FaArrowLeft /> Go Back
                </Button>
              </Col>
              <Col md={6} >
                <Button type="submit" className={styles.editButton}>
                  <FaEdit /> Update Property
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Amenities Section */}
          <div className={styles.AnimateClass}>
            <h3><FaRegFileAlt /> Manage Amenities</h3>
            <div className={styles.animateBTN}>
              <Button variant="success" onClick={() => setShowAmenityForm("add")}>+ Add Amenities</Button>
              <Button variant="warning" onClick={() => setShowAmenityForm("edit")}><FaEdit /> Edit Amenities</Button>
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
          <div className={styles.PolicyClass}>
            <h3><FaHotel /> Manage Policy</h3>
            <div className={styles.policyBTN}>
              <Button variant="success" onClick={() => setShowPolicyForm("add")}>+ Add Policy</Button>
              <Button variant="warning" onClick={() => setShowPolicyForm("edit")}><FaEdit /> Edit Policy</Button>
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
