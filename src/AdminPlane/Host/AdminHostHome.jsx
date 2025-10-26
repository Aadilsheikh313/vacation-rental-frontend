import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
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
import GetAllVerifyHost from "./AdminGetAllVerify";
import GetAllRejectedHost from "./AdminGetAllReject";

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
          <Button>Verifed/Reject User</Button>
        </Col>
      </Row>

      <AdminButtonTop onSelectView={setSelectedView} />

      {/* Conditional Views */}
      {selectedView === "all" && <AdminGetAllHost/>}
      {selectedView === "active" && <AdminGetActvieAllHost/>}
      {selectedView === "Verify" && <GetAllVerifyHost/>}
      {selectedView === "Reject" && <GetAllRejectedHost/>}
      {selectedView === "online" && <AdminGetOnlineAllHost/>}
      {selectedView === "newRegister" && <AdminGetNewAllHost/>}
      {selectedView === "logout" && <AdminGetLogoutAllHost/>}
      {selectedView === "banned" && <AdminGetBannedAllHost/>}
    </Container>
  );
};

export default AdminHostHome;
