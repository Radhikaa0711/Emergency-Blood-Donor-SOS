import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [locality, setLocality] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill in all required fields.");
      return;
    }

    if (role === "donor" && (!bloodGroup || !locality || !phone)) {
      alert("Please fill in all donor details.");
      return;
    }

    try {
      // Step 1: Create user account
      const userResponse = await fetch(
        "https://blood-donor-sos-api.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role
          })
        }
      );

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        alert(userData.message);
        return;
      }

      // Step 2: If donor, create donor profile
      if (role === "donor") {
        const donorResponse = await fetch(
          "https://blood-donor-sos-api.onrender.com/donors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              bloodGroup,
              locality,
              available: true
            })
          }
        );

        const donorData = await donorResponse.json();

        if (!donorResponse.ok) {
          alert(
            "Account created, but donor profile could not be created."
          );
          return;
        }

        alert(
          userData.message +
          "\n" +
          donorData.message
        );
      } else {
        alert(userData.message);
      }

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setBloodGroup("");
      setLocality("");
      setPhone("");

      // Switch to login
      setIsLogin(true);

    } catch (error) {
      console.log("Registration error:", error);
      alert("Unable to connect to the server.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://blood-donor-sos-api.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      // Redirect based on role
      if (data.user.role === "donor") {
        navigate("/donor-dashboard");
      } else if (data.user.role === "requester") {
        navigate("/sos");
      } else if (data.user.role === "admin") {
        navigate("/admin");
      }

    } catch (error) {
      console.log("Login error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            🩸
          </div>

          <h1>
            {isLogin
              ? "Welcome Back"
              : "Join BloodConnect"}
          </h1>

          <p>
            {isLogin
              ? "Login to continue"
              : "Register to help save lives"}
          </p>

        </div>

        <div className="auth-form">

          {!isLogin && (
            <>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <>
              <label>Account Type</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">
                  Select Account Type
                </option>

                <option value="donor">
                  Blood Donor
                </option>

                <option value="requester">
                  Blood Requester
                </option>
              </select>

              {role === "donor" && (
                <>
                  <label>Blood Group</label>

                  <select
                    value={bloodGroup}
                    onChange={(e) =>
                      setBloodGroup(e.target.value)
                    }
                  >
                    <option value="">
                      Select Blood Group
                    </option>

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>

                  <label>Locality</label>

                  <input
                    type="text"
                    placeholder="Example: Chennai"
                    value={locality}
                    onChange={(e) =>
                      setLocality(e.target.value)
                    }
                  />

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />
                </>
              )}
            </>
          )}

          <button
            className="auth-button"
            onClick={
              isLogin
                ? handleLogin
                : handleRegister
            }
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>

        </div>

        <div className="auth-switch">

          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            className="switch-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create a new account"
              : "Login here"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Auth;
