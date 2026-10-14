import { useEffect, useState } from "react";

function DonorDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/donors")
      .then((response) => response.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching donors:", error);
        setLoading(false);
      });
  }, []);

  const changeAvailability = async (donor) => {
    const newAvailability = !donor.available;

    try {
      const response = await fetch(
        `http://localhost:5000/donors/${donor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            available: newAvailability
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDonors((currentDonors) =>
          currentDonors.map((item) =>
            item._id === donor._id
              ? data.donor
              : item
          )
        );

        alert("Availability updated successfully!");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log("Error updating availability:", error);
      alert("Failed to update availability.");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Donor Dashboard</h1>
          <p>Loading donor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>Donor Dashboard</h1>
        <p>
          Manage blood donor information and availability.
        </p>
      </div>

      {donors.length === 0 ? (
        <div className="dashboard-empty">
          <h2>No Donors Registered</h2>

          <p>
            Register as a blood donor to see donor information here.
          </p>
        </div>
      ) : (
        <div className="dashboard-container">

          {donors.map((donor) => (

            <div
              className="dashboard-card"
              key={donor._id}
            >

              <div className="dashboard-blood">
                {String(donor.bloodGroup).toUpperCase()}
              </div>

              <h2>{donor.name}</h2>

              <div className="profile-info">

                <p>
                  <strong>📧 Email:</strong>{" "}
                  {donor.email}
                </p>

                <p>
                  <strong>📞 Phone:</strong>{" "}
                  {donor.phone}
                </p>

                <p>
                  <strong>📍 Locality:</strong>{" "}
                  {donor.locality}
                </p>

              </div>

              <div className="donor-status">

                {donor.available ? (
                  <span className="status available">
                    ● Available to Donate
                  </span>
                ) : (
                  <span className="status unavailable">
                    ● Not Available
                  </span>
                )}

              </div>

              <button
                className="dashboard-button"
                onClick={() => changeAvailability(donor)}
              >
                {donor.available
                  ? "Mark as Not Available"
                  : "Mark as Available"}
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default DonorDashboard;