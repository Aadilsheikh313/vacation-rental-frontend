import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link, useLocation } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import styles from "../stylesModule/home.module.css";
import { FaEye, FaRegHeart } from "react-icons/fa";
import NavigationButtons from "../components/NavigationButtons";

const Home = () => {
  const dispatch = useDispatch();
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


  const loading = isLoading || searchLoading;

  return (
    <div className={styles.home}>
      <h5 className="text-center mb-4">Where do you want to go today?</h5>
      <NavigationButtons />

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
