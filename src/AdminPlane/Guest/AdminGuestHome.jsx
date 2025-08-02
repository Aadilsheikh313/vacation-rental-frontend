import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spinner, Row, Col, Container } from "react-bootstrap";
import { getTotalGuestRegister } from "../../config/redux/action/adminGuestAction";
import AdminButtonTop from "./AdminTopButton";
import { useState } from "react";
import AdminGetAllGuest from "./AdminGetAllGUests";
import AdminGetActiveGuest from "./AdminGetActiveGuest";
import AdminGetDailyActiveGuest from "./AdminGetDailyActiveGuest";
import AdminGetOnlineGuest from "./AdminGetOnlineGuests";
import AdminGetBannedGuest from "./AdminGetBannedGuests";
import AdminGetNewRegisterGuest from "./AdminGetNewRegisterGuest";
import AdminGetLogoutGuest from "./AdminGetLogoutGuests";

const AdminGuestHome = () => {
  const [selectedView, setSelectedView] = useState("all");
  const dispatch = useDispatch();

  const {
    totalGuestRegister,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminGuest);

  useEffect(() => {
    dispatch(getTotalGuestRegister());
  }, [dispatch]);

  return (
    <Container className="py-4">
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

      <AdminButtonTop onSelectView={setSelectedView} />

      {/* Conditional Views */}
      {selectedView === "all" && <AdminGetAllGuest/>}
       {selectedView === "active" && <AdminGetActiveGuest/>}
       {selectedView === "dailyactive" && <AdminGetDailyActiveGuest/>}
          {selectedView === "online" && <AdminGetOnlineGuest/>}
          {selectedView === "newRegister" && <AdminGetLogoutGuest/>}
          {selectedView === "logout" && <AdminGetNewRegisterGuest/>}
          {selectedView === "banned" && <AdminGetBannedGuest/>}
        
    </Container>
  );
};

export default AdminGuestHome;
