import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../stylesModule/propertyView.module.css";
import { motion } from "framer-motion";
import { amenitiesGet } from "../config/redux/action/amenityAction";

const Amenities = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { amenities, isLoading } = useSelector((state) => state.amenity);

  useEffect(() => {
    if (propertyId) {
      dispatch(amenitiesGet(propertyId));
    }
  }, [dispatch, propertyId]);

  // ✅ helper function: ticked values hi show kare
  const renderAmenities = (categoryName, categoryData) => {
    if (!categoryData) return null;

    const ticked = Object.entries(categoryData).filter(([_, value]) => value === true);

    if (ticked.length === 0) return null;

    return (
      <div className={styles[categoryName]}>
        <h3>{formatTitle(categoryName)}</h3>
        <div className={styles.amenityItems}>
          {ticked.map(([field], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={styles.amenityItem}
            >
              ✅ {formatLabel(field)}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ✅ format for heading
  const formatTitle = (key) => {
    switch (key) {
      case "bedroomLiving":
        return "Bedroom & Living";
      case "entertainment":
        return "Entertainment";
      case "bathroom":
        return "Bathroom";
      case "services":
        return "Services & Extras";
      case "wellness":
        return "Wellness";
      case "smartFeatures":
        return "Smart Features";
      case "business":
        return "Business";
      default:
        return key;
    }
  };

  // ✅ format for field names
  const formatLabel = (field) =>
    field
      .replace(/([A-Z])/g, " $1") // camelCase to normal text
      .replace(/^./, (str) => str.toUpperCase());

  if (isLoading) return <p>Loading amenities...</p>;

  return (
    <div className={styles.AmenitiesConatainer}>
      {renderAmenities("bedroomLiving", amenities?.bedroomLiving)}
      {renderAmenities("entertainment", amenities?.entertainment)}
      {renderAmenities("bathroom", amenities?.bathroom)}
      {renderAmenities("services", amenities?.services)}
      {renderAmenities("wellness", amenities?.wellness)}
      {renderAmenities("smartFeatures", amenities?.smartFeatures)}
      {renderAmenities("business", amenities?.business)}
    </div>
  );
};

export default Amenities;
