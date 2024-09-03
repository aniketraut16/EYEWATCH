import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AudioVisualizer from "../Utils/AudioVisualizer";

function OneAlert() {
  const [position, setPosition] = useState([51.5074, -0.1278]);
  const [oneAlert, setOneAlert] = useState({
    device_id: "DEV-2345",
    user_info: {
      user_id: "USR-7890",
      name: "Jane Doe",
      imgsrc: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      age: 28,
      gender: "Female",
      contact_number: "+44 1234 567890",
    },
    incident_details: {
      incident_id: "INC-5678",
      detection_time: "2024-09-02T22:15:00Z",
      location: {
        latitude: 51.5074,
        longitude: -0.1278,
        address: "Trafalgar Square, London, UK",
      },
      incident_type: "Lone Woman Detected at Night",
      risk_level: "High",
    },
    live_feed: {
      video_stream_url: "/public/videos/5295_New York_NYC_1280x720.mp4",
      audio_stream_url: "/public/audios/CantinaBand60.wav",
      current_location: {
        latitude: 51.5074,
        longitude: -0.1278,
        accuracy: "5m",
      },
      status: "Active",
    },
    additional_info: {
      gender_distribution: {
        male: 4,
        female: 1,
      },
      emotion_detected: "Fear",
      gait_analysis: "Running",
      object_detection: "No weapons detected",
      audio_analysis: "Distress call detected",
      previous_incidents_nearby: [
        {
          incident_id: "INC-1234",
          detection_time: "2024-08-30T20:30:00Z",
          incident_type: "Woman surrounded by men",
          risk_level: "Medium",
        },
        {
          incident_id: "INC-3456",
          detection_time: "2024-08-25T19:45:00Z",
          incident_type: "Lone Woman Detected at Night",
          risk_level: "High",
        },
      ],
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => [
        prevPosition[0] + 0.0001, // Adjust for speed
        prevPosition[1] + 0.0001, // Adjust for speed
      ]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
  }

  return (
    <div className="OneAlertPage">
      <section id="BasicInfo">
        <img src={oneAlert.user_info.imgsrc} alt="" />
        <div>
          <h2>{oneAlert.user_info.name}</h2>
          <h2>{oneAlert.user_info.user_id}</h2>
          <p>Age: {oneAlert.user_info.age}</p>
          <p>Gender: {oneAlert.user_info.gender}</p>
          <p>Contact Number: {oneAlert.user_info.contact_number}</p>
        </div>
      </section>
      <section id="AlertInfo">
        <p>Alert Information</p>
        <h3> Incident Type : {oneAlert.incident_details.incident_type}</h3>
        <h3> Detection Time : {oneAlert.incident_details.detection_time}</h3>
        <h3> Risk Level : {oneAlert.incident_details.risk_level}</h3>
      </section>

      <section id="LocationInfo">
        <div className="ll-map">
          {position && (
            <MapContainer
              center={position}
              zoom={17}
              style={{ height: "50vh", width: "400px" }}
            >
              <MapUpdater position={position} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  A marker at ({position[0]}, {position[1]})
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
        <div className="ll-info">
          <h2>Detected Location</h2>
          <p>Latittude:{oneAlert.incident_details.location.latitude}</p>
          <p>Longitude:{oneAlert.incident_details.location.longitude}</p>
          <p>Address:{oneAlert.incident_details.location.address}</p>
          <h2>Current Location</h2>
          <p>Latittude:{oneAlert.live_feed.current_location.latitude}</p>
          <p>Longitude:{oneAlert.live_feed.current_location.longitude}</p>
          <p>Address: {oneAlert.live_feed.current_location.address}</p>
        </div>
      </section>
      <section id="VideoInfo">
        <video id="videoPlayer" autoPlay loop muted playsInline controls>
          <source
            src={oneAlert.live_feed.video_stream_url}
            type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'
          />
          Your browser does not support the video tag.
        </video>

        <div className="vl-info">
          <h2>Person Detected</h2>
          <p>
            <span>
              Male : {oneAlert.additional_info.gender_distribution.male}
            </span>
            <span>
              Female : {oneAlert.additional_info.gender_distribution.female}
            </span>
          </p>
          <h2>Surrounding Detected</h2>
          <p>Emotion Detectes: {oneAlert.additional_info.emotion_detected}</p>
          <p>Gait Analysis: {oneAlert.additional_info.gait_analysis}</p>
          <p>Object Detected: {oneAlert.additional_info.object_detection}</p>
        </div>
      </section>
      <section id="AudioInfo"></section>
    </div>
  );
}

export default OneAlert;
