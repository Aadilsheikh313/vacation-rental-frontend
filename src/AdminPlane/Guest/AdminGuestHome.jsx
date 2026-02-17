import React from "react";
import {  Container } from "react-bootstrap";
import AdminButtonTop from "./AdminTopButton";
import { useState } from "react";
import AdminGetAllGuest from "./AdminGetAllGuests";
import AdminGetActiveGuest from "./AdminGetActiveGuest";
import AdminGetDailyActiveGuest from "./AdminGetDailyActiveGuest";
import AdminGetOnlineGuest from "./AdminGetOnlineGuests";
import AdminGetBannedGuest from "./AdminGetBannedGuests";
import AdminGetNewRegisterGuest from "./AdminGetNewRegisterGuest";
import AdminGetLogoutGuest from "./AdminGetLogoutGuests";

const AdminGuestHome = () => {
  const [selectedView, setSelectedView] = useState("all");
 
  return (
    <Container fluid  className="adminGuestHomeContainer">

      <AdminButtonTop onSelectView={setSelectedView} />

      {/* Conditional Views */}
      {selectedView === "all" && <AdminGetAllGuest/>}
       {selectedView === "active" && <AdminGetActiveGuest/>}
       {selectedView === "dailyactive" && <AdminGetDailyActiveGuest/>}
          {selectedView === "online" && <AdminGetOnlineGuest/>}
          {selectedView === "logout" && <AdminGetLogoutGuest/>}
          {selectedView === "newRegister" && <AdminGetNewRegisterGuest/>}
          {selectedView === "banned" && <AdminGetBannedGuest/>}
        
    </Container>
  );
};

export default AdminGuestHome;
