require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9999999999',
    company: { name: 'ACME Inc' },
    address: { street: 'Street 1', city: 'Mumbai', zipcode: '400001', geo: { lat: 19.07, lng: 72.87 } }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '8888888888',
    company: { name: 'Globex' },
    address: { street: 'Street 2', city: 'Pune', zipcode: '411001', geo: { lat: 18.52, lng: 73.85 } }
  }
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany({});
    await User.insertMany(sampleUsers);
    console.log('Seeded users');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
