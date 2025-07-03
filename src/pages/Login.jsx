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
  const { isLoading, isError, isSuccess, message, token } = useSelector((state) => state.auth);

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
  };

  useEffect(() => {
    console.log("Redux login state =>", { isSuccess, isError, message });

    const token = localStorage.getItem("token"); // ✅ use localStorage directly
    if (isSuccess && token) {
       showSuccess("Logged in successfully!");

      // Reset form fields
      setEmail("");
      setPassword("");
      setRole("");

      navigate("/"); // or protected route
    }

    if (isError) {
      showError(message || "Login failed!");
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <Container className={`${styles.cardContainer} mt-4`}>
      <Row className="justify-content-md-center">
        <Col md={6} className={styles.leftHaltContainer}>
          <h3>Welcome to login your account</h3>
          <h5>
            Explore <span>your amazing city</span>
          </h5>
          <img src="./loginimage1.jpg" alt="Login Visual" style={{ width: "100%", borderRadius: "8px" }} />
        </Col>

        <Col md={6} className={styles.reightHaltContainer}>
          <h2 className={styles.heading}>Login to your account</h2>

          <Form onSubmit={handleLogin} className={styles.cardForm}>
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

            <div className={`${styles.loginButton} mt-4`}>
              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <Link to="/registerpage">
                <Button variant="primary" className="ms-3">
                  Sign Up
                </Button>
              </Link>
            </div>
          </Form>

          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
