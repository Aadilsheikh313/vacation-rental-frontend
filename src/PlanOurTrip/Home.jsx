
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal, Card } from "react-bootstrap";
import Travel1 from "../assets/Travel1.jpg";
import video from "../assets/video-2.mp4";
import styles from "../stylesModule/TripModule/Home.module.css";
import NavigationButtons from "../components/NavigationButtons";
import { FaUserFriends } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { GrCurrency } from "react-icons/gr";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdStarOutline } from "react-icons/io";
import PlanMyTrip from "../HeroSection/Plan_My_Trip";

const TripHomePage = () => {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    tourType: "",
  });

  const [showModal, setShowModal] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]:
        name === "adults" || name === "children"
          ? Number(value)
          : value,
    }));
  }

  function handleSearch(e) {
    e.preventDefault();
    setShowModal(true); // open modal immediately on submit
  }

  return (
    <Container fluid className={styles.tripContainer}>
      <div className={styles.navbutton}>
        <NavigationButtons />
      </div>

      {/* Hero Section with Background Video */}
      <div className={styles.heroSection}>

        <video className={styles.videoBg} autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className={styles.overlay}></div>
        <div className={styles.topbutton}>

          <div className={styles.heroContent}>
            <div className={styles.heroSection}>
              <h2 className={styles.heroText}>Discover Your Perfect Journey</h2>
              <p className={styles.heroSubtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                Sed do eiusmod tempor incididunt ut labore et dolore <br />
                magna aliqua. Ut enim ad minim veniam, quis nostrud <br />
                exercitation.
              </p>
            </div>

            {/* Dark Form Box */}
            <div className={styles.formCard}>
              <h3 className="text-white mb-3">Plan Your Adventure</h3>
              <Form onSubmit={handleSearch}>
                <Row className="g-3">
                  <Row className="g-3">
                    <Col>
                      <Form.Control
                        name="destination"
                        placeholder="Where do you want to go?"
                        value={trip.destination}
                        onChange={handleChange}
                        required
                        className={styles.formControl}
                      />
                    </Col>
                  </Row>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={trip.startDate}
                        onChange={handleChange}
                        required
                        className={styles.formControl}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={trip.endDate}
                        onChange={handleChange}
                        required
                        className={styles.formControl}
                      />
                    </Col>
                  </Row>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Select
                        name="adults"
                        value={trip.adults}
                        onChange={handleChange}
                        className={styles.formControl}
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4+ Adults</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Select
                        name="children"
                        value={trip.children}
                        onChange={handleChange}
                        className={styles.formControl}
                      >
                        <option value={0}>No Children</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                        <option value={3}>3+ Children</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Col md={12}>
                    <Form.Select
                      name="tourType"
                      value={trip.tourType}
                      onChange={handleChange}
                      className={styles.formControl}
                    >
                      <option value="">Select tour type</option>
                      <option value="adventure">Adventure</option>
                      <option value="luxury">Luxury</option>
                      <option value="family">Family</option>
                    </Form.Select>
                  </Col>

                  <Col md={12}>
                    <Button type="submit" className={styles.searchBtn}>
                      Find Your Perfect Trip
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show PlanMyTrip */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-xl"
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Trip Plan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass trip as initial values; key forces remount when trip changes */}
          <PlanMyTrip key={JSON.stringify(trip)} initialTrip={trip} />
        </Modal.Body>
      </Modal>

      <div className={styles.banner}>
        <div className={styles.leftContainer}>
          <h3 className={styles.bannerTitle}>Explore the World with Confidence</h3>
          <p className={styles.bannerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </p>
          <p className={styles.bannerText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* Stats Row */}
          <div className={styles.stats}>
            <div>
              <h4>1200</h4>
              <p>Happy Travelers</p>
            </div>
            <div>
              <h4>85</h4>
              <p>Countries Covered</p>
            </div>
            <div>
              <h4>10</h4>
              <p>Years Experience</p>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className={styles.rightContainer}>
          <img src={Travel1} alt="Travel" />
          <div className={styles.imageBadge}>
            <h4>10+</h4>
            <p>Years of Excellence</p>
          </div>
        </div>
      </div>

      <div className={styles.nextAdventure}>
        <h3>Why Choose Us for Your Next Adventure</h3>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris.
        </p>
      </div>

      <div className={styles.ServiveCard}>
        <div className={styles.card}>
          <FaUserFriends />
          <h4>Local Experts</h4>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.
          </p>
        </div>

        <div className={styles.card}>
          <BsShieldCheck />
          <h4>Safe & Secure</h4>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
          </p>
        </div>

        <div className={styles.card}>
          <GrCurrency />
          <h4>Best Prices</h4>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.
          </p>
        </div>

        <div className={styles.card}>
          <MdOutlineHeadsetMic />
          <h4>24/7 Support</h4>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi.
          </p>
        </div>

        <div className={styles.card}>
          <FaLocationDot />
          <h4>Global Destinations</h4>
          <p>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.
          </p>
        </div>

        <div className={styles.card}>
          <IoMdStarOutline />
          <h4>Premium Experience</h4>
          <p>
            Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim.
          </p>
        </div>
      </div>

      <div className={styles.FeaturedDestinations}>
        <p>
          <b>FEATURED DESTINATION</b>
        </p>
        <h3>
          <strong>Check Our </strong>Featured Destinations
        </h3>
        <h4>miltiple card with Mountinc cultural Heritages ect</h4>
      </div>
      <div className={styles.FeaturedTours}>
        <p>
          <b>FEATURED TOURS</b>
        </p>
        <h3> <strong>Check Our</strong> Featured Tours</h3>

        <h5>Multiple card troue</h5>
        <button>View All Tourse</button>
      </div>
      <div>
        <p><b>TESTIMONIALS</b></p>
        <h3><strong>What Our Customers</strong> Are Saying</h3>
        <h5>Mutilple slider the user send a msssage </h5>
      </div>

      <div className={styles.limitedOffer}>
        <div className={styles.leftSide}>
          <p>
            <b>Limited Time Offer</b>
          </p>
          <h3>Discover Your Next Adventure</h3>
          <p>Unlock incredible destinations with our specially curated travel packages.
            From exotic beaches to mountain peaks, your perfect
            getaway awaits.</p>
          <div className={styles.limitedOfferButton}>
            <button>EXPLORE NOW</button>
            <button>% VIEW DEALS</button>
          </div>
          <p> <strong>Need help choosing?</strong> Call +1 (555) 123-456</p>
        </div>

        <div className={styles.rightSide}>
          <img src="" alt="Image" />
          <div className={styles.imageupper}>
            <h4>500+</h4>
            <p>DESTINATION</p>
            <h4>10K+</h4>
            <p>HAPPY TRAVELLERS</p>
          </div>

        </div>

        <div className={styles.styleInLoop}>
          <div>
            <p>icons</p>
            <h4>Stay in the Loop</h4>
            <p>Get exclusive travel deals and destination guides delivered to your inbox</p>
          </div>
          <div className={styles.serachemail}>
            <input type="search" name="" id="" placeholder="Your email address" />
            <button>-</button>
            <p> icons We protect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className={styles.premiumservices}>
          <h3>Why Choose Our Adventures</h3>
          <p>Experience the difference with our premium travel services</p>
          <div className={styles.cardstylesdiv}>
            <Card>
              <p>icon</p>
              <h4>Handpicked Destinations</h4>
              <p>Every location is carefully selected by our travel experts for authentic experiences</p>

            </Card>
            <Card>
              <p>icon</p>
              <h4>Personalized Care</h4>
              <p>Tailored itineraries designed around your preferences and travel style</p>

            </Card>

            <Card>
              <p>icon</p>
              <h4>Award-Winning Service</h4>
              <p>Recognized for excellence with 5-star ratings and industry awards</p>

            </Card>
          </div>
        </div>
      </div>

      <div className={styles.trouseFooter}>
        <h3>Join Our Newsletter</h3>
        <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
        <div className={styles.serachBuutonFooter}>
          <input type="search" name="" id="" />
          <button>Subscribe</button>
        </div>
        <div className={styles.troueGuied}>
          <h3>Trouer Guied Line</h3>
        </div>
      </div>

    </Container>
  );
};

export default TripHomePage;
