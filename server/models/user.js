const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // Custom validation for strong password
    validate: {
      validator: function (password) {
        // Check if password contains at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
      },
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password is modified
  if (!this.isModified("password") || !this.password) return next();

  // Hash the password with a salt length of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Proceed to the next middleware in the middleware stack
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
