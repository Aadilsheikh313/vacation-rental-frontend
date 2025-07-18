import React from "react";

const PostTripMoments = () => {
  return (
    <div className="post-trip-container" style={{ 
      padding: "40px", 
      background: "linear-gradient(to right, #fefcea, #f1da36)", 
      borderRadius: "20px", 
      textAlign: "center" 
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Share Your Story 🌍</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", color: "#444" }}>
        Every journey holds a story, a memory, a feeling.  
        <br /><br />
        🌟 Whether it was a spontaneous adventure or a long-awaited vacation, your moments matter. <br />
        📸 Share your favorite photos, 📹 short videos, or 📝 thoughts from the trip that touched your heart.
        <br /><br />
        Inspire others, connect souls, and relive the magic. Because the world deserves to see what you've seen.
      </p>

      <button 
        style={{ 
          marginTop: "30px", 
          padding: "12px 25px", 
          fontSize: "1rem", 
          borderRadius: "8px", 
          backgroundColor: "#ff6f61", 
          color: "#fff", 
          border: "none", 
          cursor: "pointer" 
        }}
      >
        ✨ Share Your Moment
      </button>
    </div>
  );
};

export default PostTripMoments;
