import React, { useEffect, useState } from "react";
import styles from "../stylesModule/getAllRooms.module.css";
import RoomsDetails from "../assets/RoomsDetails.jpg";
import { Button, FormGroup, FormLabel, FormSelect, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { FaCoffee, FaEye, FaTv, FaUsers, FaWifi } from "react-icons/fa";
import CheckBookingConflict from "../Booking/CheckBookingConflict";
import { showError } from "../utils/toastUtils";

const AnimatedCheckbox = ({ label }) => {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      <input type="checkbox" style={{ accentColor: "#b88c4a" }} />
      {label}
    </label>
  );
};

const GetAllRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckConflict, setShowCheckConflict] = useState(null);
  const { posts, isLoading } = useSelector((state) => state.post);
  const { token, user, loggedIn } = useSelector((state) => state.auth);

  const handleclickHome = () => navigate("/");

  const handeleBooking = (propertyId) => {
    if (!loggedIn) {
      showError("You are not logged in. Please login or register.");
      const goToLogin = window.confirm(
        "You are not logged in. Do you want to login or register?"
      );
      if (goToLogin) navigate("/login");
      return;
    }
    setShowCheckConflict(propertyId);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const filteredPosts = posts || [];

  return (
    <div className={styles.Container}>
      {/* Header Image */}
      <div className={styles.imageRooms}>
        <img src={RoomsDetails} alt="Rooms " />
        <div className={styles.overlay}>
          <div className={styles.Roomstext}>
            <h3>Rooms</h3>
            <p>
              Esse dolorum voluptatum ullam est sint nemo et est ipsa porro
              placeat quibusdam quia assumenda numquam molestias.
            </p>
          </div>
          <div className={styles.breadcrumb}>
            <input type="button" value="Home" onClick={handleclickHome} /> / Room
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Left Sidebar */}
        <div className={styles.leftNavbarCard}>
          <div className={styles.leftCardFilterPrice}>
            <h3>Filter Rooms</h3>
            <FormGroup className={styles.formData}>
              <FormLabel>Price</FormLabel>
              <FormSelect>
                <option>All Price</option>
                <option>500-1500</option>
                <option>1500-4000</option>
                <option>4000+</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomCapacity}>
            <FormGroup className={styles.formData}>
              <FormLabel>Rooms Capacity</FormLabel>
              <FormSelect>
                <option>Any Capacity</option>
                <option>1-2 Guest</option>
                <option>2-4 Guest</option>
                <option>5+ Guest</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomView}>
            <FormGroup className={styles.formData}>
              <FormLabel>View Type</FormLabel>
              <FormSelect>
                <option>All View</option>
                <option>Ocean View</option>
                <option>Garden View</option>
                <option>City View</option>
                <option>Mountain View</option>
                <option>Beach View</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomFeatures}>
            <h3>Room Features</h3>
            <AnimatedCheckbox label="King Bed" />
            <AnimatedCheckbox label="Living Area" />
            <AnimatedCheckbox label="Work Desk" />
            <AnimatedCheckbox label="Free Wi-Fi" />
            <AnimatedCheckbox label="Air Conditioning" />
            <AnimatedCheckbox label="Private Balcony" />
            <AnimatedCheckbox label="Fireplace" />
            <AnimatedCheckbox label="Soundproof Room" />
          </div>

          <div className={styles.applyFilterBtn}>
            <Button>Apply Filters</Button>
          </div>
        </div>

        {/* Right Content */}

        <div className={styles.rightContainerAllPropertyCard}>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <div className={styles.CountTotalRooms}>
            <p>Showing {filteredPosts.length} rooms</p>
            <FormGroup className={styles.Featured}>
              <FormSelect>
                <option>Sort by: Featured</option>
                <option>Price : Low to High</option>
                <option>Price : High to Low</option>
                <option>Guest Rating</option>
              </FormSelect>
            </FormGroup>
          </div>
          <hr />
          <div className={styles.getAllProperty}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((property) => (
                <div className={styles.card} key={property._id}>
                  <div className={styles.imagePrice}>
                    <img
                      src={property.image?.url}
                      className={styles.cardImage}
                      alt={property.title}
                    />
                    <div className={styles.upperPrice}>
                      <p>
                        From{" "}
                        <span className={styles.priceNumber}>
                          ₹{property.price}
                        </span>{" "}
                        / night
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>{property.title}</h5>
                    <p>{property.description}</p>
                    <div className={styles.facilities}>
                      <p>
                        <FaUsers /> {property.maxGuests} Guests
                      </p>
                      {property.facilities?.includes("Free WiFi") && (
                        <p>
                          <FaWifi /> Free WiFi
                        </p>
                      )}
                      {property.facilities?.includes("TV") && (
                        <p>
                          <FaTv /> Smart TV
                        </p>
                      )}
                      {property.facilities?.includes("Coffee Machine") && (
                        <p>
                          <FaCoffee /> Coffee
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.cardBTN}>
                    <Button
                      as={Link}
                      to={`/property/${property._id}`}
                      className={`${styles.cardButton} ${styles.viewBtn}`}
                    >
                      <FaEye /> View Details
                    </Button>

                    {showCheckConflict === property._id && (
                      <CheckBookingConflict
                        propertyId={property._id}
                        token={token}
                        userId={user?._id}
                        onConflictCheck={() => navigate(`/bookingFrom/${property._id}`)}
                      />
                    )}

                    {user?.role?.toLowerCase() === "guest" && (
                      <Button
                        onClick={() => handeleBooking(property._id)} // propertyId pass kiya
                        className={styles.bookingBtn}
                      >
                        Check Availability
                      </Button>
                    )}

                  </div>
                </div>
              ))
            ) : (
              <>
                <h5 className="mt-3">Oops! No properties found.</h5>
                <p>Try changing filters or search again.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllRooms;
