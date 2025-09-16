import React from "react";
import styles from '../stylesModule/Booking/GuestCustomBTN.module.css'
const GuestDashBTN = ({ activeTab, setActiveTab }) => {
    return (
        <div className={styles.BTNContainer}>
            <button className={activeTab === "pastBooking" ? styles.activeTab : ''}
                onClick={() => setActiveTab("pastBooking")}>
                History Bookings
            </button>

            <button className={activeTab === 'activeBooking' ? styles.activeTab : ''}
                onClick={() => setActiveTab('activeBooking')}>
                Current Booking
            </button>
             <button className={activeTab === 'upcommingBooking' ? styles.activeTab : ''}
                onClick={() => setActiveTab('upcommingBooking')}>
                Upcomming Booking
            </button>
             <button className={activeTab === 'cancelBooking' ? styles.activeTab : ''}
                onClick={() => setActiveTab('cancelBooking')}>
                  Cancel Booking
            </button>

        </div>
    )
}

export default GuestDashBTN;