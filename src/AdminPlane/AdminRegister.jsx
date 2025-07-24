import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { adminRegisterAction } from "../config/redux/action/adminAuthAction";
import styles from "../adminStylesModule/adminAuth.module.css";
import { showError, showSuccess } from "../utils/toastUtils";
import { reset } from "../config/redux/reducer/adminAuthReducer";



const AdminRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        secretCode: "",
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.adminAuth
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(adminRegisterAction(formData));
        console.log("ADMINREFIST",formData );
        
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset);
            navigate("/admin/dashboard");
        }
    }, [dispatch, isSuccess, navigate]);

    return (
        <div className={styles.registerContainer}>
             <div className={styles.imageContainer}>
                <img src="/adminregister.jpg" alt="Register" className={styles.sideImage} />
            </div>
            <div className={styles.formContainer}>
                <h2>Admin Sign Up</h2>

                {message && (
                    <p className={isError ? styles.error : styles.success}>
                        {message}
                    </p>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="secretCode">
                        <Form.Control
                            type="text"
                            placeholder="Secret Code"
                            name="secretCode"
                            value={formData.secretCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className={styles.registerBtn} disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
                    </Button>
                    
                </Form>
            </div>

           
        </div>
    );
};

export default AdminRegister;