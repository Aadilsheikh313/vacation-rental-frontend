import React, { useState } from "react";
import { motion } from "framer-motion";
import './PlanMyTrip.css';

const PlanMyTrip = () => {
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    guests: 1
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(tripData);
  };

  return (
    <div className="plan-trip-container">
      <div className="overlay">
        <div className="content-wrapper container text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="main-heading"
          >
            Plan Your Escape
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="sub-text"
          >
            Don’t wait for the perfect moment — create it with your next trip.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="quote-text"
          >
            “Some trips are booked. Others are born in the heart.”
          </motion.p>

          <form className="trip-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={tripData.destination}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="startDate"
              value={tripData.startDate}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={tripData.endDate}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="guests"
              placeholder="Guests"
              value={tripData.guests}
              onChange={handleChange}
              min="1"
              required
            />
            <button type="submit">Plan Now</button>
          </form>

          {submittedData && (
            <div className="result">
              <h3>Your Plan Summary:</h3>
              <p><strong>Destination:</strong> {submittedData.destination}</p>
              <p><strong>Start Date:</strong> {submittedData.startDate}</p>
              <p><strong>End Date:</strong> {submittedData.endDate}</p>
              <p><strong>Guests:</strong> {submittedData.guests}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;
