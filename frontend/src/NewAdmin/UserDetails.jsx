import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash"; // Import lodash for throttling
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./UserDetails.css"; // Import the external CSS

const UserDetails = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
  const [coordinates, setCoordinates] = useState({
    lat: 40.7128,
    lng: -74.006,
  });

  // Throttled function to update coordinates
  const throttledUpdate = useCallback(
    _.throttle((newCoordinates) => {
      setCoordinates(newCoordinates);
    }, 1000), // Adjust throttle time as needed
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCoordinates((prev) => {
        const newLat = prev.lat + 0.0001;
        const newLng = prev.lng + 0.0001;
        throttledUpdate({ lat: newLat, lng: newLng });
        return { lat: newLat, lng: newLng };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [throttledUpdate]);

  const userData = {
    name: "Jane Doe",
    age: 29,
    gender: "Female",
    userId: "U123456",
    emergencyContact: {
      phone: "(+91) 9232032901",
      address: "1234, Elm Street, NY, etc",
    },
    videoAnalysis: {
      description:
        "The video captures a young woman walking alone at night. A man begins following her closely after about 10 seconds. The woman looks over her shoulder multiple times, showing clear signs of fear. As she tries to use her phone, the man grabs her arm.",
      facialExpression:
        "The woman’s face shows distress and panic, while the man’s expression is focused and predatory.",
      bodyLanguage:
        "The woman speeds up, attempting to avoid the man. Her body tenses as he approaches, and when grabbed, she struggles to free herself.",
      environment:
        "The poorly lit street increases the danger, with no visible bystanders or security.",
    },
    audioAnalysis: {
      description:
        "The audio captures a distressed phone call between a woman and an unidentified individual. The woman’s voice is shaky and panicked, with heavy breathing and occasional sobs. She repeatedly asks for help, indicating she is being followed.",
      voiceAnalysis:
        "The woman’s tone suggests extreme fear, with heightened vocal stress. Her speech is hurried and interrupted by gasps, further indicating distress.",
      backgroundNoise:
        "Footsteps, faint car noises, and a man’s voice can be heard in the distance, though the speech is unclear. No immediate help or other voices are detected.",
      environment:
        "The sounds suggest an outdoor setting, possibly on a street, with minimal surrounding activity.",
    },
    callHistory: [
      {
        name: "Ronnie Fleming",
        date: "Sep 18",
        time: "09:00 AM",
        call: "Outgoing Call",
        duration: "5 Minutes",
      },
      {
        name: "Alice Johnson",
        date: "Sep 19",
        time: "10:00 AM",
        call: "Incoming Call",
        duration: "3 Minutes",
      },
      {
        name: "Michael Blake",
        date: "Sep 19",
        time: "12:30 PM",
        call: "Missed Call",
        duration: "0 Minutes",
      },
    ],
    previousIncidents: [
      { date: "03 Aug 24", description: "Street Harassment at 1 mile away" },
      { date: "05 Sept 24", description: "Assault Reported at 0.5 miles away" },
      { date: "10 Sept 24", description: "Theft at 2 miles away" },
    ],
    batteryStatus: {
      date: "03 Aug 24",
      percentage: 70,
      saver: "Disabled",
      time: "12:00 AM",
    },
    userSafetyReport: [
      "Injury Status: The user is not injured.",
      "Presence: The user is alone at the moment.",
      "Immediate Danger: The user is currently in immediate danger.",
      "Time of Incident: 09:30 PM.",
      "Recent Activities: The user has accessed the safety app within the last 10 minutes.",
      "Recent Alerts: The user has received alerts regarding suspicious activity in the area.",
    ],
  };
  function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
  }
  return (
    <div className="user-details-container">
      <h1>User Details</h1>

      <div className="user-info">
        <img src="/image.png" alt="User" className="user-image" />
        <div className="user-data">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Age:</strong> {userData.age}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>User Id:</strong> {userData.userId}
          </p>
        </div>
        <div className="emergency-contact">
          <p>
            <strong>Emergency Contact:</strong>
          </p>
          <p>
            <strong>Phone No:</strong> {userData.emergencyContact.phone}
          </p>
          <p>
            <strong>Address:</strong> {userData.emergencyContact.address}
          </p>
        </div>
      </div>

      <div className="incident-info">
        <h2>Real-time Incident Information</h2>

        <div className="video-section">
          <h3>Video Captured</h3>
          <span>
            <div className="video-placeholder">
              <p>This video is not shown due to a privacy violation.</p>
            </div>
            <div className="video-analysis">
              <h4>Analysis of the Video:</h4>
              <p>{userData.videoAnalysis.description}</p>
              <p>
                <h4>Facial Expression:</h4>
                {userData.videoAnalysis.facialExpression}
              </p>
              <p>
                <h4>Body Language:</h4>
                {userData.videoAnalysis.bodyLanguage}
              </p>
              <p>
                <h4>Environment:</h4>
                {userData.videoAnalysis.environment}
              </p>
            </div>
          </span>
        </div>

        <div className="audio-section">
          <h3>Audio Captured</h3>
          <audio controls>
            <source src="audio-file.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="video-analysis">
            <h4>Analysis of Audio:</h4>
            <p>{userData.audioAnalysis.description}</p>
            <p>
              <h4>Voice Analysis:</h4>
              {userData.audioAnalysis.voiceAnalysis}
            </p>
            <p>
              <h4>Background Noise:</h4>
              {userData.audioAnalysis.backgroundNoise}
            </p>
            <p>
              <h4>Environment:</h4>
              {userData.audioAnalysis.environment}
            </p>
          </div>
        </div>

        <div className="call-history">
          <h3>Call History</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Call</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {userData.callHistory.map((call, index) => (
                <tr key={index}>
                  <td>{call.name}</td>
                  <td>{call.date}</td>
                  <td>{call.time}</td>
                  <td>{call.call}</td>
                  <td>{call.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button>Show More</button>
        </div>

        <div className="previous-incidents">
          <h3>Previous Incidents in Area</h3>
          <ul>
            {userData.previousIncidents.map((incident, index) => (
              <div key={index}>
                <span>{incident.date}</span> {incident.description}
              </div>
            ))}
          </ul>
          <button>Show More</button>
        </div>

        <div className="location-details">
          <h3>Location Details</h3>
          <div className="map-placeholder">
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={20}
              style={{ height: "300px", width: "70%" }}
            >
              <MapUpdater position={[coordinates.lat, coordinates.lng]} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  <span>Current Location</span>
                </Popup>
              </Marker>
            </MapContainer>
            <p>
              <strong>Coordinates:</strong>
              <span>
                {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° W
              </span>
            </p>
          </div>
        </div>

        <div className="battery-info">
          <h3>Battery Percentage</h3>
          <p>
            <span>{userData.batteryStatus.date}</span> Battery Remaining{" "}
            {userData.batteryStatus.percentage}% | Battery Saver{" "}
            {userData.batteryStatus.saver}
            <span>{userData.batteryStatus.time}</span>
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <h3>Additional Details</h3>
      <div className="additional-details">
        <p>User Safety Report:</p>
        <ul>
          {userData.userSafetyReport.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
