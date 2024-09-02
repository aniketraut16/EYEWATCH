import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link>EYEWATCH</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
