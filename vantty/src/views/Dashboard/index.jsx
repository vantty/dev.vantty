import React from "react";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Settings, DashDesktop } from "./components";

const Dashboard = () => {
  // return <div>{isMobile ? <Settings /> : <DashDesktop />}</div>;
  return <div>{isTablet || isBrowser ? <DashDesktop /> : <Settings />}</div>;
};

export default Dashboard;
