const mongoose = require("mongoose");
const user = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("User", user);