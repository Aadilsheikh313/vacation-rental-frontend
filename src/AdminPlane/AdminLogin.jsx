import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "../adminStylesModule/adminLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../utils/toastUtils";
import { adminLoginAction } from "../config/redux/action/adminAuthAction";
const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.adminAuth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdimLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showError("Please fill all fields!");
            return;
        }

        const AdminData = { email, password };
        dispatch(adminLoginAction(AdminData));
         console.log("ADMIN DATA", AdminData);
    };
   

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (isSuccess && token) {
            showSuccess("Logged in successfully!");
            setEmail(""); setPassword("");
            navigate("/admin/dashboard");
        }

        if (isError) {
            showError(message || "Login failed!");
        }
    }, [isSuccess, isError, message, navigate]);

    return (
        <Container className={styles.loginContainer}>
            <Row className={styles.loginCard}>
                {/* Left Side: Image and welcome */}
                <Col md={6} className={styles.left}>
                    <h3>Welcome Back!</h3>
                    <p>Please login to access your dashboard.</p>
                    <img src="/adminlogin.jpg" alt="Login Visual" className={styles.adminimage} />
                </Col>

                {/* Right Side: Form */}
                <Col md={6} className={styles.right}>
                    <h2 className={styles.heading}>Login to Your Account</h2>

                    <Form onSubmit={handleAdimLogin} className={styles.form}>

                        <Form.Group className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {/* 🔹 LOGIN Button */}
                        <Button type="submit" variant="success" className="mt-4 w-100" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;
