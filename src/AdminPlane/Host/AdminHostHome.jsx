import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import AdminButtonTop from "./AdminTopButton";
import { useState } from "react";
import AdminGetAllHost from "./AdminGetAllHosts";
import AdminGetActvieAllHost from "./AdminGetActiveHosts";
import AdminGetOnlineAllHost from "./AdminGetOnlineHosts";
import AdminGetNewAllHost from "./AdminGetNewHosts";
import AdminGetLogoutAllHost from "./AdminGetLogoutHosts";
import AdminGetBannedAllHost from "./AdminGetBannedHosts";
import GetAllVerifyHost from "./AdminGetAllVerify";
import GetAllRejectedHost from "./AdminGetAllReject";

const AdminHostHome = () => {
  const [selectedView, setSelectedView] = useState("all");

  return (
    <Container className="py-4">

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
