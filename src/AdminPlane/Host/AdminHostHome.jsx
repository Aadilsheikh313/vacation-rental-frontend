import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spinner, Row, Col, Container } from "react-bootstrap";
import { getTotalHostRegister } from "../../config/redux/action/adminHostAction";
import AdminButtonTop from "./AdminTopButton";
import { useState } from "react";
import AdminGetAllHost from "./AdminGetAllHosts";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";
import AdminGetActvieAllHost from "./AdminGetActiveHosts";
import AdminGetOnlineAllHost from "./AdminGetOnlineHosts";
import AdminGetNewAllHost from "./AdminGetNewHosts";
import AdminGetLogoutAllHost from "./AdminGetLogoutHosts";
import AdminGetBannedAllHost from "./AdminGetBannedHosts";

const AdminHostHome = () => {
  const [selectedView, setSelectedView] = useState("all");
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
    return () => {
      dispatch(resetAdminHostState());
    };
  }, [dispatch]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-lg rounded-4 text-center">
            <Card.Body>
              <Card.Title className="fs-4 fw-bold text-primary">
                Total Registered Hosts : {totalHostRegister}
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

      <AdminButtonTop onSelectView={setSelectedView} />

      {/* Conditional Views */}
      {selectedView === "all" && <AdminGetAllHost/>}
      {selectedView === "active" && <AdminGetActvieAllHost/>}
      {selectedView === "online" && <AdminGetOnlineAllHost/>}
      {selectedView === "newRegister" && <AdminGetNewAllHost/>}
      {selectedView === "logout" && <AdminGetLogoutAllHost/>}
      {selectedView === "banned" && <AdminGetBannedAllHost/>}
    </Container>
  );
};

export default AdminHostHome;
