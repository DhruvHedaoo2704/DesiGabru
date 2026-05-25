import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken, sendTokenCookie } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

const sendUserResponse = (res, user, statusCode = 200) => {
  const token = generateToken(user._id);
  sendTokenCookie(res, token);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      loyaltyPoints: user.loyaltyPoints,
    },
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const user = await User.create({ name, email, password });
  sendUserResponse(res, user, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  sendUserResponse(res, user);
};

export const logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out' });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, user });
};

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, phone: req.body.phone, avatar: req.body.avatar },
    { new: true, runValidators: true }
  );
  res.json({ success: true, user });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ success: true, message: 'If email exists, reset link sent' });
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Desii Gabru - Password Reset',
      message: `Reset: ${resetUrl}`,
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Expires in 10 min.</p>`,
    });
    res.json({ success: true, message: 'Reset email sent' });
  } catch {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ success: false, message: 'Email could not be sent' });
  }
};

export const resetPassword = async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendUserResponse(res, user);
};
