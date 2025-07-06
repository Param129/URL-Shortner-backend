import mongoose from "mongoose"

const connectDB = async() => {
    // Disable buffering completely
    mongoose.set('bufferCommands', false);
    
    // Connection retry logic
    const connectWithRetry = async () => {
        try {
            console.log('MongoDB connection attempt...');
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000, // Quick timeout for faster retries
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,
                maxPoolSize: 10,
                minPoolSize: 2
            });
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (err) {
            console.error(`MongoDB Connection Error: ${err.message}`);
            console.log('Retrying connection in 5 seconds...');
            // Wait for 5 seconds before retrying
            setTimeout(connectWithRetry, 5000);
        }
    };

    // Initial connection attempt
    await connectWithRetry();
    
    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        if (err.name === 'MongoNetworkError') {
            // Try to reconnect
            setTimeout(connectWithRetry, 5000);
        }
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected, attempting to reconnect...');
        setTimeout(connectWithRetry, 5000);
    });
}

export default connectDB;
