import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Allalerts() {
  const [numberOfAlerts, setNumberOfAlerts] = useState(-1);
  const allalerts = [
    {
      incident_id: "INC1235",
      name: "Aarti Sharma",
      age: 32,
      detection_time: "25th August 2024, 9:15 PM",
      incident_type: "Woman Surrounded by Men",
      imgsrc: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    },
    {
      incident_id: "INC1765",
      name: "Neha Singh",
      age: 27,
      detection_time: "1st September 2024, 8:45 PM",
      incident_type: "SOS Gesture Recognized",
      imgsrc: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    },
  ];
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "A" && numberOfAlerts < allalerts.length - 1) {
        setNumberOfAlerts((prev) => prev + 1);
        toast.warn("There is a new alert, please have a look!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numberOfAlerts, allalerts.length]);

  const OneAlertCard = (data) => {
    return (
      <div className="AlertCard">
        <img src={data.imgsrc} alt="Alert" />
        <div>
          <h2>{data.name}</h2>
          <p>Age: {data.age}</p>
          <p>Detection Time: {data.detection_time}</p>
          <p>Incident Type: {data.incident_type}</p>
          <div>
            <Link to={`/admin/all-alerts/${data.incident_id}`}>View More</Link>
            <button>Close Alert</button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="Allalerts">
      {numberOfAlerts === -1 && <h1>NO ALERTS!</h1>}
      {allalerts.slice(0, numberOfAlerts + 1).map((data, index) => {
        return OneAlertCard(data);
      })}
    </div>
  );
}

export default Allalerts;
