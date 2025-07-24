import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../adminStylesModule/adminNavbar.module.css";
import NAS from "../assets/NAS.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { logoutAdmin, reset } from "../config/redux/reducer/adminAuthReducer";


const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Correct admin login state
    const { loggedIn } = useSelector((state) => state.adminAuth);
    const adminAuth = useSelector((state) => state.adminAuth);
    const isLoggedIn = adminAuth.loggedIn && adminAuth.token;


    const handleAdminlogout = () => {
        dispatch( logoutAdmin());
        dispatch(reset());
        navigate("/admin/login");
    };
    

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={NAS} alt="Logo" className={styles.logo} />
            </div>

            <ul className={styles.navLinks}>
                <li><Link to="/admin/home">Home</Link></li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>

                <div className={styles.navRight}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                    <button className={styles.searchButton} type="submit">Search</button>
                </div>

                <li><Link to="/admin/host-users">Host Users</Link></li>
                <li><Link to="/admin/guest-users">Guest Users</Link></li>
                <li><Link to="/admin/properties">Properties</Link></li>
            </ul>

            <div className={styles.authButtons}>
                {!isLoggedIn ? (
                    <>
                        <Link to="/admin/register" className={styles.signupBtn}>Sign Up</Link>
                        <Link to="/admin/login" className={styles.loginBtn}>Login</Link>
                    </>
                ) : (
                    <Button onClick={handleAdminlogout} className={styles.logoutBtn}>Logout</Button>
                )}

            </div>
        </nav>
    );
};

export default AdminNavbar;