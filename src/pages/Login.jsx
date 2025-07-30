import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "../stylesModule/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../config/redux/action/authAction";
import { showError, showSuccess } from "../utils/toastUtils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      showError("Please fill all fields!");
      return;
    }

    const userData = { email, password, role };
    dispatch(loginUser(userData));
    console.log("Password being sent:", password);
 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isSuccess && token) {
      showSuccess("Logged in successfully!");
      setEmail(""); setPassword(""); setRole("");
      navigate("/");
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
          <img src="/loginimages.jpg" alt="Login Visual" className={styles.image} />
        </Col>

        {/* Right Side: Form */}
        <Col md={6} className={styles.right}>
          <h2 className={styles.heading}>Login to Your Account</h2>

          <Form onSubmit={handleLogin} className={styles.form}>
            <Form.Select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="host">Host</option>
              <option value="guest">Guest</option>
            </Form.Select>

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

            {/* 🔹 Redirect to SignUp */}
            <div className="text-center mt-3">
              Don’t have an account?{" "}
              <Link to="/registerpage" className={styles.signupLink}>
                Sign Up
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
