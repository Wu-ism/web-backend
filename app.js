require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/user.model');
const Content = require('./models/content.model');
const Device = require('./models/device.model');

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database error:', err));

// Sync tables (dev only)
sequelize.sync({ alter: true }); // you can remove alter: true in production

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/content', require('./routes/content.route'));
app.use('/api/devices', require('./routes/device.route'));

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));