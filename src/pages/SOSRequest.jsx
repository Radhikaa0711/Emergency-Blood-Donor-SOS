import { useState } from "react";

function SOSRequest() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodGroup,
          location,
          urgency,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create SOS request"
        );
      }

      alert("🚨 SOS request sent successfully!");

      setBloodGroup("");
      setLocation("");
      setUrgency("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting SOS request:", error);

      alert(
        "Failed to send SOS request. Please check whether the backend is running."
      );
    }
  };

  return (
    <div className="sos-page">
      <div className="sos-card">
        <div className="sos-header">
          <div className="sos-icon">🚨</div>

          <h1>Emergency Blood Request</h1>

          <p>
            Create an SOS request to find blood donors quickly.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Required Blood Group</label>

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label>Location / Locality</label>

          <input
            type="text"
            placeholder="Example: Chennai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Urgency</label>

          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="Immediate">Immediate</option>
            <option value="Within a few hours">
              Within a few hours
            </option>
            <option value="Today">Today</option>
          </select>

          <label>Additional Message</label>

          <textarea
            placeholder="Enter any additional information..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />

          <button type="submit" className="sos-submit">
            🚨 Send SOS Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default SOSRequest;

