import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero">
        <div className="hero-content">
          <h1>Emergency Blood Donor & SOS Alert Directory</h1>

          <p>
            Find available blood donors in your locality during
            emergency situations.
          </p>

          <div className="hero-buttons">
            <Link to="/find-donors">
              <button>Find a Donor</button>
            </Link>

            <Link to="/sos">
              <button className="sos-button">Request Blood</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How It Helps</h2>

        <div className="feature-container">

          <div className="feature-card">
            <h3>🩸 Find Donors</h3>
            <p>
              Search for available blood donors based on
              blood group and locality.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚨 SOS Request</h3>
            <p>
              Create an emergency blood request and
              quickly reach suitable donors.
            </p>
          </div>

          <div className="feature-card">
            <h3>📞 Quick Contact</h3>
            <p>
              Contact available donors directly when
              every minute matters.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;