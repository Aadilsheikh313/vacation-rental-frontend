import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import { createPosts } from '../config/redux/action/propertyAction';
import { showError, showSuccess } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { resetStatus } from '../config/redux/reducer/propertyReducer';


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

        dispatch(createPosts(postData));
    };


    return (
        <div className="p-4">
            <h3 className="mb-4">Add New Property</h3>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title */}
                <Form.Group as={Row} className="mb-3" controlId="formTitle">
                    <Form.Label column sm={1}>Title</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="Enter property title" name="title" value={formData.title} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Description */}
                <Form.Group as={Row} className="mb-3" controlId="formDescription">
                    <Form.Label column sm={1}>Description</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="Enter property description" name="description" value={formData.description} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Price */}
                <Form.Group as={Row} className="mb-3" controlId="formPrice">
                    <Form.Label column sm={1}>Price</Form.Label>
                    <Col sm={6}>
                        <InputGroup>
                            <Form.Control type="number" placeholder="Price per night" name="price" value={formData.price} onChange={handleChange} />
                        </InputGroup>
                    </Col>
                </Form.Group>

                {/* Category */}
                <Form.Group as={Row} className="mb-3" controlId="formCategory">
                    <Form.Label column sm={1}>Category</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="e.g. Flat, Villa, Hotel, FarmHouse" name="category" value={formData.category} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Country */}
                <Form.Group as={Row} className="mb-3" controlId="formCountry">
                    <Form.Label column sm={1}>Country</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="Enter country" name="country" value={formData.country} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* City */}
                <Form.Group as={Row} className="mb-3" controlId="formCity">
                    <Form.Label column sm={1}>City</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="Enter city" name="city" value={formData.city} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Location */}
                <Form.Group as={Row} className="mb-3" controlId="formLocation">
                    <Form.Label column sm={1}>Location</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="Enter location/address" name="location" value={formData.location} onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* File Upload */}
                <Form.Group as={Row} className="mb-3" controlId="formFileUpload">
                    <Form.Label column sm={1}>Upload Image</Form.Label>
                    <Col sm={6}>
                        <Form.Control type="file" accept=".pdf, .jpg, .jpeg" name="image" onChange={handleChange} />
                    </Col>
                </Form.Group>

                {/* Submit Button */}
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 6, offset: 1 }}>
                        <Button type="submit" variant="primary">
                            Submit Property
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddPropertyForm;
