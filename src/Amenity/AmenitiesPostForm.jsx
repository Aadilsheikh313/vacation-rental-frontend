import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { amenitiesPost } from "../config/redux/action/amenityAction";
import styles from "../stylesModule/Amenites/AmenitesPost.module.css";
import { motion } from "framer-motion";
import { resetAmenity } from "../config/redux/reducer/amenityReducer";
import { getSinglePosts } from "../config/redux/action/propertyAction";

const AmenitiesForm = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { amenities, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.amenity
  );


  const [formData, setFormData] = useState({});




  // ✅ Set form values from fetched data
  useEffect(() => {
    if (amenities) {
      setFormData(amenities);
    }
  }, [amenities]);

  // ✅ Handle checkbox change
  const handleChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  // ✅ Create amenities
  
const handleCreate = (e) => {
  e.preventDefault();
  dispatch(amenitiesPost({ propertyId, amenitiesData: formData }))
    .unwrap()
    .then(() => {
      // ✅ Amenities post hone ke baad single property ko reload kar lo
      dispatch(getSinglePosts(propertyId));
    });
  dispatch(resetAmenity());
};

  // ✅ Checkbox Component with Animation
  const AnimatedCheckbox = ({ category, field, label }) => (
    <motion.label
      // whileTap={{ scale: 0.9 }}
      // whileHover={{ scale: 1.05 }}
      className={styles.checkboxLabel}
    >
      <input
        type="checkbox"
        checked={formData?.[category]?.[field] || false}
        onChange={(e) => handleChange(category, field, e.target.checked)}
      />
      <motion.span
        animate={{
          // opacity: formData?.[category]?.[field] ? 1 : 0.5,
          // scale: formData?.[category]?.[field] ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.label>
  );

  return (
    <form className={styles.AmenitiesConatainer}>
      <h2 className={styles.sectionTitle}>Amenities</h2>

      {/* Bedroom & Living */}
      <div className={styles.Bedroomandliving}>
        <h3>Bedroom & Living</h3>
        <AnimatedCheckbox category="bedroomLiving" field="kingBed" label="King Bed" />
        <AnimatedCheckbox category="bedroomLiving" field="livingArea" label="Living Area" />
        <AnimatedCheckbox category="bedroomLiving" field="workDesk" label="Work Desk" />
        <AnimatedCheckbox category="bedroomLiving" field="walkInCloset" label="Walk-in Closet" />
        <AnimatedCheckbox category="bedroomLiving" field="blackoutCurtains" label="Blackout Curtains" />
        <AnimatedCheckbox category="bedroomLiving" field="airConditioning" label="Air Conditioning" />
        <AnimatedCheckbox category="bedroomLiving" field="privateBalcony" label="Private Balcony" />
        <AnimatedCheckbox category="bedroomLiving" field="fireplace" label="Fireplace" />
        <AnimatedCheckbox category="bedroomLiving" field="soundproofRoom" label="Soundproof Room" />
      </div>

      {/* Entertainment */}
      <div className={styles.Entertainment}>
        <h3>Entertainment</h3>
        <AnimatedCheckbox category="entertainment" field="smartTV" label="Smart TV" />
        <AnimatedCheckbox category="entertainment" field="cable" label="Cable" />
        <AnimatedCheckbox category="entertainment" field="bluetooth" label="Bluetooth" />
        <AnimatedCheckbox category="entertainment" field="wifi" label="Wi-Fi" />
        <AnimatedCheckbox category="entertainment" field="homeTheater" label="Home Theater" />
        <AnimatedCheckbox category="entertainment" field="streamingServices" label="Streaming Services" />
        <AnimatedCheckbox category="entertainment" field="gamingConsole" label="Gaming Console" />
      </div>

      {/* Bathroom */}
      <div className={styles.Bathroom}>
        <h3>Bathroom</h3>
        <AnimatedCheckbox category="bathroom" field="marbleBathroom" label="Marble Bathroom" />
        <AnimatedCheckbox category="bathroom" field="soakingTub" label="Soaking Tub" />
        <AnimatedCheckbox category="bathroom" field="rainShower" label="Rain Shower" />
        <AnimatedCheckbox category="bathroom" field="doubleVanity" label="Double Vanity" />
        <AnimatedCheckbox category="bathroom" field="toiletries" label="Toiletries" />
        <AnimatedCheckbox category="bathroom" field="heatedFloors" label="Heated Floors" />
        <AnimatedCheckbox category="bathroom" field="jacuzzi" label="Jacuzzi" />
        <AnimatedCheckbox category="bathroom" field="sauna" label="Sauna" />
        <AnimatedCheckbox category="bathroom" field="steamRoom" label="Steam Room" />
        <AnimatedCheckbox category="bathroom" field="bidet" label="Bidet" />
      </div>

      {/* Services & Extras */}
      <div className={styles.ServicecAndExtras}>
        <h3>Services & Extras</h3>
        <AnimatedCheckbox category="services" field="roomService" label="Room Service" />
        <AnimatedCheckbox category="services" field="housekeeping" label="Housekeeping" />
        <AnimatedCheckbox category="services" field="concierge" label="Concierge" />
        <AnimatedCheckbox category="services" field="miniBar" label="Mini Bar" />
        <AnimatedCheckbox category="services" field="coffeeMaker" label="Coffee Maker" />
        <AnimatedCheckbox category="services" field="safeDeposit" label="Safe Deposit" />
        <AnimatedCheckbox category="services" field="privateChef" label="Private Chef" />
        <AnimatedCheckbox category="services" field="spaService" label="Spa Service" />
        <AnimatedCheckbox category="services" field="airportPickup" label="Airport Pickup" />
        <AnimatedCheckbox category="services" field="valetParking" label="Valet Parking" />
      </div>

      {/* Wellness */}
      <div className={styles.Wellness}>
        <h3>Wellness</h3>
        <AnimatedCheckbox category="wellness" field="privatePool" label="Private Pool" />
        <AnimatedCheckbox category="wellness" field="garden" label="Garden" />
        <AnimatedCheckbox category="wellness" field="yogaSpace" label="Yoga Space" />
        <AnimatedCheckbox category="wellness" field="bbqArea" label="BBQ Area" />
      </div>

      {/* Smart Features */}
      <div className={styles.SmartFeatures}>
        <h3>Smart Features</h3>
        <AnimatedCheckbox category="smartFeatures" field="smartControl" label="Smart Control" />
        <AnimatedCheckbox category="smartFeatures" field="voiceAssistant" label="Voice Assistant" />
        <AnimatedCheckbox category="smartFeatures" field="wirelessCharging" label="Wireless Charging" />
        <AnimatedCheckbox category="smartFeatures" field="keylessEntry" label="Keyless Entry" />
      </div>

      {/* Business */}
      <div className={styles.Business}>
        <h3>Business</h3>
        <AnimatedCheckbox category="business" field="conferenceRoom" label="Conference Room" />
        <AnimatedCheckbox category="business" field="printerScanner" label="Printer & Scanner" />
        <AnimatedCheckbox category="business" field="wiredInternet" label="Wired Internet" />
        <AnimatedCheckbox category="business" field="monitorWorkspace" label="Monitor Workspace" />
      </div>

      {/* Submit Buttons */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isLoading}
          className={styles.createBtn}
        >
          {isLoading ? "Creating..." : "Create Amenities"}
        </button>
      </div>

      {/* Status Messages */}
      {(isSuccess || isError) && (
        <p className={isError ? styles.errorMsg : styles.successMsg}>
          {message}
        </p>
      )}
    </form>
  );
};

export default AmenitiesForm;
