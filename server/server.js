const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./db");
const Donor = require("./models/Donor");
const User = require("./models/User");
const SOSRequest = require("./models/SOSRequest");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Blood Donor SOS Backend is running!");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

// Add a new donor
app.post("/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);

    await donor.save();

    res.status(201).json({
      message: "Donor registered successfully",
      donor: donor
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to register donor",
      error: error.message
    });
  }
});

// Get all donors
app.get("/donors", async (req, res) => {
  try {
    const donors = await Donor.find();

    res.json(donors);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get donors",
      error: error.message
    });
  }
});

// Change donor availability
app.put("/donors/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        available: req.body.available
      },
      {
        new: true
      }
    );

    res.json({
      message: "Availability updated successfully",
      donor: donor
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update availability",
      error: error.message
    });
  }
});

// Create SOS Request
app.post("/sos", async (req, res) => {
  try {
    const {
      bloodGroup,
      location,
      urgency,
      message
    } = req.body;

    const sosRequest = new SOSRequest({
      bloodGroup,
      location,
      urgency,
      message
    });

    await sosRequest.save();

    res.status(201).json({
      message: "SOS request created successfully",
      request: sosRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create SOS request",
      error: error.message
    });
  }
});

// Get all SOS requests
app.get("/sos", async (req, res) => {
  try {
    const requests = await SOSRequest.find()
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get SOS requests",
      error: error.message
    });
  }
});

// Admin - Get all donors
app.get("/admin/donors", async (req, res) => {
  try {
    const donors = await Donor.find();

    res.json(donors);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get donor information",
      error: error.message
    });
  }
});

// Admin - Get all SOS requests
app.get("/admin/sos", async (req, res) => {
  try {
    const requests = await SOSRequest.find()
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get SOS information",
      error: error.message
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
