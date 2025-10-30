import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ReverifiedAction } from "../../config/redux/action/adminVerifedHostAction";
import { showError, showInfo, showSuccess } from "../../utils/toastUtils";

const ReVerifationModel = ({ show, onClose, hostId }) => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const handleReverify = async () => {
    if (!note.trim()) {
      showInfo("Please enter a reason for reverification!");
      return;
    }

    try {
      await dispatch(ReverifiedAction({ hostId, action: "reverify", note })).unwrap();
      showSuccess("✅ Host reverified successfully!");
      onClose(); // Close modal
    } catch (error) {
      showError(`❌ ${error}`);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reverify Host</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Please provide a reason for reverifying this host.</p>
        <Form.Group>
          <Form.Label>Reverification Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Reason for reverification..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleReverify}>
          Confirm Reverification
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReVerifationModel;
