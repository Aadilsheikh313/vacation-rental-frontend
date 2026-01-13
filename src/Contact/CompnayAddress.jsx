import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaPaperPlane,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import styles from "../stylesModule/ContactModule/ContactModule.module.css";

const CompanyAddress = () => {
  return (
    <div className={styles.contactWrapper}>
      {/* LEFT: COMPANY INFO */}
      <div className={styles.infoCard}>
        <h2 className={styles.title}>
          <FaBuilding className={styles.titleIcon} />
          Our Company Headquarters
        </h2>

        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>
            SkyTower Business Bay,<br />
            Bandra Kurla Complex,<br />
            Mumbai, Maharashtra 400051
          </span>
        </div>

        {/* CLICK TO EMAIL */}
        <div className={styles.infoRow}>
          <FaEnvelope className={styles.icon} />
          <a
            href="mailto:support@luxstay.com"
            className={styles.link}
          >
            support@luxstay.com
          </a>
        </div>

        {/* CLICK TO CALL */}
        <div className={styles.infoRow}>
          <FaPhoneAlt className={styles.icon} />
          <a
            href="tel:+919876543210"
            className={styles.link}
          >
            +91 98765 43210
          </a>
        </div>
      </div>

      {/* RIGHT: MAP + INQUIRY */}
      <div className={styles.mapCard}>
        <h3 className={styles.mapTitle}>
          <FaMapLocationDot /> Find Us on Map
        </h3>

        {/* GOOGLE MAP */}
        <iframe
          title="Company Location"
          src="https://www.google.com/maps?q=Bandra%20Kurla%20Complex%20Mumbai&output=embed"
          loading="lazy"
          className={styles.mapFrame}
        ></iframe>

        {/* INQUIRY FORM */}
        <div className={styles.inquiryBox}>
          <h4>Send an Inquiry</h4>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>

          <button>
            <FaPaperPlane /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAddress;
