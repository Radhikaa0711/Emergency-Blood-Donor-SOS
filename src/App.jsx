import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DonorDashboard from "./pages/DonorDashboard";
import FindDonors from "./pages/FindDonors";
import SOSRequest from "./pages/SOSRequest";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/find-donors" element={<FindDonors />} />
        <Route path="/sos" element={<SOSRequest />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;