import mongoose from "mongoose"

const connectDB = async() => {
    try {
        // Set global mongoose options
        mongoose.set('bufferCommands', false); // Disable command buffering
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 60000, // Increase to 60 seconds
            socketTimeoutMS: 75000, // Increase socket timeout
            connectTimeoutMS: 60000, // Increase connection timeout
            maxPoolSize: 10, // Control connection pool size
            minPoolSize: 2, // Maintain minimum connections
            maxIdleTimeMS: 30000 // Close idle connections after 30 seconds
        });
        
        // Add connection event listeners
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected, attempting to reconnect...');
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;
