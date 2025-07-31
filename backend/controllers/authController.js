const User = require('../models/user');
const Provider = require('../models/provider');
const Admin = require('../models/admin');
const generateToken = require('../utils/generateToken');

// Helper to select model by role
const getModelByRole = (role) => {
  if (role === 'user') return User;
  if (role === 'provider') return Provider;
  if (role === 'admin') return Admin;
  throw new Error('Invalid role');
};

// SIGNUP
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const checkEmailExists = async (email) => {
    const user = await User.findOne({ email });
    const provider = await Provider.findOne({ email });
    const admin = await Admin.findOne({ email });

    return user || provider || admin;
};

  try {
    const Model = getModelByRole(role);
    if (await checkEmailExists(req.body.email)) {
        return res.status(400).json({ success: false, message: "Email already in use for another role." });
    }

    let newUserData = { name, email, password, role };

    // 🔒 Add only if role is provider
    if (role === 'provider') {
      newUserData.services = req.body.services || [];
      newUserData.location = req.body.location || '';
      newUserData.phone = req.body.phone || '';
    }

    const user = new Model(newUserData);
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const Model = getModelByRole(role);
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: `${role} not found` });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};