import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { createPosts } from '../config/redux/action/propertyAction';
import { showError, showSuccess } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { resetStatus } from '../config/redux/reducer/propertyReducer';
import styles from "../stylesModule/addProperty.module.css";
import postImage from '../assets/Postimage.jpg';
import { FaRegHandPointRight } from 'react-icons/fa';

const AddPropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message, isLoading, propertyId } = useSelector((state) => state.post);

  const [showInfo, setShowInfo] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    country: "",
    city: "",
    location: "",
    maxGuests: 1,
    bedType: "",
    roomSize: "",
    facilities: [],
    views: [],
    privacy: "Private",
    workspace: false,
    directPhone: "",
    directEmail: "",
    image: null,
  });

  // handle inputs
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox" && name !== "workspace") {
      const arr = formData[name];
      if (checked) {
        setFormData({ ...formData, [name]: [...arr, value] });
      } else {
        setFormData({ ...formData, [name]: arr.filter((item) => item !== value) });
      }
    } else if (name === "workspace") {
      setFormData({ ...formData, workspace: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // submit property form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const postData = new FormData();

    for (let key in formData) {
      if (key === "facilities" || key === "views") {
        formData[key].forEach((item) => postData.append(key, item));
      } else if (key === "roomSize" && formData.roomSize) {
        postData.append("roomSize", JSON.stringify({ value: Number(formData.roomSize), unit: "m²" }));
      } else if (key === "directContact") {
        postData.append("directContact", JSON.stringify(formData.directContact));
      } else if (key !== "image") {
        postData.append(key, formData[key]);
      }
    }

    const directContact = {
      phone: formData.directPhone,
      email: formData.directEmail,
    };
    postData.append("directContact", JSON.stringify(directContact));

    if (formData.image) {
      postData.append("image", formData.image);
    }

    dispatch(createPosts(postData));
    navigate("/");
  };

  // toast + info banner handling
  useEffect(() => {
    if (isSuccess) {
      showSuccess("✅ Property added successfully!");
      setShowInfo(true);

      setTimeout(() => {
        dispatch(resetStatus());
      }, 2500);
    }
    if (isError) {
      showError(message || "❌ Failed to add property!");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, message, dispatch]);

  const categories = [
    'Hotels', 'Apartments', 'Villas', 'Guest Houses', 'Resorts', 'Farmhouses',
    'Cottages', 'Bungalows', 'Homestays', 'Cabins', 'Treehouses', 'Boathouses',
    'Hostels', 'Serviced Apartments', 'Tent Stays / Camping', 'Houseboats',
    'Luxury Stays', 'Bar'
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

  return (
    <div className={styles.addPropertyContainer}>
      <div className={styles.postImage}>
        <img src={postImage} alt="Post Property" />
        <div className={styles.overlay}></div>

        <div className={styles.formWrapper}>
          <h2 className={styles.pageTitle}>Add New Property</h2>
          {showInfo && (
            <Alert variant="info" className={styles.infoAlert}>
              ℹ️ Property successfully added! <br />
              <FaRegHandPointRight /> Go to the <strong>Edit Property</strong> page to add
              <strong> Amenities</strong> and <strong> Policies</strong>.
              {propertyId && (
                <div className={styles.alertButton}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/edit-property/${propertyId}`)}
                  >
                    Go to Edit Property
                  </Button>
                </div>
              )}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.propertyForm}>
            <Row>
              <Col xs={12} md={6}>
                {/* Title */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                {/* Price */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Price (INR per night)</Form.Label>
                  <Form.Control type="number" min="1" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Category */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

              </Col >
              <Col xs={12} md={6}>
                {/* Country */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                {/* City */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                {/* Location */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Exact Location / Address</Form.Label>
                  <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Description */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Bed Type */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Bed Type</Form.Label>
                  <Form.Select name="bedType" value={formData.bedType} onChange={handleChange} required>
                    <option value="">-- Select Bed Type --</option>
                    {bedTypes.map((b, i) => <option key={i} value={b}>{b}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Max Guests */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Max Guests</Form.Label>
                  <Form.Control type="number" name="maxGuests" min="1" max="8" value={formData.maxGuests} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Room Size */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Room Size (m²)</Form.Label>
                  <Form.Control type="number" name="roomSize" value={formData.roomSize} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Facilities */}
              <Form.Group className={styles.formGroup}>
                <Form.Label>Facilities</Form.Label>
                <div className={styles.checkboxGroup}>
                  {facilitiesOptions.map((fac, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={fac}
                      value={fac}
                      name="facilities"
                      checked={formData.facilities.includes(fac)}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>
            </Row>
            <Row>
              {/* Views */}
              <Form.Group className={styles.formGroup}>
                <Form.Label>Views</Form.Label>
                <div className={styles.checkboxGroup}>
                  {viewsOptions.map((view, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={view}
                      value={view}
                      name="views"
                      checked={formData.views.includes(view)}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={12} md={6}>

                {/* Workspace */}
                <Form.Group className={styles.formGroup}>
                  <Form.Check type="checkbox" label="Workspace Available" name="workspace" checked={formData.workspace} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Privacy */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Privacy</Form.Label>
                  <Form.Select name="privacy" value={formData.privacy} onChange={handleChange}>
                    <option value="Private">Private</option>
                    <option value="Shared">Shared</option>
                    <option value="NoBalcony">No Balcony</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Direct Contact */}
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control type="text" name="directPhone" value={formData.directPhone} onChange={handleChange} />
                </Form.Group>

              </Col>
              <Col xs={12} md={6}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control type="email" name="directEmail" value={formData.directEmail} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            {/* Image Upload */}
            <Form.Group className={styles.formGroup}>
              <Form.Label>Property Image</Form.Label>
              <Form.Control type="file" name="image" accept=".jpg,.jpeg,.png" onChange={handleChange} required />
            </Form.Group>

            {/* Submit */}
            <div className={styles.submitWrapper}>
              <Button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <Spinner size="sm" animation="border" /> : "Submit Property"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyForm;
