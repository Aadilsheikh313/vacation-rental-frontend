import React from "react";

const ExperienceHub = () => {
  return (
    <div className="experience-hub" style={styles.container}>
      <h2 style={styles.heading}>🌍 Explore Real Travel Stories</h2>
      <p style={styles.paragraph}>
        Dive into the memories of our amazing travelers — stories filled with laughter, adventure, and unforgettable views. 
        Get inspired by their journeys, and when you're ready, share your own!
      </p>
      <p style={styles.invite}>
        ✨ Your next travel memory could inspire someone else. <br />
        <strong>Be the story. Post your Trip Moments today!</strong>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
    borderRadius: "12px",
    textAlign: "center",
    margin: "20px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#00796b",
  },
  paragraph: {
    fontSize: "1.1rem",
    color: "#444",
    marginBottom: "10px",
  },
  invite: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#004d40",
  },
};

export default ExperienceHub;
