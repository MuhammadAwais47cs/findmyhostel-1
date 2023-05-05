const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  addressLine2: {
    type: String,
  },
  addressLines: {
    type: String,
  },
  city: {
    type: String,
  },
  cnic: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  country: {
    type: String,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  hostelAddress: {
    type: String,
  },
  hostelName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  stateProvince: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  hostelPrice: {
    type: String,
  },
  beds: {
    type: String,
  },
  baths: {
    type: String,
  },
  sqFt: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
});

const Hostel = new mongoose.model("HOSTEL", hostelSchema);

module.exports = Hostel;
