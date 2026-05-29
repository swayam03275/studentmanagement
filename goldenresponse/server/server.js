import dotenv from 'dotenv';

// Load environment variables BEFORE any other imports that depend on them
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

/**
 * Bootstrap the server:
 * 1. Connect to MongoDB
 * 2. Start listening for HTTP requests
 * 3. Register graceful shutdown handlers
 */
const startServer = async () => {
  try {
    // 1. Establish database connection
    await connectDB();

    // 2. Start Express
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    });

    // ── Graceful Shutdown ──────────────────────────────────────────────────
    // Handle termination signals so in-flight requests can complete
    // and the DB connection is closed cleanly.
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        console.log('✅ HTTP server closed');
        try {
          const mongoose = (await import('mongoose')).default;
          await mongoose.connection.close();
          console.log('✅ MongoDB connection closed');
        } catch (err) {
          console.error('Error closing MongoDB connection:', err.message);
        }
        process.exit(0);
      });

      // Force-kill after 10 seconds if graceful shutdown stalls
      setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Catch unhandled rejections — log and exit to avoid silent failures
    process.on('unhandledRejection', (reason) => {
      console.error('UNHANDLED REJECTION:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

    // Catch uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('UNCAUGHT EXCEPTION:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
