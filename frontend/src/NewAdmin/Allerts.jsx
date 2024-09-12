import React, { useState } from "react";
import "./Allerts.css";
import { useNavigate } from "react-router-dom";

function Allerts() {
  const [selectedAlert, setSelectedAlert] = useState("");
  const [altertCategory, setaltertCategory] = useState("system");
  const navigate = useNavigate();
  const alertsData = [
    {
      date: "Jan 24, 2024",
      key: "Primary key",
      location: "Mxxxx xxxxxL, 789 Oak Ave",
      time: "1:45 PM",
      details:
        "Suspicious activity near Mxxxx xxxxxL, 789 Oak Ave, at 1:45 PM.",
    },
    // Add more alerts data as needed
  ];

  const handleSelectChange = (event) => {
    setSelectedAlert(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Filter and Search */}
      <div
        className="admin-new-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontWeight: "bold" }}>Alerts</h1>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "5px 20px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Filter
        </button>

        <input
          type="text"
          placeholder="Search Alert by Specific User"
          style={{
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            width: "30%",
            fontSize: "16px",
          }}
        />

        <select
          value={selectedAlert}
          onChange={handleSelectChange}
          style={{
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            width: "20%",
          }}
        >
          <option value="" disabled>
            select system alerts and SOSs
          </option>
          <option value="Suspicious Activity Detected">
            Suspicious Activity Detected
          </option>
          <option
            value="High-Risk Zone Notification"
            style={{ color: "blue", fontWeight: "bold" }}
          >
            High-Risk Zone Notification
          </option>
          <option value="Emergency Response Status">
            Emergency Response Status
          </option>
          <option value="Surveillance Footage Alert">
            Surveillance Footage Alert
          </option>
          <option value="Safety Tip Reminder">Safety Tip Reminder</option>
          <option value="System Health Alert">System Health Alert</option>
          <option value="Immediate Help Required">
            Immediate Help Required
          </option>
        </select>
      </div>

      <div className="altert-category">
        {/* System Alerts */}
        <h2
          onClick={() => {
            setaltertCategory("system");
          }}
          style={{
            fontWeight: "bold",
            textDecoration: altertCategory === "system" ? "underline" : "none",
          }}
        >
          System Alerts
        </h2>
        <h2
          onClick={() => {
            setaltertCategory("user");
          }}
          style={{
            fontWeight: "bold",
            textDecoration: altertCategory === "user" ? "underline" : "none",
          }}
        >
          User Alerts
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {alertsData.map((alert, index) => (
          <div
            key={index}
            onClick={() => {
              navigate("/allalerts/one-alert");
            }}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
            }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Alert icon"
              style={{ marginBottom: "10px" }}
            />
            <p>{alert.date}</p>
            <p>[{alert.key}]</p>
            <p>[Location of alert]</p>
            <p>"{alert.details}"</p>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allerts;
