import React, { useEffect } from "react";
import styles from "../stylesModule/AboutModule/about.module.css";
import { Button, Card, Row, Spinner } from "react-bootstrap";
import hotel1 from "../assets/hotel1.jpg";
import aboutimage from '../assets/about1.jpg';
import { CiHeart, CiWifiOn } from "react-icons/ci";
import { FaCarAlt, FaEye, FaGem, FaWifi, FaTv, FaCoffee, FaUsers, FaRegStar, FaTree } from "react-icons/fa";
import { BsAward, BsCupHot } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { useDispatch, useSelector } from "react-redux";


const AboutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.post);

    const handleclickHome = () => {
        navigate("/")
    }
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const filteredPosts = posts || [];

    return (
        <div className={styles.aboutMainContainer}>
            <div
                className={styles.aboutContainer}
                style={{ backgroundImage: `url(${aboutimage})` }}
            >
                <div className={styles.overlay}>
                    <h3>About</h3>
                    <p>
                        Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat
                        quibusdam quia assumenda numquam molestias.
                    </p>
                    <div className={styles.breadcrumb}>
                        <input type="button" value="Home" onClick={handleclickHome} /> / About
                    </div>
                </div>
            </div>

            <div className={styles.aboutInformation}>
                <div className={styles.leftContaiertext}>
                    <h3>Luxury Redefined in the Heart of Paradise</h3>
                    <p>Nestled along the pristine coastline, our boutique hotel has been welcoming
                        discerning travelers since 1892. What began as a charming seaside retreat has
                        evolved into one of the region's
                        most beloved luxury destinations, seamlessly blending
                        timeless elegance with modern sophistication.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <Row>
                        <Card className={styles.leftCard}>
                            <h3>132</h3>
                            <p>LUXURY ROOMS</p>
                        </Card>
                        <Card className={styles.leftCard}>
                            <h3>98%</h3>
                            <p>GUEST SATISFACTION</p>
                        </Card>
                    </Row>


                    <Row>
                        <Card className={styles.leftCard}>
                            <h3>1892</h3>
                            <p>ESTABLISHED</p>
                        </Card>
                        <Card className={styles.leftCard}>
                            <h3>17</h3>
                            <p>AWARDS WON</p>
                        </Card>
                    </Row>

                </div>
                <div className={styles.rightContainerImage}>
                    <img src={hotel1} alt="hotel1" />

                    <Card className={styles.rightCard}>
                        <CiWifiOn />
                        <h3>Free Wi-Fi</h3>
                        <p>High-speed internet throughout the property</p>
                    </Card>
                    <Card className={styles.rightCard}>
                        <FaCarAlt />
                        <h3>Valet Parking</h3>
                        <p>Complimentary parking with professional service</p>
                    </Card>
                    <Card className={styles.rightCard}>
                        <BsCupHot />
                        <h3>24/7 Room Service</h3>
                        <p>Gourmet dining delivered to your doo</p>
                    </Card>
                    <Card className={styles.rightCard}>
                        <FaGem />
                        <h3>Concierge Service</h3>
                        <p>Personal assistance for all your needs</p>
                    </Card>
                </div>
            </div>
            <div className={styles.awardsandrecgnition}>
                <h3>Awards & Recognition</h3>
                <p>Celebrating excellence in hospitality and service</p>
                <div className={styles.awardCard}>
                    <Card className={styles.awardCardstyle}>
                        <div className={styles.iconWrapper}>
                            <BsAward />
                        </div>
                        <h4>Best Luxury Hotel</h4>
                        <p>Travel Excellence Awards 2023</p>
                    </Card>

                    <Card className={styles.awardCardstyle}>
                        <div className={styles.iconWrapper}>
                            <FaRegStar />
                        </div>
                        <h4>5-Star Rating</h4>
                        <p>International Hotel Guide</p>
                    </Card>

                    <Card className={styles.awardCardstyle}>
                        <div className={styles.iconWrapper}>
                            <CiHeart />
                        </div>
                        <h4>Guest's Choice</h4>
                        <p>TripAdvisor 2023</p>
                    </Card>

                    <Card className={styles.awardCardstyle}>
                        <div className={styles.iconWrapper}>
                            <FaTree />
                        </div>
                        <h4>Eco-Friendly Hotel</h4>
                        <p>Green Tourism Certification</p>
                    </Card>
                </div>
            </div>
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

        </div>
    );
};

export default AboutPage;
