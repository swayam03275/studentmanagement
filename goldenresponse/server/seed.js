import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import mongoose from 'mongoose';
import Admin from './src/models/Admin.js';

const DEFAULT_ADMIN = {
  name: 'Admin',
  email: 'admin@example.com',
  password: 'Admin@123',
};

/**
 * Seed script — creates a default admin account if one doesn't already exist.
 *
 * Usage:  node seed.js        (or npm run seed)
 */
const seedAdmin = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Check if the default admin already exists
    const existingAdmin = await Admin.findOne({ email: DEFAULT_ADMIN.email });

    if (existingAdmin) {
      console.log(`ℹ️  Admin with email "${DEFAULT_ADMIN.email}" already exists. Skipping seed.`);
    } else {
      // 3. Create the admin (password is auto-hashed by the pre-save hook)
      const admin = await Admin.create(DEFAULT_ADMIN);
      console.log('✅ Default admin created successfully:');
      console.log(`   Name:     ${admin.name}`);
      console.log(`   Email:    ${admin.email}`);
      console.log(`   Password: ${DEFAULT_ADMIN.password}`);
    }

    // 4. Disconnect
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected. Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

seedAdmin();
