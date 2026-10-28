import { useEffect, useState } from "react";

function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [sosRequests, setSosRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const donorsResponse = await fetch(
          "https://blood-donor-sos-api.onrender.com/admin/donors"
        );

        const sosResponse = await fetch(
          "https://blood-donor-sos-api.onrender.com/admin/sos"
        );

        const donorsData = await donorsResponse.json();
        const sosData = await sosResponse.json();

        setDonors(donorsData);
        setSosRequests(sosData);

        setLoading(false);

      } catch (error) {
        console.log("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const availableDonors = donors.filter(
    (donor) => donor.available === true
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Loading dashboard information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* Header */}

      <div className="admin-header">
        <h1>Admin Dashboard</h1>

        <p>
          Monitor donors and emergency blood requests.
        </p>
      </div>

      {/* Statistics */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            👥
          </div>

          <h2>{donors.length}</h2>

          <p>Total Donors</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            🟢
          </div>

          <h2>{availableDonors.length}</h2>

          <p>Available Donors</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            🚨
          </div>

          <h2>{sosRequests.length}</h2>

          <p>Total SOS Requests</p>
        </div>

      </div>

      {/* Donors */}

      <section className="admin-section">

        <h2>Registered Donors</h2>

        {donors.length === 0 ? (
          <div className="admin-empty">
            <p>No donors registered yet.</p>
          </div>
        ) : (
          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Locality</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {donors.map((donor) => (
                  <tr key={donor._id}>

                    <td>
                      {donor.name}
                    </td>

                    <td>
                      <strong>
                        {String(
                          donor.bloodGroup
                        ).toUpperCase()}
                      </strong>
                    </td>

                    <td>
                      {donor.locality}
                    </td>

                    <td>
                      {donor.phone}
                    </td>

                    <td>
                      {donor.available ? (
                        <span className="admin-available">
                          Available
                        </span>
                      ) : (
                        <span className="admin-unavailable">
                          Not Available
                        </span>
                      )}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* SOS Requests */}

      <section className="admin-section">

        <h2>Emergency SOS Requests</h2>

        {sosRequests.length === 0 ? (
          <div className="admin-empty">
            <p>No SOS requests yet.</p>
          </div>
        ) : (
          <div className="sos-admin-container">

            {sosRequests.map((request) => (

              <div
                className="sos-admin-card"
                key={request._id}
              >

                <div className="sos-admin-top">

                  <span className="admin-blood-badge">
                    {String(
                      request.bloodGroup
                    ).toUpperCase()}
                  </span>

                  <span className="sos-status">
                    {request.status}
                  </span>

                </div>

                <h3>
                  🚨 {request.urgency}
                </h3>

                <p>
                  <strong>
                    📍 Location:
                  </strong>{" "}
                  {request.location}
                </p>

                <p>
                  <strong>
                    📝 Message:
                  </strong>{" "}
                  {request.message || "No additional message"}
                </p>

                <p className="sos-date">
                  {new Date(
                    request.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default AdminDashboard;
