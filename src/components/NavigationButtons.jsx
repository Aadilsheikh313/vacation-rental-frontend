import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkedAlt,
} from "react-icons/fa";
import styles from "../stylesModule/NavigationButton.module.css";

const NavigationButtons = () => {
  return (
    <div className={styles.buttonWrapper}>
      <Link to="/explore/properties" className={styles.customButton}>
        <FaHome /> EXPLORE ROOM
      </Link>
      <Link to="/explore" className={styles.customButton}>
        <FaMapMarkedAlt /> TOURIST PLACEES
      </Link>
    </div>
  );
};

export default NavigationButtons;
