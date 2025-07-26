import React from "react";
import "./Avatar.css"; // for styling

const Avatar = ({ user }) => {
  if (user?.profileImage?.url) {
    return (
      <img
        src={user.profileImage.url}
        alt={user.name}
        className="custom-avatar-img"
      />
    );
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";
  return <div className="custom-avatar-letter">{initial}</div>;
};

export default Avatar;
