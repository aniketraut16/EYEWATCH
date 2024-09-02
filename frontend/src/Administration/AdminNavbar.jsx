import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

function AdminNavbar() {
  return (
    <>
      <div className="admin-view">
        <nav className="admin-navbar">
          <Link>All Alerts</Link>
          <Link>Other Section 1</Link>
          <Link>Other Section 2</Link>
          <Link>Other Section 3</Link>
          <Link>Other Section 4</Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default AdminNavbar;
