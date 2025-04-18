import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB without the outdated options (useNewUrlParser & useUnifiedTopology)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    // Improved error handling and logging
    console.error('MongoDB connection error:', error.message || error);
    process.exit(1); // Exit the process if unable to connect to DB
  }
};

export default connectDB;

