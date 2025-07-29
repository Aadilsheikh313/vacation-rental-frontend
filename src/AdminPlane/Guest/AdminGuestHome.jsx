
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { getTotalGuestRegister } from "../../config/redux/action/adminGuestAction";

const AdminGuestHome = () => {
  const dispatch = useDispatch();

  const {
    totalGuestRegister,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHost);

  useEffect(() => {
    dispatch(getTotalGuestRegister());
  }, [dispatch]);

  return (
    <Row className="justify-content-center mt-4">
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card className="shadow-lg rounded-4 text-center">
          <Card.Body>
            <Card.Title className="fs-4 fw-bold text-primary">
              Total Registered Guest
            </Card.Title>

            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : isError ? (
              <p className="text-danger">{message}</p>
            ) : (
              <>
                <h2 className="display-4 text-success">{totalGuestRegister}</h2>
                <p className="text-muted">{message}</p>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminGuestHome;
