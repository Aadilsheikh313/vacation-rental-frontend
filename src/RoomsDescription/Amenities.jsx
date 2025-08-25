import React from "react";
import styles from "../stylesModule/propertyView.module.css";

const Amenities = () => {
    return (
        <div className={styles.AmenitiesConatainer}>
            <div className={styles.Bedroomandliving}>
                <h3>Bedroom & Living</h3>
            </div>
            <div className={styles.Entertainment}>
                <h3>Entertainment</h3>
            </div>
            <div className={styles.Bathroom}>
                <h3>Bathroom</h3>
            </div>
            <div className={styles.ServicecAndExtras}>
                <h3>Services & Extras</h3>
            </div>
        </div>
    )
}

export default Amenities;