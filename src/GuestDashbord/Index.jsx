import React, { useState } from "react";
import GuestDash from '../assets/GuestDash.jpg';
import GuestDashBTN from "./ButtonGuestDashBord";
import PastBooking from "./PastBooking";
import CurrentBooking from "./CurrentBooking";
import UpcommingBooking from "./UpcommingBooking";
import CancelBooking from "./CancelBooking";
import styles from "../stylesModule/Booking/Index.module.css";
import { useNavigate } from "react-router-dom";

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pastBooking");
  const handlaHomepage = () => {
    navigate("/");
  }
  return (
    <div className={styles.indexContainer}>
      <div className={styles.imageindex}>
        <img src={GuestDash} alt="Guest Dashboard Image" />
        <div className={styles.overlay}></div>
        <div className={styles.headindandpar}>
          <h2 className={styles.headingtext}>Your Bookings</h2>
          <p className={styles.subheading}>
            Track and manage all your stays in one place.
            View your <strong>past, current, upcoming</strong> and <strong>cancelled bookings</strong> anytime.
            Stay organized and never miss an update!
          </p>
          <input type="button" value="Home" onClick={handlaHomepage} /><strong className={styles.dash}> / Guest Dashboard</strong> 
        </div>
      </div>

      <div className={styles.Button}>
        <GuestDashBTN activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "pastBooking" && <PastBooking />}
        {activeTab === "activeBooking" && <CurrentBooking />}
        {activeTab === "upcommingBooking" && <UpcommingBooking />}
        {activeTab === "cancelBooking" && <CancelBooking />}
      </div>

    </div>
  );
};

export default GuestDashboard;
