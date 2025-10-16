
import { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import styles from "../stylesModule/Navbar.module.css";
import { handleLogoutUser, reset } from "../config/redux/reducer/authReducer";
import logoImg from "../assets/NAS.jpg";
import { showInfo } from "../utils/toastUtils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { guestSearchAction, hostSearchAction } from "../config/redux/action/globalSearchAction";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const [searchText, setSearchText] = useState(
    () => new URLSearchParams(location.search).get("search") || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loggedIn, token } = useSelector((state) => state.auth);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleLogoClick = () => navigate("/");

  const handleLogout = () => {
    dispatch(handleLogoutUser());
    dispatch(reset());
    navigate("/");
    showInfo("You have been logged out successfully!");
  };

  const handleCloseProfile = () => {
    closeDropdown();
  };

  const handleHamburgerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);

    if (loggedIn) {
      const role = user?.role?.toLowerCase();

      if (role === "guest") {
        dispatch(guestSearchAction({ search: searchText }));
      } else if (role === "host") {
        dispatch(hostSearchAction({ search: searchText }));
      }
    }

    navigate(`/?${params.toString()}`); // ✅ query set hamesha karo
  };


  return (
    <Navbar expand="md" className={styles.navbar}>
      <Container className={`${styles.Container}`}>
        <div className={styles.logo_hambuger}>
          <Navbar.Brand className={styles.logo} onClick={handleLogoClick}>
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
          className={`${styles.navLinkitem} ${mobileMenuOpen ? styles.active : ""
            }`}
          id="basic-navbar-nav"
        >
          <div className={styles.leftSection}>
            <Nav>
              <Nav.Link as={Link} to="/" className={styles.navhome}>
                Home
              </Nav.Link>
            </Nav>
            <Form className={styles.searchInput} onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="property title, location, min price, max price..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
          </div>

          <Nav
            id={`${styles.navLinkicon} ${mobileMenuOpen ? styles.active : ""}`}
          >
            {loggedIn && user?.role?.toLowerCase() === "guest" && (
              <>
                <Nav.Link
                  as={Link}
                  to="/guest/dashboard"
                  className={styles.navguest}
                >
                  Guest Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/my-bookings" className={styles.navguest}>
                  My Trips
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Post-Trip-Moments"
                  className={styles.navguest}
                >
                  Post Trip Moments
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Experience-Hub"
                  className={styles.navguest}
                >
                  Experience Hub
                </Nav.Link>
              </>
            )}

            {loggedIn && user?.role?.toLowerCase() === "host" && (
              <>
                <Nav.Link
                  as={Link}
                  to="/host/dashboard"
                  className={styles.navhost}
                >
                  Host Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/host/add-property"
                  className={styles.navhost}
                >
                  Add Property
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/host/check-bookings"
                  className={styles.navhost}
                >
                  Active Booking
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/host/history-bookings"
                  className={styles.navhost}
                >
                  My Rentals
                </Nav.Link>
              </>
            )}

            <div className={styles.dropdownWrapper}>
              <div
                className={styles.userIcon}
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              >
                <Button className={styles.profileBuTN}>
                  {!loggedIn ? (
                    <FaUserCircle className={styles.iconButton} />
                  ) : (
                    <>
                      {
                        user?.avatar?.url ? (
                          <img
                            src={user.avatar.url}
                            alt={user.name}
                            className={styles.navAvatar}
                          />
                        ) : (
                          user?.name ? (
                            <div className={styles.navAvatarPlaceholder}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          ) : null
                        )
                      }
                    </>
                  )}

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
                          {/* <Link
                            to="/registerpage"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            Sign Up
                          </Link> */}
                          <Link
                            to="/registerpage"
                            className={styles.dropdownItem}
                            onClick={() => {
                              closeDropdown();
                            }}
                          >
                            Sign Up
                          </Link>
                          <Link
                            to="/login"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            Login
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className={styles.closeButtonProfile}>
                            <span>Welcome, {user?.name} your Profile</span>
                            <p
                              className={styles.closeButton}
                              onClick={handleCloseProfile}
                              style={{ cursor: "pointer" }}
                            >
                              X
                            </p>
                          </div>

                          <Link
                            to="/profile"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            Profile
                          </Link>
                          <Link
                            to="/explore"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            Explore
                          </Link>
                          <Link
                            to="/about"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            About
                          </Link>
                          <Link
                            to="/contact"
                            className={styles.dropdownItem}
                            onClick={closeDropdown}
                          >
                            Contact
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              closeDropdown();
                            }}
                            className={styles.dropdownItemlogout}
                          >
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
