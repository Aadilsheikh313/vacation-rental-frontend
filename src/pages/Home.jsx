
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { useSearchContext } from "../context/SearchContext";
import styles from "../stylesModule/home.module.css";
import { FaEye, FaHome, FaMapMarkedAlt, FaRegHeart, FaStar, FaSuitcaseRolling, FaUtensils } from "react-icons/fa";


const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { reviewLoading, reviewPosts } = useSelector((state) => state.review)
  const { loggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  const { searchQuery } = useSearchContext();


  const filteredPosts = posts
    .filter((p) => p.status !== false)
    .filter((property) => {
      const query = searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(query) ||
        property.location?.toLowerCase().includes(query) ||
        property.price.toString().includes(query)
      );
    });


  return (
    <div className={styles.home} >
      <h5 className="text-center mb-4">Where do you want to go today?</h5>
      <div className={styles.buttonGroup}>

        <Button as={Link} to="/explore/properties" variant="outline-primary" className="me-2">
          <FaHome className="me-2"/> Explore Stays
        </Button>
        <Button as={Link} to="/explore" variant="outline-info" className="me-2">
           <FaMapMarkedAlt className="me-2" />  Tourist Places
        </Button>
        <Button as={Link} to="/top-spots" variant="outline-secondary" className="me-2">
          <FaStar className="me-2" /> Top Spots
        </Button>
        <Button as={Link} to="/plan-my-trip" variant="outline-success">
          <FaSuitcaseRolling className="me-2" /> Plan My Trip
        </Button>
        <Button as={Link} to="/testy-food" variant="outline-dark">
          <FaUtensils className="me-2" /> Food & Fun
        </Button>
      </div>
      

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div className="row">
        {posts.length > 0 ? (


          posts.filter(p => p.status !== false).map((property) => (
            <div className="col-sm-6 col-md-4 mb-4" key={property._id}>
              <div className={`card ${styles.customCard}`}>
                <img
                  src={property.image.url}
                  className="card-img-top"
                  alt={property.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">₹{property.price} / night</p>
                  {property.totalReviews > 0 ? (
                    <p className="text-warning"><b>Rating</b>⭐ {property.avgRating} ({property.totalReviews} reviews)</p>
                  ) : (
                    <p className="text-muted">No rating and reviews yet.</p>
                  )}
                  <Button
                    as={Link}
                    to={`/property/${property._id}`}
                    className={`${styles.cardButton} ${styles.viewBtn}`}
                  >
                    <FaEye />  View
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5">
            <img src="/no-data.svg" alt="No Results" style={{ maxWidth: "200px" }} />
            <h5 className="mt-3">Oops! No properties found.</h5>
            <p>Try changing filters or search again.</p>
          </div>

        )}
      </div>
      <footer className="text-center mt-5 mb-4">
        <p className="text-muted">Made with <FaRegHeart /> for travelers, by travelers</p>
        <Button as={Link} to="/about" variant="outline-dark">Learn More About Us</Button>
      </footer>

    </div>

  );
};

export default Home;