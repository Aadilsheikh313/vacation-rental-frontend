import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../adminStylesModule/adminLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../utils/toastUtils";
import { adminLoginAction } from "../config/redux/action/adminAuthAction";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Please fill all fields!");
      return;
    }

    dispatch(adminLoginAction({ email, password }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isSuccess && token) {
      showSuccess("Logged in successfully!");
      navigate("/admin/dashboard");
    }

    if (isError) {
      showError(message || "Login failed!");
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* LEFT */}
        <div className={styles.left}>
          <h3>Welcome Back!</h3>
          <p>Please login to access your dashboard.</p>
          <img
            src="/adminlogin.jpg"
            alt="Login Visual"
            className={styles.adminimage}
          />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2 className={styles.heading}>Login to Your Account</h2>

          <Form onSubmit={handleAdminLogin} className={styles.form}>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.forminput}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.forminput}
              />
            </Form.Group>

            <Button
              type="submit"
              className={styles.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className={styles.signupText}>
              Don’t have an account?{" "}
              <Link to="/admin/register" className={styles.signupLink}>
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
