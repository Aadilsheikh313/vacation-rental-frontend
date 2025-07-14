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
                    <Col >
                        <Form.Control type="text" placeholder="Enter property title" name="title" className={styles.formControl} value={formData.title} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Description */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Description</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter property description" name="description" className={styles.formControl} value={formData.description} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Price */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Price</Form.Label>
                    <Col >
                        <InputGroup>
                            <Form.Control type="number" placeholder="Price per night" name="price" className={styles.formControl} value={formData.price} onChange={handleChange} />
                        </InputGroup>
                    </Col>
                </Form.Group>

                {/* Category */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Category</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="e.g. Flat, Villa, Hotel, FarmHouse" name="category" className={styles.formControl} value={formData.category} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Country */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Country</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter country" name="country" className={styles.formControl} value={formData.country} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* City */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>City</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter city" name="city" className={styles.formControl} value={formData.city} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Location */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Location</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter location/address" name="location" className={styles.formControl} value={formData.location} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* File Upload */}
                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Upload Image</Form.Label>
                    <Col >
                        <Form.Control type="file" accept=".pdf, .jpg, .jpeg" name="image" className={`${styles.formControl} ${styles.fileInput}`} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Latitude</Form.Label>
                    <Col >
                        <Form.Control type="text" name="lat" className={styles.formControl} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Longitude</Form.Label>
                    <Col >
                        <Form.Control type="text" name="lng" className={styles.formControl} onChange={handleChange} />
                    </Col>
                </Form.Group>


                {/* Submit Button */}
                <Form.Group className={styles.formGroup}>
                    <Button type="submit" className={styles.submitButton}>
                        Submit Property
                    </Button>
                </Form.Group>

            </Form>
        </div>
    );
};

export default AddPropertyForm;
