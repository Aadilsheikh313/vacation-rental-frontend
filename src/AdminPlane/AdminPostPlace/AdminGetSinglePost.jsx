import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Alert, Button } from "react-bootstrap";
import { GeoAltFill, ClockFill, ArrowLeft, PencilSquare } from "react-bootstrap-icons";
import { getSinglePostAdmin } from "../../config/redux/action/adminPostAction";
import { resetSingleAdminPost } from "../../config/redux/reducer/adminPostReducer";
import LeafletMap from "../../Map/MapComponent";
import CustomSpinner from "../../comman/Spinner";
import styles from "../../adminStylesModule/adminpostSingle.module.css";

const AdminGetSinglePost = () => {
  const [loadingMap, setLoadingMap] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleAdminPost, isLoading, isError, message } = useSelector(
    (state) => state.adminPost
  );

  useEffect(() => {
    if (id) dispatch(getSinglePostAdmin(id));
    return () => dispatch(resetSingleAdminPost());
  }, [dispatch, id]);

  useEffect(() => {
    if (singleAdminPost?.coordinates?.coordinates?.length === 2) {
      const [lng, lat] = singleAdminPost.coordinates.coordinates;
      setCoordinates({ lat, lng });
    }
    setLoadingMap(false);
  }, [singleAdminPost]);

  const getTimeAgo = (date) => {
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "1 day ago";
    return `${diff} days ago`;
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <CustomSpinner />
        <p>Loading post...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className={styles.adminPostErrorContainer}>
        <Alert variant="danger">{message}</Alert>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
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
    postedBy,
    tips,
    history,
    bestTimeToVisit,
    images = [],
  } = singleAdminPost;

  return (
    <div className={styles.adminPostContainer}>
      <Container className={styles.adminPostContent}>
        <Card className={styles.adminPostCard}>
          {images.length > 0 && (
            <div className={styles.imageSlider}>
              <img src={images[0].url} alt="Post" className={styles.adminPostImage} />
            </div>
          )}

          <Card.Body>
            <h1 className={styles.postTitle}>{title}</h1>

            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{category}</span> / 
               <span className={styles.subCategoryBadge}>{subcategory}</span> /
              <span className={styles.timeBadge}> 
                <ClockFill /> {getTimeAgo(postedOn)}
              </span>
            </div>

            <p className={styles.description}>{description}</p>

            <p className={styles.locationText}>
              <GeoAltFill /> {location}, {city}, {country}
            </p>

            <p className={styles.description}><strong>Best time to visit:</strong> {bestTimeToVisit}</p>
            <p className={styles.description}><strong>History:</strong> {history}</p>
            <p className={styles.description}><strong>Tips:</strong> {tips}</p>

            <hr />

            <h5>Posted By</h5>
            <p className={styles.admindetails}><strong>Name:</strong> {postedBy?.name}</p>
            <p className={styles.admindetails}><strong>Email:</strong> {postedBy?.email}</p>
            <p className={styles.admindetails}><strong>Phone:</strong> {postedBy?.phone}</p>

            <hr />

            <div className={styles.mapSection}>
              <h4>Where you’ll be</h4>
              <div className={styles.mapContainer}>
                {loadingMap ? (
                  <p>Loading map...</p>
                ) : coordinates ? (
                  <LeafletMap
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    title={city}
                  />
                ) : (
                  <p>Map not available</p>
                )}
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <Button className={styles.backButton} onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
              </Button>

              <Button
                className={styles.editButton}
                onClick={() => navigate(`/admin/adminedit/${id}`)}
              >
                <PencilSquare /> Edit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminGetSinglePost;
