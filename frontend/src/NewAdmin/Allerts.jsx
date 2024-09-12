import React, { useState, useEffect } from "react";
import "./Allerts.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Allerts() {
  const [selectedAlert, setSelectedAlert] = useState("");
  const [altertCategory, setaltertCategory] = useState("system");
  const [systemAlertCount, setSystemAlertCount] = useState(0);
  const [userAlertCount, setUserAlertCount] = useState(0);
  const navigate = useNavigate();

  // Updated system and user alerts
  const alertsData = {
    systemAlerts: [
      {
        date: "Jan 24, 2024",
        location: "Near Central Park, 789 Oak Ave",
        time: "1:45 PM",
        details:
          "A woman reported being followed near Central Park, 789 Oak Ave.",
      },
      {
        date: "Feb 10, 2024",
        location: "Library, 345 Maple St",
        time: "3:15 PM",
        details:
          "A woman reported feeling unsafe due to suspicious behavior at Library, 345 Maple St.",
      },
      {
        date: "Mar 05, 2024",
        location: "Gym, 678 Pine St",
        time: "6:30 PM",
        details:
          "A woman was approached by an unknown individual near the Gym, 678 Pine St.",
      },
      {
        date: "Apr 22, 2024",
        location: "Parking Lot B, 123 Oak Ave",
        time: "9:00 AM",
        details:
          "A woman noticed someone loitering near her car in Parking Lot B, 123 Oak Ave.",
      },
      {
        date: "May 17, 2024",
        location: "Building C, 789 Elm St",
        time: "11:00 PM",
        details:
          "A woman called for help after being harassed at Building C, 789 Elm St.",
      },
    ],
    userAlerts: [
      {
        name: "Jane Doe",
        age: 29,
        gender: "Female",
        userId: "U123456",
        riskLevel: "High",
      },
      {
        name: "John Smith",
        age: 35,
        gender: "Male",
        userId: "U654321",
        riskLevel: "Medium",
      },
      {
        name: "Alice Johnson",
        age: 27,
        gender: "Female",
        userId: "U789012",
        riskLevel: "Low",
      },
      {
        name: "Bob Williams",
        age: 40,
        gender: "Male",
        userId: "U345678",
        riskLevel: "Critical",
      },
      {
        name: "Emily Davis",
        age: 23,
        gender: "Female",
        userId: "U987654",
        riskLevel: "Moderate",
      },
    ],
  };

  // Handling the selection change from the dropdown
  const handleSelectChange = (event) => {
    setSelectedAlert(event.target.value);
  };

  // Track keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "U") {
        setUserAlertCount((prevCount) =>
          prevCount < alertsData.userAlerts.length ? prevCount + 1 : prevCount
        );
        toast.warn("There is one User Alert have a look!!");
      } else if (event.shiftKey && event.key === "S") {
        setSystemAlertCount((prevCount) =>
          prevCount < alertsData.systemAlerts.length ? prevCount + 1 : prevCount
        );
        toast.warn("There is one System Alert have a look!!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [alertsData.systemAlerts.length, alertsData.userAlerts.length]);

  // Display only the number of alerts according to the counter
  const selectedAlerts =
    altertCategory === "system"
      ? alertsData.systemAlerts.slice(0, systemAlertCount)
      : alertsData.userAlerts.slice(0, userAlertCount);

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
            Select system alerts and SOSs
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

      {/* Alert Category Selection */}
      <div className="altert-category">
        <h2
          onClick={() => {
            setaltertCategory("system");
          }}
          style={{
            fontWeight: "bold",
            textDecoration: altertCategory === "system" ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          System Alerts ({systemAlertCount})
        </h2>
        <h2
          onClick={() => {
            setaltertCategory("user");
          }}
          style={{
            fontWeight: "bold",
            textDecoration: altertCategory === "user" ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          User Alerts ({userAlertCount})
        </h2>
      </div>

      {/* Display Alerts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {selectedAlerts.map((alert, index) => (
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
              cursor: "pointer",
            }}
            className="oneoone-alerts"
          >
            {altertCategory === "system" ? (
              <>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJMPKRdFu_9C2Jzefo5v-YIVPjyBsUht1QA&s"
                  alt="Alert icon"
                  style={{ marginBottom: "10px" }}
                />
                <p>{alert.date}</p>
                <p>{alert.location}</p>
                <p>{alert.details}</p>
              </>
            ) : (
              <>
                <img
                  src="https://cdn.vectorstock.com/i/500p/04/37/sos-icon-emergency-alarm-button-sign-symbol-vector-26830437.jpg"
                  alt="Alert icon"
                  style={{ marginBottom: "10px" }}
                />
                <p>Name: {alert.name}</p>
                <p>Age: {alert.age}</p>
                <p>Gender: {alert.gender}</p>
                <p>User Id: {alert.userId}</p>
                <p>Risk Level: {alert.riskLevel}</p>
              </>
            )}
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
