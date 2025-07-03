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

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Auth from Context
  const {  logout } = useAuthContext();

  // 🧠 Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);// optional if needed separately

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogoClick = () => navigate("/");

  const handleLogout = () => {
    dispatch(handleLogoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar expand="md" className={styles.navbar}>
      <Container className={styles.Container}>
        <Navbar.Brand
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src="NAS.jpg" alt="logoImage" />
        </Navbar.Brand>

        <Navbar.Collapse className={styles.navLinkitem} id="basic-navbar-nav">
          <Nav className="me-auto">
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

          <Nav id={styles.navLinkicon} className="ms-auto">
            {user && user.role === "guest" && (
              <>
                <Nav.Link as={Link} to="/guest/dashboard" className={styles.navguest}>Guest Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/my-bookings" className={styles.navguest}>My Bookings</Nav.Link>
              </>
            )}
            {user && user.role === "host" && (
              <>
                <Nav.Link as={Link} to="/host/dashboard" className={styles.navhost}>Host Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/host/add-property" className={styles.navhost}>Add Property</Nav.Link>
                <Nav.Link as={Link} to="/host/check-bookings" className={styles.navhost}>Active Booking</Nav.Link>
                <Nav.Link as={Link} to="/host/my-properties" className={styles.navhost}>History_MyBooked_Property</Nav.Link>
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
