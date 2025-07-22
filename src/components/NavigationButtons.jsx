import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkedAlt,
  FaStar,
  FaSuitcaseRolling,
  FaUtensils,
} from "react-icons/fa";
import styles from "../stylesModule/NavigationButton.module.css";

const NavigationButtons = () => {
  return (
    <div className={styles.buttonWrapper}>
      <Link to="/explore/properties" className={styles.customButton}>
        <FaHome /> Explore Stays
      </Link>
      <Link to="/explore" className={styles.customButton}>
        <FaMapMarkedAlt /> Tourist Places
      </Link>
      <Link to="/top-spots" className={styles.customButton}>
        <FaStar /> Top Spots
      </Link>
      <Link to="/plan-my-trip" className={styles.customButton}>
        <FaSuitcaseRolling /> Plan My Trip
      </Link>
      <Link to="/testy-food" className={styles.customButton}>
        <FaUtensils /> Food & Fun
      </Link>
    </div>
  );
};

export default NavigationButtons;
