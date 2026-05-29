import mongoose from 'mongoose';

/**
 * Connects to MongoDB with retry logic.
 * Retries up to MAX_RETRIES times with exponential backoff on initial failure.
 */

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000; // 5 seconds base delay

const connectDB = async () => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        // Mongoose 8 uses the new connection string parser and unified topology by default
      });

      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retries += 1;
      console.error(
        `❌ MongoDB connection attempt ${retries}/${MAX_RETRIES} failed: ${error.message}`
      );

      if (retries >= MAX_RETRIES) {
        console.error('❌ Max retries reached. Exiting process.');
        process.exit(1);
      }

      // Exponential backoff: 5s, 10s, 20s, 40s, 80s
      const delay = RETRY_DELAY_MS * Math.pow(2, retries - 1);
      console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// ── Mongoose connection event listeners ──────────────────────────────────────

mongoose.connection.on('connected', () => {
  console.log('📦 Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error(`📦 Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('📦 Mongoose disconnected from the database');
});

export default connectDB;
