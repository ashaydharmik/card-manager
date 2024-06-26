const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Agender', 'Bigender','Polygender','Non-binary','Genderfluid', 'Genderqueer'],
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});


module.exports = mongoose.model("User", userSchema);
