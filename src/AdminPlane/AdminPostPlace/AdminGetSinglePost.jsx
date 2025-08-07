import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { getSinglePostAdmin } from "../../config/redux/action/adminPostAction";
import { resetSingleAdminPost } from "../../config/redux/reducer/adminPostReducer";

const AdminGetSinglePost = () => {
  const { id } = useParams();
  console.log("ID",id);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    singleAdminPost,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminPost);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePostAdmin(id));
    }

    return () => {
      dispatch(resetSingleAdminPost());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading post...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {message || "Error loading post"}
        </Alert>
        <div className="text-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  if (!singleAdminPost) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="info">No post found.</Alert>
      </Container>
    );
  }

  const {
    title,
    description,
    category,
    subcategory,
    city,
    country,
    location,
    postedOn,
    images = [],
  } = singleAdminPost;

  return (
    <Container className="mt-5">
      <Card className="shadow">
        {images.length > 0 && (
          <Card.Img
            variant="top"
            src={images[0].url}
            style={{ height: "400px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {category} | {subcategory} | Posted On:{" "}
            {new Date(postedOn).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>
            <strong>Description:</strong> {description}
          </Card.Text>
          <p><strong>City:</strong> {city}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Location:</strong> {location}</p>

          <div className="text-end">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminGetSinglePost;
