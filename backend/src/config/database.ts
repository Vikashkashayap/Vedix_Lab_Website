import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not found in environment variables');
}

export const connectDB = async (): Promise<void> => {
  try {
    if (!DATABASE_URL) {
      console.log('⚠️  MongoDB connection skipped - DATABASE_URL not configured');
      return;
    }

    await mongoose.connect(DATABASE_URL);
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit the process, allow server to run without DB
    // process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

