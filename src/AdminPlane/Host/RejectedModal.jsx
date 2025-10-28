import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const RejectedModal = ({ show, onClose, onSubmit }) => {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit(note);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reject Host</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please provide a reason for rejecting this host.</p>
        <Form.Group>
          <Form.Label>Rejection Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Reason for rejection..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Reject Host
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectedModal;
