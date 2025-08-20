import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner, Button, Row, Col, Card } from "react-bootstrap";
import styles from "../stylesModule/home.module.css";
import { FaEye, FaRegHeart, FaRegStar } from "react-icons/fa";
import NavigationButtons from "../components/NavigationButtons";
import Discover from "../assets/Discover.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { BsAward } from "react-icons/bs";
import { MdRestaurant } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import hotel1 from "../assets/hotel1.jpg";
import imagesbed1 from '../assets/imagesbed1.jpg';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { properties, isLoading: searchLoading } = useSelector(
    (state) => state.globalSearch
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase() || "";
  const minPrice = Number(queryParams.get("minPrice")) || 0;
  const maxPrice = Number(queryParams.get("maxPrice")) || Infinity;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // ✅ Filtering logic only
  const filteredPosts = useMemo(() => {
    if (properties.length > 0) {
      return properties;  // ✅ Agar API result aaya hai to wahi show karo
    }

    return posts.filter((p) => {
      if (p.status === false) return false;

      const matchesText =
        p.title.toLowerCase().includes(search) ||
        p.city?.toLowerCase().includes(search);

      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchesText && matchesPrice;
    });
  }, [properties, posts, search, minPrice, maxPrice]);


  const hondleclickAbout = () => {
    navigate('/about');  // ✅ navigate to About page
  };

  const loading = isLoading || searchLoading;

  return (
    <div className={styles.home}>
      <div className={styles.heroSection}>
        <img src={Discover} alt="Discover" className={styles.imagesection} />
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroSection} >
            <h5 className={styles.heroText}>Discover Elegance and Comfort</h5>
            <p className={styles.heroSubtitle}>
              Experience unparalleled luxury in the heart of the city
              with world-class amenities and personalized service
              that exceeds every expectation.
            </p>
            <div className={styles.homeicons}>
              <p><b><FaRegStar />5-Star Luxury</b></p>
              <p><b><FaLocationDot />Prime Location</b></p>
              <p><b><BsAward />Award Winning</b></p>
            </div>

            <NavigationButtons />
            <div className={styles.achivmentstats}>
              <div> <h4>250+</h4>
                <p>LUXURY ROOMS</p>
              </div>
              <div>
                <h4>10+</h4>
                <p>YEARS EXPERIENCE</p>
              </div>
              <div>
                <h4>98%</h4>
                <p>GUEST SATISFACTION</p>
              </div>
              <div>
                <h4>24/7</h4>
                <p>CONCIERGE SERVICE</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.leftContainer}>
          <img src={hotel1} alt="Hotel Building" />
          <img src={imagesbed1} alt="Hotel Bed Room" className={styles.image2}/>

          {/* Badge Card */}
          <div className={styles.card}>
            <BsAward />
            <div>
              <h4>5-Star</h4>
              <p>Luxury</p>
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <h5>HERITAGE & EXCELLENCE</h5>
          <h2>Discover the Pinnacle of Hospitality</h2>
          <p>
            Experience unparalleled luxury at Heritage Grand Hotel, where timeless
            elegance meets modern sophistication. For over four decades, we have
            crafted memorable experiences through exceptional service and attention
            to every detail.
          </p>
          <p>
            Our commitment to excellence has earned recognition from prestigious
            hospitality awards worldwide, making us the preferred choice for
            discerning guests seeking both comfort and distinction.
          </p>

          <div className={styles.premimumsuitelo}>
            <Row>
              <Col>
                <FaRegStar />
                <h3>Premium Suites</h3>
                <p>
                  Luxuriously appointed accommodations with panoramic city views
                </p>
              </Col>
              <Col>
                <BsAward />
                <h3>Award-Winning Service</h3>
                <p>
                  Personalized hospitality that exceeds every expectation
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>
                  <FaLocationDot /> Prime Location
                </h3>
                <p>Situated in the heart of the city's cultural district</p>
              </Col>
              <Col>
                <MdRestaurant />
                <h3>Michelin Dining</h3>
                <p>Exceptional culinary experiences by renowned chefs</p>
              </Col>
            </Row>

            <button onClick={hondleclickAbout}>
              Discover Our Story <IoIosArrowRoundForward />
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((property) => (
            <div className="col-sm-6 col-md-4 mb-4" key={property._id}>
              <div className={`card ${styles.customCard}`}>
                <img
                  src={property.image.url}
                  className="card-img-top"
                  alt={property.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body ">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">₹{property.price} / night</p>
                  {property.totalReviews > 0 ? (
                    <p className="text-warning">
                      <b>Rating</b>⭐ {property.avgRating} (
                      {property.totalReviews} reviews)
                    </p>
                  ) : (
                    <p className="text-white-muted">
                      No rating and reviews yet.
                    </p>
                  )}
                  <Button
                    as={Link}
                    to={`/property/${property._id}`}
                    className={`${styles.cardButton} ${styles.viewBtn}`}
                  >
                    <FaEye /> View
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5">
            <img
              src="/no-data.svg"
              alt="No Results"
              style={{ maxWidth: "200px" }}
            />
            {search ? (
              <>
                <h5 className="mt-3">
                  Sorry! No properties found in "{search}".
                </h5>
                <p>This location doesn’t have any listed property yet.</p>
              </>
            ) : (
              <>
                <h5 className="mt-3">Oops! No properties found.</h5>
                <p>Try changing filters or search again.</p>
              </>
            )}
          </div>
        )}
      </div>

      <footer className="text-center mt-5 mb-4">
        <p className="text-muted">
          Made with <FaRegHeart /> for travelers, by travelers
        </p>
        <Button as={Link} to="/about" variant="outline-dark">
          Learn More About Us
        </Button>
      </footer>
    </div>
  );
};

export default Home;
