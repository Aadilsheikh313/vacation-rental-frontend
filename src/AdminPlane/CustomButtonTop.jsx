import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const CustomButtonTop = ({ onSelectView }) => {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 my-3 flex-wrap">
        <Button variant="primary" onClick={() => onSelectView("all")}>
          All Property
        </Button>
        <Button variant="success" onClick={() => onSelectView("active")}>
          Active Booking Property
        </Button>
        <Button variant="danger" onClick={() => onSelectView("cancelled")}>
          Cancelled Property
        </Button>
        <Button variant="warning" onClick={() => onSelectView("upcoming")}>
          Upcoming Booking Property
        </Button>
        <Button variant="info" onClick={() => onSelectView("pastbooking")}>
          Past Booking Property
        </Button>
      </div>
    </div>
  );
};

export default CustomButtonTop;
