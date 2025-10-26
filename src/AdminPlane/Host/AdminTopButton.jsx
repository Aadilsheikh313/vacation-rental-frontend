import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const AdminButtonTop = ({ onSelectView }) => {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 my-3 flex-wrap">
        <Button variant="primary" onClick={() => onSelectView("all")}>
          All Host
        </Button>
        <Button variant="warning" onClick={() => onSelectView("newRegister")}>
          All Pending Host
        </Button>
         <Button variant="warning" onClick={() => onSelectView("Verify")}>
          Verify
        </Button>
         <Button variant="warning" onClick={() => onSelectView("Reject")}>
          Reject
        </Button>
        <Button variant="success" onClick={() => onSelectView("active")}>
          Active Host
        </Button>
        <Button variant="danger" onClick={() => onSelectView("online")}>
          Online Host
        </Button>

        <Button variant="info" onClick={() => onSelectView("logout")}>
          Logout Host
        </Button>
        <Button variant="dark" onClick={() => onSelectView("banned")}>
          Banned Host
        </Button>
      </div>
    </div>
  );
};

export default AdminButtonTop;
