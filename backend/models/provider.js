const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['provider'], default: 'provider' }, 
 
  // Provider-specific fields
  services: [{ type: String }],        // e.g. ['plumbing', 'cleaning']
  location: { type: String },          // e.g. city or area
  isVerified: { type: Boolean, default: false },
  phone: { type: String, minLength: 10, maxLength: 10 }
}, { timestamps: true });

providerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

providerSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Provider', providerSchema);