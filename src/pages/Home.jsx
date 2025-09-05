import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner, Button, Row, Col, Card } from "react-bootstrap";
import styles from "../stylesModule/home.module.css";
import { FaCoffee, FaEye, FaHeartbeat, FaRegHeart, FaRegStar, FaTv, FaUsers } from "react-icons/fa";
import NavigationButtons from "../components/NavigationButtons";
import Discover from "../assets/Discover.jpg";
import { FaLocationDot, FaWifi } from "react-icons/fa6";
import { BsAward, BsBicycle, BsFillCupHotFill, BsWater } from "react-icons/bs";
import { MdRestaurant, MdSecurity, MdSystemSecurityUpdate } from "react-icons/md";
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
          <img src={imagesbed1} alt="Hotel Bed Room" className={styles.image2} />

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

      <div className={styles.aboutRooms}>
        <h3>Rooms</h3>
        <p>-------<b>---------</b>-------------</p>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        <div className={styles.propertyImageCard}>
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, 6).map((property) => (
              <div className={styles.cardproperty} key={property._id}>
                <div className={`card ${styles.customCard}`}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={property.image.url}
                      className={styles.cardImage}
                      alt={property.title}
                    />
                    <div className={styles.imageUpperButton}>
                      <Button
                        as={Link}
                        to={`/property/${property._id}`}
                        className={`${styles.cardButton} ${styles.viewBtn}`}
                      >
                        Explore Room
                      </Button>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>{property.title}</h5>
                    <p>{property.description}</p>
                    <div className={styles.facilities}>
                      {property.facilities?.includes("Free WiFi") && (
                        <p><FaWifi /> Free WiFi</p>
                      )}
                      {property.facilities?.includes("TV") && (
                        <p><FaTv /> Smart TV</p>
                      )}
                      {property.facilities?.includes("Coffee Machine") && (
                        <p><FaCoffee /> Coffee</p>
                      )}
                      <p><FaUsers /> {property.maxGuests} Guests</p>
                    </div>
                    <div className={styles.priceandview}>
                      <p className="card-text">
                        From <span className={styles.priceNumber}>₹{property.price}</span> / night
                      </p>

                      <Button
                        as={Link}
                        to={`/property/${property._id}`}
                        className={`${styles.cardButton} ${styles.viewBtn}`}
                      >
                        <FaEye /> View Details
                      </Button>
                    </div>

                  </div>
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
        <div className={styles.viewAllRooms}>
          <Button
            className={styles.viewAllBtnRooms}
            onClick={() => navigate("/getAllproperty")}
          >
            View All Rooms & Suites
          </Button>
        </div>
      </div>
      <div className={styles.allAnimity}>
        <h2>Amenities</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        <div className={styles.cardAnimity}>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <BsWater />
              <h2>  Rooftop Pool & Terrace</h2>
            </div>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione.</p>
            <div className={styles.btnPragrph}>
              <p>24/7 Access</p>
              <p>Pool Bar</p>
            </div>
          </Card>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <FaHeartbeat />
              <h2>  Luxury Spa Center</h2>
            </div>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi.</p>
            <div className={styles.btnPragrph}>
              <p>Massage</p>
              <p>Sauna</p>
            </div>
          </Card>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <BsFillCupHotFill />
              <h2>  Gourmet Restaurant</h2>
            </div>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti.</p>
            <div className={styles.btnPragrph}>
              <p>Room Service</p>
              <p>Live Music</p>
            </div>
          </Card>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <BsBicycle />
              <h2>  Modern Fitness Studio</h2>
            </div>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae.</p>
            <div className={styles.btnPragrph}>
              <p>Personal Training </p>
              <p>Yoga Classes</p>
            </div>
          </Card>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <FaWifi />
              <h2>  High-Speed Internet</h2>
            </div>
            <p>Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque.</p>
            <div className={styles.btnPragrph}>
              <p>Business Center</p>
              <p>Conference Rooms</p>
            </div>
          </Card>
          <Card className={styles.animityCard}>
            <div className={styles.heading}>
              <MdSecurity />
              <h2>  24/7 Security Service</h2>
            </div>
            <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
              voluptatibus maiores alias consequatur aut perferendis.</p>
            <div className={styles.btnPragrph}>
              <p>Concierge</p>
              <p>Valet parking</p>
            </div>
          </Card>
        </div>
        <Card className={styles.animityCardButton}>
          <div className={styles.heading}>
            <h2>  Experience Premium Comfort</h2>
          </div>
          <p>Discover all the exceptional facilities we offer to make your stay unforgettable</p>
          <div className={styles.btnPragrph}>
            <button>Explore All Amenities </button>
          </div>
        </Card>

      </div>
      <div className={styles.event}>
        <h2>Events</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        <h4>Event Card</h4>
      </div>
      <div className={styles.locationandActivites}>
        <h3>Location & Activities</h3>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>

        <div className={styles.trouestCard}>
          <h2>Location & Activities Card</h2>
          <button>Discover All Place</button>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>
          Made with <FaRegHeart className={styles.heartIcon} /> for travelers, by travelers
        </p>
        <Button as={Link} to="/about" className={styles.heartButton}>
          Learn More About Us
        </Button>
      </footer>

    </div>
  );
};

export default Home;
