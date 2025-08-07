import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../adminStylesModule/adminNavbar.module.css";
import NAS from "../assets/NAS.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { logoutAdmin, reset } from "../config/redux/reducer/adminAuthReducer";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const adminAuth = useSelector((state) => state.adminAuth);
  const isLoggedIn = adminAuth.loggedIn && adminAuth.token;

  const handleAdminlogout = () => {
    dispatch(logoutAdmin());
    dispatch(reset());
    navigate("/admin/login");
  };

  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(!menuOpen);
    }
  };

  const closeMenuIfMobile = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
         <Link to="/admin/home">
        <img src={NAS} alt="Logo" className={styles.logo}  />
        </Link>
      </div>

      <div className={styles.menuToggle} onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

       <ul className={`${styles.navLinks} ${menuOpen ? styles.showMobileMenu : ""}`}>
  <li><Link to="/admin/home" onClick={closeMenuIfMobile}>Home</Link></li>
  <li><Link to="/admin/dashboard" onClick={closeMenuIfMobile}>Dashboard</Link></li>
  <li><Link to="/admin/get-posts" onClick={closeMenuIfMobile}>Admin Posts</Link></li>
  <li><Link to="/admin/host-users" onClick={closeMenuIfMobile}>Host Users</Link></li>
  <li><Link to="/admin/guest-users" onClick={closeMenuIfMobile}>Guest Users</Link></li>
  <li><Link to="/admin/Post" onClick={closeMenuIfMobile}>Post</Link></li>
  <li className={styles.navRight}>
    <input type="text" placeholder="Search..." className={styles.searchInput} />
    <button className={styles.searchButton} type="submit">Search</button>
  </li>

  {/* 👉 Add this inside the ul */}
  <li className={styles.authButtonsMobile}>
    {!isLoggedIn ? (
      <>
        <Link to="/admin/register" className={styles.signupBtn}>Sign Up</Link>
        <Link to="/admin/login" className={styles.loginBtn}>Login</Link>
      </>
    ) : (
      <Button onClick={handleAdminlogout} className={styles.logoutBtn}>Logout</Button>
    )}
  </li>
</ul>

    </nav>
  );
};

export default AdminNavbar;