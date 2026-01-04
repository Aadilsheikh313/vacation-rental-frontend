
import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineInformationCircle,
  HiOutlinePlusCircle,
  HiOutlineOfficeBuilding,
  HiOutlinePhotograph,
} from "react-icons/hi";
import {
  MdDashboard,
  MdOutlineExplore,
  MdContactMail,
  MdLogout,
} from "react-icons/md";
import {
  FaUserCircle,
  FaSuitcaseRolling,
  FaCalendarCheck,
} from "react-icons/fa";

import styles from "../stylesModule/Navbar.module.css";
import logoImg from "../assets/NAS.jpg";
import { handleLogoutUser, reset } from "../config/redux/reducer/authReducer";
import {
  guestSearchAction,
  hostSearchAction,
} from "../config/redux/action/globalSearchAction";
import { showInfo } from "../utils/toastUtils";

const CustomNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loggedIn } = useSelector((state) => state.auth);

  const [searchText, setSearchText] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(handleLogoutUser());
    dispatch(reset());
    navigate("/");
    showInfo("You have been logged out successfully!");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (loggedIn) {
      const role = user?.role?.toLowerCase();
      if (role === "guest")
        dispatch(guestSearchAction({ search: searchText }));
      if (role === "host")
        dispatch(hostSearchAction({ search: searchText }));
    }

    navigate(`/?search=${searchText}`);
  };

  return (
    <Navbar className={styles.navbar}>
      <Container className={styles.container}>
        {/* LOGO */}
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={logoImg} alt="Logo" className={styles.logoImg} />
        </Navbar.Brand>

        {/* HAMBURGER */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>

        {/* DESKTOP NAV */}
        <div className={styles.desktopNav}>
          {/* LEFT */}
          <Nav className={styles.leftSection}>
            <Link to="/" className={styles.navHome}>
              <HiOutlineHome /> <span>Home</span>
            </Link>

            <Form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <FormControl
                placeholder="Search destinations..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form>
          </Nav>

          {/* RIGHT */}
          <Nav className={styles.rightSection}>
            {/* NOT LOGGED IN */}
            {!loggedIn && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registerpage">Sign Up</Link>
              </>
            )}

            {/* GUEST */}
            {loggedIn && user?.role === "guest" && (
              <>
                <Link to="/guest/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
                <Link to="/my-bookings">
                  <FaSuitcaseRolling /> My Trips
                </Link>
                <Link to="/Post-Trip-Moments">
                  <HiOutlinePhotograph /> Memories
                </Link>
                <Link to="/Experience-Hub" >
                  <MdOutlineExplore />Experiences
                </Link>
              </>
            )}

            {/* HOST */}
            {loggedIn && user?.role === "host" && (
              <>
                <Link to="/host/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
                <Link to="/host/add-property">
                  <HiOutlinePlusCircle /> Add Listing
                </Link>
                <Link to="/host/history-bookings">
                  <HiOutlineOfficeBuilding /> My Listings
                </Link>
                <Link to="/host/check-bookings">
                  <FaCalendarCheck /> Active Bookings
                </Link>
              </>
            )}

            {/* PROFILE BUTTON */}
            {loggedIn && (
              <button
                className={styles.avatarBtn}
                onClick={() => setProfileOpen(true)}
              >
                {user?.avatar?.url ? (
                  <img src={user.avatar.url} alt={user.name} />
                ) : user?.name ? (
                  <div className={styles.navAvatarPlaceholder}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FaUserCircle />
                )}
              </button>
            )}

          </Nav>
        </div>
      </Container>

      {/* PROFILE DRAWER */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={() => setProfileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className={styles.profileDrawer}
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <h5>Hi, {user?.name}</h5>

              <Link to="/profile">
                <HiOutlineUser /> Profile
              </Link>
              <Link to="/explore">
                <MdOutlineExplore /> Explore
              </Link>
              <Link to="/about">
                <HiOutlineInformationCircle /> About
              </Link>
              <Link to="/contact">
                <MdContactMail /> Contact
              </Link>

              <button onClick={handleLogout} className={styles.logoutBtn}>
                <MdLogout /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className={styles.mobileDrawer}
              initial={{ x: "80vw" }}   
              animate={{ x: 10 }}       
              exit={{ x: "80vw" }}
            >
              <Link to="/"><HiOutlineHome /> Home</Link>

              {/* NOT LOGGED IN */}
              {!loggedIn && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registerpage">Sign Up</Link>
                </>
              )}

              {/* GUEST MOBILE MENU */}
              {loggedIn && user?.role === "guest" && (
                <>
                  <Link to="/guest/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                  <Link to="/my-bookings">
                    <FaSuitcaseRolling /> My Trips
                  </Link>
                  <Link to="/Post-Trip-Moments">
                    <HiOutlinePhotograph /> Memories
                  </Link>
                  <Link to="/Experience-Hub">
                    <MdOutlineExplore /> Experiences
                  </Link>

                  <hr />

                  <Link to="/profile">
                    <HiOutlineUser /> Profile
                  </Link>
                  <Link to="/explore">
                    <MdOutlineExplore /> Explore
                  </Link>
                  <Link to="/about">
                    <HiOutlineInformationCircle /> About
                  </Link>
                  <Link to="/contact">
                    <MdContactMail /> Contact
                  </Link>

                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <MdLogout /> Logout
                  </button>
                </>
              )}

              {/* HOST MOBILE MENU */}
              {loggedIn && user?.role === "host" && (
                <>
                  <Link to="/host/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                  <Link to="/host/add-property">
                    <HiOutlinePlusCircle /> Add Listing
                  </Link>
                  <Link to="/host/history-bookings">
                    <HiOutlineOfficeBuilding /> My Listings
                  </Link>
                  <Link to="/host/check-bookings">
                    <FaCalendarCheck /> Active Bookings
                  </Link>

                  <hr />

                  <Link to="/profile">
                    <HiOutlineUser /> Profile
                  </Link>
                  <Link to="/explore">
                    <MdOutlineExplore /> Explore
                  </Link>
                  <Link to="/about">
                    <HiOutlineInformationCircle /> About
                  </Link>
                  <Link to="/contact">
                    <MdContactMail /> Contact
                  </Link>

                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <MdLogout /> Logout
                  </button>
                </>
              )}
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </Navbar>
  );
};

export default CustomNavbar;
