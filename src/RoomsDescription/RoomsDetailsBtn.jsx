import React from "react";
import styles from "../stylesModule/propertyView.module.css"; 

const RoomsDescriptionBth = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.RoomsDesBth}>
      <button
        className={activeTab === "overview" ? styles.activeTab : ""}
        onClick={() => setActiveTab("overview")}
      >
        Overview
      </button>
      <button
        className={activeTab === "amenities" ? styles.activeTab : ""}
        onClick={() => setActiveTab("amenities")}
      >
        Amenities
      </button>
      <button
        className={activeTab === "policies" ? styles.activeTab : ""}
        onClick={() => setActiveTab("policies")}
      >
        Policies
      </button>
      <button
        className={activeTab === "reviews" ? styles.activeTab : ""}
        onClick={() => setActiveTab("reviews")}
      >
        Reviews
      </button>
    </div>
  );
};

export default RoomsDescriptionBth;
