const mongoose = require("mongoose");
const validator = require("validator").default;

const FormResponseSchema = new mongoose.Schema({
  form_id: {
    type: mongoose.Types.ObjectId,
    ref: "forms",
  },
  requested_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Invalid mobile number"],
  },
  zip_code: {
    type: String,
    required: true,
    // validate: [validator.isPostalCode, "Invalid zip code"],
  },
  photo: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
});

module.exports = FormResponse = mongoose.model(
  "form_responses",
  FormResponseSchema
);
