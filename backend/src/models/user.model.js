import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    avatar: {
      type: String,
      default: 'https://tse1.mm.bing.net/th/id/OIP.Rg2FmvXuSaiA7GHVqvuY0QHaFj?pid=Api&P=0&h=180',
    },
    coverImage: {
      type: String,
      default: 'https://tse1.mm.bing.net/th/id/OIP.Ap7CXl8VCxaeqDKo1uRYTAHaB2?pid=Api&P=0&h=180',
    },
    channelDescription: {
      type: String,
      maxLength: 5000,
      default: 'Hey! I am using LoopX.',
    },
    myLink: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

const User = new mongoose.model('User', userSchema);

export { User };
