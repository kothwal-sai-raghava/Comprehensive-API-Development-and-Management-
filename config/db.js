const mongoose= require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const conn= await mongoose.connect(
        process.env.MONGO_URL
    );

    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectDB;
// This function connects to the MongoDB database using Mongoose.