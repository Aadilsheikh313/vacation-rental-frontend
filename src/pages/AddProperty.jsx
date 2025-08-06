import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import { createPosts } from '../config/redux/action/propertyAction';
import { showError, showSuccess } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { resetStatus } from '../config/redux/reducer/propertyReducer';
import styles from "../stylesModule/addProperty.module.css";


const AddPropertyForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, isError, message } = useSelector((state) => state.post);

    useEffect(() => {
        console.log("isSuccess:", isSuccess, "isError:", isError);
        if (isSuccess) {
            showSuccess("✅ Property added successfully!");
            setTimeout(() => {
                navigate("/");
                dispatch(resetStatus()); // ✅ Reset state after navigating
            }, 1000);
        }
        if (isError) {
            showError(message || "❌ Failed to add property!");
            dispatch(resetStatus()); // ✅ Reset state after error
        }
    }, [isSuccess, isError, message, navigate, dispatch]);



    // State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        country: "",
        city: "",
        location: "",
        image: null,
    });

    // Change handler
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = new FormData();

        // Append text fields
        for (let key in formData) {
            if (key !== "image") {
                postData.append(key, formData[key]);
            }
        }

        // Append file separately
        if (formData.image) {
            postData.append("image", formData.image);
        }
        const coordinates = {
            type: "Point",
            coordinates: [formData.lng, formData.lat],
        };

        postData.append("coordinates", JSON.stringify(coordinates));

        dispatch(createPosts(postData));
    };


    return (
        <div className={styles.addPropertyContainer}>
            <h3 >Add New Property</h3>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g. Luxury Beach Villa"
                        name="title"
                        className={styles.formControl}
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Description */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Add a short description about the property"
                        name="description"
                        className={styles.formControl}
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Price */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Price (INR per night)</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        min="1"
                        className={styles.formControl}
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Category Dropdown */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        className={styles.formControl}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Apartments">Apartments</option>
                        <option value="Villas">Villas</option>
                        <option value="Guest Houses">Guest Houses</option>
                        <option value="Resorts">Resorts</option>
                        <option value="Farmhouses">Farmhouses</option>
                        <option value="Cottages">Cottages</option>
                        <option value="Bungalows">Bungalows</option>
                        <option value="Homestays">Homestays</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Treehouses">Treehouses</option>
                        <option value="Boathouses">Boathouses</option>
                        <option value="Hostels">Hostels</option>
                        <option value="Serviced Apartments">Serviced Apartments</option>
                        <option value="Tent Stays / Camping">Tent Stays / Camping</option>
                        <option value="Houseboats">Houseboats</option>
                        <option value="Luxury Stays">Luxury Stays</option>
                        <option value="Bar">Bar</option>
                    </Form.Control>
                </Form.Group>

                {/* Country */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        className={styles.formControl}
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* City */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        className={styles.formControl}
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Location */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Exact Location / Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        className={styles.formControl}
                        value={formData.location}
                        onChange={handleChange}
                        required
                        minLength={10}
                    />
                </Form.Group>

                {/* Latitude */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Latitude</Form.Label>
                    <Form.Control
                        type="number"
                        name="lat"
                        className={styles.formControl}
                        onChange={handleChange}
                        required
                        step="any"
                    />
                </Form.Group>

                {/* Longitude */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Longitude</Form.Label>
                    <Form.Control
                        type="number"
                        name="lng"
                        className={styles.formControl}
                        onChange={handleChange}
                        required
                        step="any"
                    />
                </Form.Group>

                {/* Image Upload */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Property Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        accept=".jpg,.jpeg,.png"
                        className={styles.formControl}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Submit */}
                <Button type="submit" className={styles.submitButton}>
                    Submit Property
                </Button>
            </Form>

        </div>
    );
};

export default AddPropertyForm;
