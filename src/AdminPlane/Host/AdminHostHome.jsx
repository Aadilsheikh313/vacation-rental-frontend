import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { getTotalHostRegister } from "../../config/redux/action/adminHostAction";

const AdminHostHome = () => {
  const dispatch = useDispatch();

  const {
    totalHostRegister,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHost);

  useEffect(() => {
    dispatch(getTotalHostRegister());
  }, [dispatch]);

  return (
    <Row className="justify-content-center mt-4">
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card className="shadow-lg rounded-4 text-center">
          <Card.Body>
            <Card.Title className="fs-4 fw-bold text-primary">
              Total Registered Hosts
            </Card.Title>

            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : isError ? (
              <p className="text-danger">{message}</p>
            ) : (
              <>
                <h2 className="display-4 text-success">{totalHostRegister}</h2>
                <p className="text-muted">{message}</p>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminHostHome;
