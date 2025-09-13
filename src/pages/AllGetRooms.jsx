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
import { PricesBaseFilterPost, RoomFilterPost } from "../config/redux/action/filterAction";
import LeafletMap from "../Map/MapComponent";

const AnimatedCheckbox = ({ label, onChange }) => {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "14px" }}>
      <input
        type="checkbox"
        style={{ accentColor: "#b88c4a" }}
        onChange={(e) => onChange(label, e.target.checked)}
      />
      {label}
    </label>
  );
};


const GetAllRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCheckConflict, setShowCheckConflict] = useState(null);
  const [filters, setFilters] = useState({ priceRange: "", capacity: "", view: "", features: [], bedType: "" });

  const { posts, isLoading } = useSelector((state) => state.post);
  const { token, user, loggedIn } = useSelector((state) => state.auth);
  const { filter, roomFiltered, isLoading: filterLoading, isError, message } = useSelector((state) => state.filter);


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

  const filteredPosts =
    roomFiltered.length > 0 ? roomFiltered :
      filter.length > 0 ? filter :
        posts || [];

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
          <div className={styles.leftConatinereMap}>
            Current user Location
          </div>
          <div className={styles.leftCardFilterPrice}>
            <h3>Filter Rooms</h3>
            <FormGroup className={styles.formData}>
              <FormLabel>Price</FormLabel>
              <FormSelect
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })} >
                <option value="">All Price</option>
                <option value="0-1000">0-1000</option>
                <option value="1000-2000">1000-2000</option>
                <option value="2000-4000">2000-4000</option>
                <option value="4000+">4000+</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomCapacity}>
            <FormGroup className={styles.formData}>
              <FormLabel>Rooms Capacity</FormLabel>
              <FormSelect
                onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}>
                <option value="">Any Capacity</option>
                <option value="1-2">1-2 Guest</option>
                <option value="2-4">2-4 Guest</option>
                <option value="5+">5+ Guest</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomView}>
            <FormGroup className={styles.formData}>
              <FormLabel>View Type</FormLabel>
              <FormSelect
                onChange={(e) => setFilters({ ...filters, view: e.target.value })}
              >
                <option value="All">All View</option>
                <option value="Ocean View">Ocean View</option>
                <option value="Garden View">Garden View</option>
                <option value="City View">City View</option>
                <option value="Mountain View">Mountain View</option>
                <option value="Beach View">Beach View</option>
              </FormSelect>
            </FormGroup>
          </div>

          <div className={styles.leftCardFilterRoomFeatures}>
            <h3>Room Features</h3>
            <AnimatedCheckbox
              label="King Bed"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Living Area"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Work Desk"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Free Wi-Fi"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Air Conditioning"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Private Balcony"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Fireplace"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
            <AnimatedCheckbox
              label="Soundproof Room"
              onChange={(label, checked) =>
                setFilters((prev) => ({
                  ...prev,
                  features: checked
                    ? [...prev.features, label]
                    : prev.features.filter((f) => f !== label),
                }))
              }
            />
          </div>

          <div className={styles.applyFilterBtn}>
            <Button onClick={() => dispatch(RoomFilterPost(filters))}>
              Apply Filters
            </Button>
          </div>

        </div>

        {/* Right Content */}

        <div className={styles.rightContainerAllPropertyCard}>
          {isLoading || filterLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <div className={styles.CountTotalRooms}>
            <p>Showing {filteredPosts.length} rooms</p>
            <FormGroup className={styles.Featured}>
              <FormSelect onChange={(e) => dispatch(PricesBaseFilterPost(e.target.value))}>
                <option value="featured">Sort by: Featured</option>
                <option value="lowToHigh">Price : Low to High</option>
                <option value="highToLow">Price : High to Low</option>
                <option value="ratingHighToLow">Guest Rating</option>
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
                <p>
                  {message
                    ? "Try adjusting your filters to find better results."
                    : "Try changing filters or search again."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllRooms;
