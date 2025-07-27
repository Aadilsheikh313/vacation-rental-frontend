import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const CustomButtonTop = ({ onSelectView }) => {
  return (
    <div className="d-flex justify-content-center my-3">
      <ButtonGroup>
        <Button variant="primary" onClick={() => onSelectView("all")}>All Property</Button>
        <Button variant="success" onClick={() => onSelectView("active")}>Active Booking Property</Button>
        <Button variant="danger" onClick={() => onSelectView("cancelled")}>Cancelled Property</Button>
        <Button variant="warning" onClick={() => onSelectView("upcoming")}>Upcoming Booking Property</Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomButtonTop;
