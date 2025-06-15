const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // 
const brcypt = require('bcrypt'); // For password hashing

const userSchema = new mongoose.Schema({
  _id: Number, 
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
  _id: false 
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password is not modified
    }
    this.password = await brcypt.hash(this.password, 10); // Hash the password
    next();
});

userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });

const User = mongoose.model('User', userSchema);

module.exports = User;

