
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link, useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import styles from "../stylesModule/home.module.css";
import { FaEye, FaHome, FaMapMarkedAlt, FaRegHeart, FaStar, FaSuitcaseRolling, FaUtensils } from "react-icons/fa";
import NavigationButtons from "../components/NavigationButtons";
import GlobalSearch from "../comman/GlobalSearch";


const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { reviewLoading, reviewPosts } = useSelector((state) => state.review)
  const { loggedIn } = useSelector((state) => state.auth);


    const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");


  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className={styles.home} >
         {!searchQuery && <h2>Welcome to Home Page</h2>}
            {searchQuery && <GlobalSearch searchQuery={searchQuery} />}
      <h5 className="text-center mb-4">Where do you want to go today?</h5>
      
    <NavigationButtons />
      


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
                <div className="card-body ">
                  <h5 className="card-title ">{property.title}</h5>
                  <p className="card-text">₹{property.price} / night</p>
                  {property.totalReviews > 0 ? (
                    <p className="text-warning"><b>Rating</b>⭐ {property.avgRating} ({property.totalReviews} reviews)</p>
                  ) : (
                    <p className="text-white-muted">No rating and reviews yet.</p>
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