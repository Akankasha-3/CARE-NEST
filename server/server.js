import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
console.log('NODE ENV:', process.env.NODE_ENV);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;
// console.log('MongoDB URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


//  USER SCHEMA 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, enum: ['user', 'provider'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

//SCHEMAS 
const companionshipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companionType: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

const Companionship = mongoose.model('Companionship', companionshipSchema);

const homeNursingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nurseType: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

const HomeNursing = mongoose.model('HomeNursing', homeNursingSchema);


// AUTH MIDDLEWARE
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// AUTH STRIPE PAYMENT ROUTE
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // ₹ → lowest currency unit
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: "Payment failed", error });
  }
});


//  ROUTES
app.post('/api/companionship', auth, async (req, res) => {
  try {
    const { companionType, date, notes } = req.body;

    if (!companionType || !date) {
      return res.status(400).json({ message: 'Companion type and date are required' });
    }

    const companionship = new Companionship({
      userId: req.user._id,
      companionType,
      date,
      notes
    });

    await companionship.save();
    res.status(201).json({ message: 'Companionship request submitted', companionship });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/home-nursing', auth, async (req, res) => {
  try {
    const { nurseType, date, notes } = req.body;

    if (!nurseType || !date) {
      return res.status(400).json({ message: 'Nurse type and date are required' });
    }

    const homeNursing = new HomeNursing({
      userId: req.user._id,
      nurseType,
      date,
      notes
    });

    await homeNursing.save();
    res.status(201).json({ message: 'Home nursing request submitted', homeNursing });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// AUTH ROUTES 
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, phone, userType });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({ message: 'Login successful', token, user });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  res.json({ user: req.user });
});


// HEALTH CHECK 
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});


//  SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
