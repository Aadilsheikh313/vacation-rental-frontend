import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from 'react-bootstrap';
import { createPosts } from '../config/redux/action/propertyAction';
import { showError, showSuccess } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { resetStatus } from '../config/redux/reducer/propertyReducer';
import styles from "../stylesModule/addProperty.module.css";
import { motion, AnimatePresence } from "framer-motion";
import AmenitiesForm from '../Amenity/AmenitiesPostForm';
import PolicyPostForm from '../Policy/PolicyPostFrom';

const AddPropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.post);

  const [showAmenities, setShowAmenities] = useState(false); // ✅ Modal state
  const [propertyId, setPropertyId] = useState(null); // ✅ Save after post
  const [showPolices, setShowPolices] = useState(false);

  // Effect for success/error toast
  useEffect(() => {
    if (isSuccess) {
      showSuccess("✅ Property added successfully!");
      setTimeout(() => {
        navigate("/");
        dispatch(resetStatus());
      }, 1000);
    }
    if (isError) {
      showError(message || "❌ Failed to add property!");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  // Form State
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

  // Handle text & select inputs
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox" && name !== "workspace") {
      // handle facilities & views checkboxes
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

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = new FormData();

    // Append normal fields
    for (let key in formData) {
      if (key === "facilities" || key === "views") {
        formData[key].forEach((item) => postData.append(key, item));
      } else if (key === "roomSize" && formData.roomSize) {
        postData.append("roomSize", JSON.stringify({ value: formData.roomSize, unit: "m²" }));
      } else if (key === "directPhone" || key === "directEmail") {
        continue;
      } else if (key !== "image") {
        postData.append(key, formData[key]);
      }
    }

    // Direct contact object
    const directContact = {
      phone: formData.directPhone,
      email: formData.directEmail,
    };
    postData.append("directContact", JSON.stringify(directContact));

    // Append image
    if (formData.image) {
      postData.append("image", formData.image);
    }

    // dispatch(createPosts(postData));
    dispatch(createPosts(postData)).then((res) => {
      const id = res?.payload?.property?._id || res?.payload?.newproperty?._id;
      if (id) {
        setPropertyId(id); // ✅ ab button dikhega
      }
    });




  };

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
      <h3>Add New Property</h3>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        {/* Description */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        {/* Price */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Price (INR per night)</Form.Label>
          <Form.Control type="number" min="1" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>

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

        {/* Country */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
        </Form.Group>

        {/* City */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
        </Form.Group>

        {/* Location */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Exact Location / Address</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>

        {/* Max Guests */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Max Guests</Form.Label>
          <Form.Control type="number" name="maxGuests" min="1" max="8" value={formData.maxGuests} onChange={handleChange} required />
        </Form.Group>

        {/* Bed Type */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Bed Type</Form.Label>
          <Form.Select name="bedType" value={formData.bedType} onChange={handleChange} required>
            <option value="">-- Select Bed Type --</option>
            {bedTypes.map((b, i) => <option key={i} value={b}>{b}</option>)}
          </Form.Select>
        </Form.Group>

        {/* Room Size */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Room Size (m²)</Form.Label>
          <Form.Control type="number" name="roomSize" value={formData.roomSize} onChange={handleChange} />
        </Form.Group>

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

        {/* Privacy */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Privacy</Form.Label>
          <Form.Select name="privacy" value={formData.privacy} onChange={handleChange}>
            <option value="Private">Private</option>
            <option value="Shared">Shared</option>
            <option value="NoBalcony">NoBalcony</option>
          </Form.Select>
        </Form.Group>

        {/* Workspace */}
        <Form.Group className={styles.formGroup}>
          <Form.Check type="checkbox" label="Workspace Available" name="workspace" checked={formData.workspace} onChange={handleChange} />
        </Form.Group>

        {/* Direct Contact */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Contact Phone</Form.Label>
          <Form.Control type="text" name="directPhone" value={formData.directPhone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" name="directEmail" value={formData.directEmail} onChange={handleChange} />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className={styles.formGroup}>
          <Form.Label>Property Image</Form.Label>
          <Form.Control type="file" name="image" accept=".jpg,.jpeg,.png" onChange={handleChange} required />
        </Form.Group>

        {/* Submit */}
        <Button type="submit" className={styles.submitButton}>Submit Property</Button>

        {/* Amenities Button */}

        <motion.button
          type="button"
          className={styles.amenitiesBtn}
          onClick={() => setShowAmenities(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add  Amenities
        </motion.button>


        {/* Ploicy Button */}

        <motion.button
          type="button"
          className={styles.policesBtn}
          onClick={() => setShowPolices(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        //disabled={!propertyId} // ✅ disable until property created
        >
          Add Policies
        </motion.button>


      </Form>

      {/* Modal with animation for Amenities */}
      <AnimatePresence>
        {showAmenities && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className={styles.closeBtn} onClick={() => setShowAmenities(false)}>❌</button>
              <AmenitiesForm propertyId={propertyId} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal with animation for Policies */}
      <AnimatePresence>
        {showPolices && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className={styles.closeBtn} onClick={() => setShowPolices(false)}>❌</button>
              <PolicyPostForm propertyId={propertyId} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AddPropertyForm;
