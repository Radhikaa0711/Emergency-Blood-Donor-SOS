import { useEffect, useState } from "react";

function FindDonors() {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [locality, setLocality] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/donors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }

        return response.json();
      })
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching donors:", error);
        setLoading(false);
      });
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const donorBloodGroup = String(donor.bloodGroup || "")
      .trim()
      .toLowerCase();

    const donorLocality = String(donor.locality || "")
      .trim()
      .toLowerCase();

    const searchBloodGroup = bloodGroup
      .trim()
      .toLowerCase();

    const searchLocality = locality
      .trim()
      .toLowerCase();

    const bloodMatch =
      searchBloodGroup === "" ||
      donorBloodGroup === searchBloodGroup;

    const localityMatch =
      searchLocality === "" ||
      donorLocality.includes(searchLocality);

    const availableMatch = donor.available === true;

    return bloodMatch && localityMatch && availableMatch;
  });

  return (
    <div className="find-page">

      <div className="find-header">
        <h1>Find Blood Donors</h1>

        <p>
          Search for available donors by blood group and locality.
        </p>
      </div>

      <div className="search-box">

        <div className="search-field">
          <label>Blood Group</label>

          <input
            type="text"
            placeholder="Example: O+"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label>Locality</label>

          <input
            type="text"
            placeholder="Example: Chennai"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
        </div>

      </div>

      <h2 className="results-title">
        Available Donors ({filteredDonors.length})
      </h2>

      {loading ? (
        <div className="no-donors">
          <p>Loading donors...</p>
        </div>
      ) : (
        <div className="donor-container">

          {filteredDonors.length === 0 ? (
            <div className="no-donors">
              <p>No matching donors found.</p>
            </div>
          ) : (
            filteredDonors.map((donor) => (
              <div className="donor-card" key={donor._id}>

                <div className="blood-badge">
                  {String(donor.bloodGroup).toUpperCase()}
                </div>

                <h3>{donor.name}</h3>

                <p>
                  <strong>📍 Locality:</strong>{" "}
                  {donor.locality}
                </p>

                <p>
                  <strong>📞 Phone:</strong>{" "}
                  {donor.phone}
                </p>

                <p className="available">
                  ● Available
                </p>

                <a href={`tel:${donor.phone}`}>
                  <button className="call-button">
                    Call Donor
                  </button>
                </a>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default FindDonors;