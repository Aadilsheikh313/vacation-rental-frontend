import React from "react";
import { motion } from "framer-motion";
import "./TopSpots.css";

const travelSpots = [
  {
    name: "Goa",
    reason: "Famous for beaches, nightlife, and water sports.",
    visitors: "Over 8 million tourists every year.",
    experience: "Best for beach parties, relaxation, and seafood."
  },
  {
    name: "Manali, Himachal Pradesh",
    reason: "Snow-capped mountains, adventure sports, and scenic beauty.",
    visitors: "About 2.5 million tourists yearly.",
    experience: "Great for paragliding, trekking, and snow experiences."
  },
  {
    name: "Jaipur, Rajasthan",
    reason: "Known for forts, palaces, and royal heritage.",
    visitors: "Around 3 million+ tourists annually.",
    experience: "Explore Hawa Mahal, Amber Fort, and vibrant bazaars."
  },
  {
    name: "Kerala (Alleppey, Munnar, Kochi)",
    reason: "Backwaters, hill stations, and Ayurveda.",
    visitors: "Over 10 million domestic & 1 million foreign tourists yearly.",
    experience: "Houseboat stays, tea gardens, and massages."
  },
  {
    name: "Ladakh, Jammu & Kashmir",
    reason: "High-altitude deserts, monasteries, and bike trips.",
    visitors: "About 3-4 lakh adventurous tourists yearly.",
    experience: "Ideal for road trips, photography, and peace."
  },
  {
    name: "Agra, Uttar Pradesh",
    reason: "Home to the Taj Mahal — one of the Seven Wonders.",
    visitors: "Over 7-8 million tourists per year.",
    experience: "Cultural heritage and Mughal architecture."
  },
  {
    name: "Varanasi, Uttar Pradesh",
    reason: "India’s spiritual capital on the banks of Ganges.",
    visitors: "6 million+ pilgrims and tourists every year.",
    experience: "Ganga Aarti, temple visits, and old city life."
  },
];

const TopSpots = () => {
  return (
    <div className="topspots-container text-white py-5 px-3">
      <motion.h1
        className="text-center fw-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Top Travel Spots in India 🇮🇳
      </motion.h1>

      <div className="row g-4">
        {travelSpots.map((spot, index) => (
          <motion.div
            key={index}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <div className="card bg-dark text-white h-100 shadow-lg rounded-4 p-3 border border-success">
              <h3 className="text-warning">{spot.name}</h3>
              <p><strong>Why Famous:</strong> {spot.reason}</p>
              <p><strong>Visitors:</strong> {spot.visitors}</p>
              <p><strong>Experience:</strong> {spot.experience}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopSpots;
