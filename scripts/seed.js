const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const seedData = async () => {
  try {
    await connectDB();

    await Appointment.deleteMany({});
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('Test@12345', 10);

    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword,
    });

    await Appointment.create({
      user: user._id,
      doctorName: 'Dr. Smith',
      date: new Date(),
      time: '10:00 AM',
      status: 'pending',
    });

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
