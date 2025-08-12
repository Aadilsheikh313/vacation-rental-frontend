import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { getSinglePostAdmin } from "../config/redux/action/adminPostAction";
import { resetSingleAdminPost } from "../config/redux/reducer/adminPostReducer";
import LeafletMap from "../Map/MapComponent";

const GetTouristSinglePlace = () => {
  const [loadingMap, setLoadingMap] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const { id } = useParams();

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
    if (singleAdminPost?.coordinates?.coordinates?.length === 2) {
      const [lng, lat] = singleAdminPost.coordinates.coordinates;
      setCoordinates({ lat, lng });
    }
    setLoadingMap(false);
  }, [singleAdminPost]);


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
    isApproved,
    postedBy,
    tips,
    history,
    bestTimeToVisit,
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
          <p><strong>BestTimeToVisit:</strong> {bestTimeToVisit}</p>
          <p><strong>History:</strong> {history}</p>
          <p><strong>Tips:</strong> {tips}</p>
          {/* <hr /> */}
          {/* <h5>Posted By</h5>
          <p><strong>Name:</strong> {postedBy?.name}</p>
          <p><strong>Email:</strong> {postedBy?.email}</p>
          <p><strong>Phone:</strong> {postedBy?.phone}</p> */}
          <hr />
          <div className="mt-4">
            <h4>Where you'll be</h4>
            <div className="map-container">
              {loadingMap ? (
                <p>Loading map...</p>
              ) : coordinates ? (
                <LeafletMap lat={coordinates.lat} lng={coordinates.lng} title={singleAdminPost.city} />
              ) : (
                <p>Map not available</p>
              )}
            </div>
          </div>
          <div className="">
            <div className="text-start">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                <FaBackward /> Back
              </Button>
            </div>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetTouristSinglePlace;
