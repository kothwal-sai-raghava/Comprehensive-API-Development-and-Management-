const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
      }

    // Check user exists and password matches

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user:userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res,next) => {
    const { name, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
        const user = new User({ name, email, phone, password: hashedPassword });
        await user.save();
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({user:userData});
    } catch (error) {
        next(error); // Pass the error to the error handling middleware 
    }
};

const getUser = async (req, res,next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page  
    const skip = (page - 1) * limit; // Calculate the number of users to skip 
    try {
        const users = await User.find({},'-__v -password').skip(skip).limit(limit);
        const total=await User.countDocuments();
        
        // Exclude __v and password fields
        res.status(200).json({
            page,
            totalPages: Math.ceil(total / limit),
            totalUsers: total,
            users,

        });
    } catch (error) {
       next(error); // Pass the error to the error handling middleware
    }
}

const getUserById = async (req, res,next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userData } = user.toObject();

    res.status(200).json({ user:userData });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const updateUser = async (req, res,next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    let { id } = req.params;
    let { name, email, password } = req.body;

    try {

        if(password){
            password = await bcrypt.hash(password, 10); // Hash the password if provided
        }

        const user = await User.findByIdAndUpdate(id,   
            { name, email, ...(password && { password }) },
            { new: true, runValidators: true } // Return the updated user and validate the update
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({user:userData });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

const deleteUser = async (req, res,next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};
// This code defines the user controller functions for creating, retrieving, updating, and deleting users in a MongoDB database using Mongoose.