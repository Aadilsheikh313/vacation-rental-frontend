import React, { useEffect } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoMoonOutline } from "react-icons/io5";
import { FaEye, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../stylesModule/propertyView.module.css";
import { policesGet } from "../config/redux/action/policeyAction";

const Overview = () => {
    const dispatch = useDispatch();
    const { id: propertyId } = useParams();
    const { singlePost } = useSelector((state) => state.post);
    const { policy, } = useSelector((state) => state.policy);
    
      useEffect(() => {
        if (propertyId) {
            dispatch(policesGet(propertyId));
        }
    }, [dispatch, propertyId]);
    if (!singlePost) return <p>No details available</p>;

    return (
        <div className={styles.ClickOverviewLink}>
            {/* Left Section */}
            <div className={styles.leftConatiner}>
                <h3>Rooms Description</h3>
                <p className={styles.descriptionText}>
                    {singlePost.description}
                </p>

                <div className={styles.CardStyles}>
                    <div className={styles.card}>
                        <div className={styles.cardvalue}>
                            <FaUsers />
                            <p>
                                Max Occupancy <br />
                                <strong>{singlePost.maxGuests} Guests</strong>
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardvalue}>
                            <SlSizeFullscreen />
                            <p>
                                Room Size <br />
                                <strong>
                                    {singlePost.roomSize?.value || "N/A"}{" "}
                                    {singlePost.roomSize?.unit || ""}
                                </strong>
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardvalue}>
                            <IoMoonOutline />
                            <p>
                                Bed Type <br />
                                <strong>{singlePost.bedType || "N/A"}</strong>
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardvalue}>
                            <FaEye />
                            <p>
                                View <br />
                                <strong>
                                    {singlePost.views?.length > 0
                                        ? singlePost.views.join(", ")
                                        : "N/A"}
                                </strong>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className={styles.rightConatainer}>
                <div className={styles.statsBox}>
                    <h2>Quick Stats</h2>
                    <p>
                        <strong>Floor Level:</strong>{" "}
                        {singlePost.floorLevel || "N/A"}
                    </p>
                    <p>
                        <strong>Balcony:</strong> {singlePost.privacy}
                    </p>
                    <p>
                        <strong>Check-in:</strong>{" "}
                        {policy?.checkIn?.start || "N/A"} - {policy?.checkIn?.end || "N/A"}
                    </p>
                    <p>
                        <strong>Check-out:</strong>{" "}
                        {policy?.checkOut?.start || "N/A"} - {policy?.checkOut?.end || "N/A"}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Overview;
