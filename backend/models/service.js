const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pricing: {
    type: Number,
    required: true,
  },
  description: String,
  isApproved: {
    type: Boolean,
    default: false, // Admin will approve
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);