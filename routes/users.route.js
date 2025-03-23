const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

router.get('/', verifyToken, requireRole('manager'), async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username', 'role'] });
  res.json(users);
});

module.exports = router;