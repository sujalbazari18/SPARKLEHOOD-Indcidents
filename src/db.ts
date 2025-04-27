import mongoose from 'mongoose';
// NOTE: Replace <db_password> with your actual MongoDB Atlas password
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://bazarisujal8815:xCR2gY0I2ObD2mKC@incident.9zfajd1.mongodb.net/?retryWrites=true&w=majority&appName=INCIDENT';

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
