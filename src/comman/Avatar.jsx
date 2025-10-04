import React from "react";
import "./Avatar.css"; // Import the CSS file for styling

const Avatar = ({ user }) => {

 if (user?.avatar?.url) {
    return (
      <img
        src={user.avatar.url}
        alt={user.name}
        className="custom-avatar-img"
      />
    );
  }

  const initial = user?.initials || "?"; 
  return <div className="custom-avatar-letter">{initial}</div>; 
}; 
export default Avatar;
