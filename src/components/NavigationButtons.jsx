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
        <FaHome /> EXPLORE ROOM
      </Link>
      <Link to="/explore" className={styles.customButton}>
        <FaMapMarkedAlt /> TOURIST PLACEES
      </Link>
      <Link to="/top-spots" className={styles.customButton}>
        <FaStar /> TOP SPOTS
      </Link>
      <Link to="/plan-my-trip" className={styles.customButton}>
        <FaSuitcaseRolling /> PLAN MY TRIP
      </Link>
      <Link to="/testy-food" className={styles.customButton}>
        <FaUtensils /> FOOD & FUN
      </Link>
    </div>
  );
};

export default NavigationButtons;
