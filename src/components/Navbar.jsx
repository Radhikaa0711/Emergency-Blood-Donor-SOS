import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🩸 BloodConnect
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/find-donors">Find Donors</Link>
        <Link to="/sos">SOS Request</Link>
        <Link to="/donor-dashboard">Donor Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/auth" className="login-link">
          Login / Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;

