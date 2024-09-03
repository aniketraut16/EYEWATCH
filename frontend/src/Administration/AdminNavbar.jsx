import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

function AdminNavbar() {
  return (
    <>
      <div className="admin-view">
        <nav className="admin-navbar">
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="all-alerts"
          >
            All Alerts
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="other-section-1"
          >
            Other Section 1
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="other-section-2"
          >
            Other Section 2
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="other-section-3"
          >
            Other Section 3
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="other-section-4"
          >
            Other Section 4
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default AdminNavbar;
