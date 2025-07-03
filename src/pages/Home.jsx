
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../config/redux/action/propertyAction";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { reviewLoading, reviewPosts } = useSelector((state) => state.review)
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Explore All Properties</h2>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div className="row">
        {posts.length > 0 ? (
          posts.filter(p => p.status !== false).map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
              <div className="card">
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
                  <Link to={`/property/${property._id}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </div>
  );
};

export default Home;