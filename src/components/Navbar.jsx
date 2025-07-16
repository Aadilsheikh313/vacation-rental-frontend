import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";

import styles from "../stylesModule/Navbar.module.css";
import { handleLogoutUser, reset } from "../config/redux/reducer/authReducer";
import { useSearchContext } from "../context/SearchContext";
import logoImg from "../assets/NAS.jpg";

const CustomNavbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();

  };

  const handleLogoClick = () => navigate("/");

  const handleLogout = () => {
    dispatch(handleLogoutUser());
    dispatch(reset());
    navigate("/");
  };

  const handleHamburgerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setIsOpen(false);
  };

  return (
     <Navbar expand="md" className={styles.navbar}>
      <Container className={`${styles.Container}`}>
        <div className={styles.logo_hambuger}>
          <Navbar.Brand
            className={styles.logo}
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <img src={logoImg} alt="logoImage" />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.hamburger}
            onClick={handleHamburgerToggle}
          >
            ☰
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse
          className={`${styles.navLinkitem} ${mobileMenuOpen ? styles.active : ""}`}
          id="basic-navbar-nav"
        >
          <div className={styles.leftSection}>
            <Nav>
              <Nav.Link as={Link} to="/" className={styles.navhome}>
                Home
              </Nav.Link>
            </Nav>

            <Form className={styles.searchInput} onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
          </div>

          <Nav id={`${styles.navLinkicon} ${mobileMenuOpen ? styles.active : ""}`}>
            {user?.role === "guest" && (
              <>
                <Nav.Link as={Link} to="/guest/dashboard" className={styles.navguest}>Guest Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/my-bookings" className={styles.navguest}>My Trips</Nav.Link>
              </>
            )}
            {user?.role === "host" && (
              <>
                <Nav.Link as={Link} to="/host/dashboard" className={styles.navhost}>Host Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/host/add-property" className={styles.navhost}>Add Property</Nav.Link>
                <Nav.Link as={Link} to="/host/check-bookings" className={styles.navhost}>Active Booking</Nav.Link>
                <Nav.Link as={Link} to="/host/history-bookings" className={styles.navhost}>My Rentals</Nav.Link>
              </>
            )}

            <div className={styles.dropdownWrapper}>
              <div
                className={styles.userIcon}
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              >
                <Button variant="primary">
                  <FaUserCircle size={26} />
                </Button>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.div
                      className={styles.modalOverlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      onClick={closeDropdown}
                    />

                    <motion.div
                      className={styles.modalContent}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!user ? (
                        <>
                          <Link to="/registerpage" className={styles.dropdownItem} onClick={closeDropdown}>Sign Up</Link>
                          <Link to="/login" className={styles.dropdownItem} onClick={closeDropdown}>Login</Link>
                        </>
                      ) : (
                        <>
                          <span>Welcome, {user?.name} your Profile</span>
                          <Link to="/profile" className={styles.dropdownItem} onClick={closeDropdown}>Profile</Link>
                          <Link to="/explore" className={styles.dropdownItem} onClick={closeDropdown}>Explore</Link>
                          <Link to="/about" className={styles.dropdownItem} onClick={closeDropdown}>About</Link>
                          <Link to="/contact" className={styles.dropdownItem} onClick={closeDropdown}>Contact</Link>
                          <button onClick={() => { handleLogout(); closeDropdown(); }} className={styles.dropdownItemlogout}>
                            Logout
                          </button>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
