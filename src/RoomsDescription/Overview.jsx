import React, { useEffect } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoMoonOutline } from "react-icons/io5";
import { FaEye, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePosts } from "../config/redux/action/propertyAction";
import { resetSinglePost } from "../config/redux/reducer/propertyReducer";
import { Card } from "react-bootstrap";
import styles from "../stylesModule/propertyView.module.css";

const Overview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getSinglePosts(id));
    return () => dispatch(resetSinglePost());
  }, [dispatch, id]);

  if (!singlePost) return <p>No details available</p>;

  return (
    <div className={styles.ClickOverviewLink}>
      <h3>Rooms Description</h3>
      <div className={styles.leftConatiner}>
        <p>
          <strong>Description:</strong> {singlePost.description}
        </p>
        <div className={styles.CardStyles}>
          <Card>
            <FaUsers />
            <p>
              Max Occupancy <strong>{singlePost.maxGuests} Guests</strong>
            </p>
          </Card>
          <Card>
  <SlSizeFullscreen />
  <p>
    Room Size{" "}
    <strong>
      {singlePost.roomSize?.value || "N/A"} {singlePost.roomSize?.unit || ""}
    </strong>
  </p>
</Card>

<Card>
  <IoMoonOutline />
  <p>
    Bed Type <strong>{singlePost.bedType?.type || "N/A"}</strong>
  </p>
</Card>

<Card>
  <FaEye />
  <p>
    View <strong>{singlePost.viewType?.name || "N/A"}</strong>
  </p>
</Card>

        </div>
      </div>

      <div className={styles.rightConatainer}>
        <Card>
          <h2>Quick Stats</h2>
          <p>
            <strong>Floor Level:</strong> {singlePost.floorLevel || "N/A"}
          </p>
          <p>
            <strong>Balcony:</strong> {singlePost.privacy}
          </p>
          <p>
            <strong>Check-in:</strong> {singlePost.checkIn || "N/A"}
          </p>
          <p>
            <strong>Check-out:</strong> {singlePost.checkOut || "N/A"}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
