import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminRegisterAction } from "../config/redux/action/adminAuthAction";
import styles from "../adminStylesModule/adminAuth.module.css";
import { reset } from "../config/redux/reducer/adminAuthReducer";
import CustomSpinner from "../comman/Spinner";
import { showError, showSuccess } from "../utils/toastUtils";

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

        if (!formData.secretCode || !formData.email || !formData.password) {
            showError("Please fill all required fields");
            return;
        }

        dispatch(adminRegisterAction(formData));
    };

    useEffect(() => {
        if (isError && message) {
            showError(message);
            dispatch(reset());
        }

        if (isSuccess && message) {
            showSuccess(message);
            navigate("/admin/dashboard");
            dispatch(reset());
        }
    }, [isError, isSuccess, message, dispatch, navigate]);


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.cardWrapper}>
                {/* LEFT */}
                <div className={styles.visualSide}>
                    <img src="/adminregister.jpg" alt="Admin" />
                    <h2>Admin Access</h2>
                    <p>Only authorized admins can create accounts</p>
                </div>

                {/* RIGHT */}
                <div className={styles.formSide}>
                    <h3>Create Admin Account</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            className={styles.input}
                            placeholder="Secret Admin Code"
                            name="secretCode"
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            className={styles.input}
                            placeholder="Full Name"
                            name="name"
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            className={styles.input}
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                        />

                        <Form.Control
                            className={styles.input}
                            placeholder="Phone Number"
                            name="phone"
                            onChange={handleChange}
                            required
                        />

                        <Button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CustomSpinner />
                            ) : (
                                "Create Admin Account"
                            )}
                        </Button>
                        <div className={styles.loginBTN}>
                            Already have an account? <Link to="/admin/login" className={styles.loginLink}>Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
