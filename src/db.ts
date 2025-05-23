import mongoose from 'mongoose';

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/incident';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout
        });
        console.log('MongoDB connected to Atlas');
        return mongoose.connection; // Return connection for potential use
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;   
