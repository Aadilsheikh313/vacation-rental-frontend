import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../adminStylesModule/adminNavbar.module.css";
import NAS from "../assets/NAS.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { logoutAdmin, reset } from "../config/redux/reducer/adminAuthReducer";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { loggedIn, token } = useSelector((state) => state.adminAuth);
  const isLoggedIn = loggedIn && token;

  const handleLogout = () => {
    dispatch(logoutAdmin());
    dispatch(reset());
    navigate("/admin/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/admin/home?query=${searchText}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* LOGO */}
      <Link to="/admin/home" className={styles.logoContainer}>
        <img src={NAS} alt="Admin Logo" />
        <span>AdminPanel</span>
      </Link>

      {/* SEARCH (DESKTOP) */}
      <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search posts, users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {/* TOGGLE */}
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
        <li><Link to="/admin/home">Home</Link></li>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/get-posts">Posts</Link></li>
        <li><Link to="/admin/host-users">Hosts</Link></li>
        <li><Link to="/admin/guest-users">Guests</Link></li>
        <li><Link to="/admin/post">Create</Link></li>

        {/* SEARCH (MOBILE) */}
        <form className={styles.searchMobile} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>

        {/* AUTH */}
        {isLoggedIn ? (
          <Button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <div className={styles.authBtns}>
            <Link to="/admin/login">Login</Link>
            <Link to="/admin/register">Sign Up</Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
