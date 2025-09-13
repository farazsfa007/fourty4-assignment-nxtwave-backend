// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('User Dashboard API'));

app.use('/api/users', usersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });
