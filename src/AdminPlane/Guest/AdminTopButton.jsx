import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const AdminButtonTop = ({ onSelectView }) => {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 my-3 flex-wrap">
        <Button variant="primary" onClick={() => onSelectView("all")}>
          All Guests
        </Button>
        <Button variant="success" onClick={() => onSelectView("active")}>
          Active Guests
        </Button>
        <Button variant="success" onClick={() => onSelectView("dailyactive")}>
          Daily Active Guests
        </Button>
        <Button variant="danger" onClick={() => onSelectView("online")}>
          Online Guests
        </Button>
        <Button variant="warning" onClick={() => onSelectView("newRegister")}>
          New Register Guests
        </Button>
        <Button variant="info" onClick={() => onSelectView("logout")}>
          Logout Guests
        </Button>
        <Button variant="dark" onClick={() => onSelectView("banned")}>
          Banned Guests
        </Button>
      </div>
    </div>
  );
};

export default AdminButtonTop;
