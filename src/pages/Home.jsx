
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link } from "react-router-dom";
import { Spinner,Button } from "react-bootstrap";
import { useSearchContext } from "../context/SearchContext";
import styles from "../stylesModule/home.module.css";
import { FaEye } from "react-icons/fa";


const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { reviewLoading, reviewPosts } = useSelector((state) => state.review)
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
      <h2 className="mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Explore All Properties"}
      </h2>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div className="row">
        {posts.length > 0 ? (
          posts.filter(p => p.status !== false).map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
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
                  <FaEye/>  View
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
    </div>
  );
};

export default Home;