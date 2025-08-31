import React from "react";
import styles from "../stylesModule/getAllRooms.module.css";
import RoomsDetails from "../assets/RoomsDetails.jpg";
import { Button, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


// ✅ Simple custom checkbox component
const AnimatedCheckbox = ({ label }) => {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" style={{ accentColor: "#f4b400" }} />
            {label}
        </label>
    );
};

const GetAllRooms = () => {
    const navigate = useNavigate();
    const handleclickHome = () => navigate("/");

    return (
        <div className={styles.Container}>
            <div className={styles.imageRooms}>
                <img src={RoomsDetails} alt="Rooms " />
            </div>

            <div className={styles.overlay}>
                <div className={styles.Roomstext}>
                    <h3>Rooms</h3>
                    <p>
                        Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat
                        quibusdam quia assumenda numquam molestias.
                    </p>
                </div>
                <div className={styles.breadcrumb}>
                    <input type="button" value="Home" onClick={handleclickHome} /> / Room
                </div>
            </div>

            <div className={styles.leftNavbarCard}>
                <div className={styles.leftCardFilterPrice}>
                    <FormGroup className={styles.formData}>
                        <FormLabel>Price</FormLabel>
                        <FormSelect>
                            <option>All Price</option>
                            <option>500-1500</option>
                            <option>1500-4000</option>
                            <option>4000+</option>
                        </FormSelect>
                    </FormGroup>
                </div>

                <div className={styles.leftCardFilterRoomCapacity}>
                    <FormGroup className={styles.formData}>
                        <FormLabel>Rooms Capacity</FormLabel>
                        <FormSelect>
                            <option>Any Capacity</option>
                            <option>1-2 Guest</option>
                            <option>2-4 Guest</option>
                            <option>5+ Guest</option>
                        </FormSelect>
                    </FormGroup>
                </div>

                <div className={styles.leftCardFilterRoomView}>
                    <FormGroup className={styles.formData}>
                        <FormLabel>View Type</FormLabel>
                        <FormSelect>
                            <option>All View</option>
                            <option>Ocean View</option>
                            <option>Garden View</option>
                            <option>City View</option>
                            <option>Mountain View</option>
                            <option>Beach View</option>
                        </FormSelect>
                    </FormGroup>
                </div>

                <div className={styles.leftCardFilterRoomFeatures}>
                    <h3>Room Features</h3>
                    <AnimatedCheckbox label="King Bed" />
                    <AnimatedCheckbox label="Living Area" />
                    <AnimatedCheckbox label="Work Desk" />
                    <AnimatedCheckbox label="Free Wi-Fi" />
                    <AnimatedCheckbox label="Air Conditioning" />
                    <AnimatedCheckbox label="Private Balcony" />
                    <AnimatedCheckbox label="Fireplace" />
                    <AnimatedCheckbox label="Soundproof Room" />
                </div>
            </div>
            <div className={styles.applyFilterBtn}>
                <Button>Apply Filters</Button>
            </div>
            <div className={styles.rightContainerAllPropertyCard}>
                <div className={styles.CountTotalRooms}>
                    <p>Showing 6 rooms</p>
                    <FormGroup className={styles.Featured}>
                        <FormSelect>
                            <option>Sort by: Featured</option>
                            <option>Price : Low to High</option>
                            <option>Price : High to Low</option>
                            <option>Guest Rating</option>
                        </FormSelect>
                    </FormGroup>
                </div>
                <hr />
                <h3>Get All Property</h3>
            </div>
        </div>
    );
};

export default GetAllRooms;
