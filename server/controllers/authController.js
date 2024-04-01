const jwt = require("jsonwebtoken");

const filterObj = require("../utils/filterObj");

const User = require("../models/user");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30m" }); // Token expires after 30 minutes
};

// Register New User

exports.register = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const filteredBody = filterObj(req.body, "name", "email", "password");

    // Checking if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // If user exists, update the existing user with the filtered body
      await User.findOneAndUpdate({ email: email }, filteredBody, {
        new: true,
        validateModifiedOnly: true,
      });

      // Setting userId in the request object for further use
      req.userId = existingUser._id;
      res.status(409).json({
        status: "error",
        message: "User is already registered",
      });
    } else {
      // if user is not created before than create a new one
      const new_user = await User.create(filteredBody);

      req.userId = new_user._id;
      res.status(201).json({
        status: "success",
        message: "User registered succcessfully",
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// User Login
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Checking if email and password are provided
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "Both email and password are required",
      });
      return;
    }

    // Finding user by email and checking password
    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !user.password) {
      res.status(400).json({
        status: "error",
        message: "Incorrect password",
      });

      return;
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).json({
        status: "error",
        message: "Email or password is incorrect",
      });

      return;
    }

    // Generating JWT token
    const token = signToken(user._id);
    // Sending success response with token and user ID
    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      token,
      user_id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to verify JWT token
exports.verifyToken = catchAsync(async (req, res, next) => {
  // Getting token from request headers or cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    res.status(200).json({
      status: "success",
      message: "Token verified successfully!",
      token,
      user_id: decoded.userId,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Protect Middleware
exports.protect = catchAsync(async (req, res, next) => {
  try {
    // Getting token from request headers or cookie
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in! Please log in to get access.",
      });
    }
    // Verifying the JWT token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists

    const this_user = await User.findById(decoded.userId);
    if (!this_user) {
      return res.status(401).json({
        message: "The user belonging to this token does no longer exists.",
      });
    }

    // Granting access to protected routes
    req.user = this_user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
