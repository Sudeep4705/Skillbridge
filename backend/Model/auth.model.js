const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      enum: [
        "Student",
        "Trainer",
        "Institution",
        "Programme Manager",
        "Monitoring Officer",
      ],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
