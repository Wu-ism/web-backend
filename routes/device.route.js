const express = require('express');
const router = express.Router();
const Device = require('../models/device.model');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// GET all devices (admin only)
router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  const devices = await Device.findAll();
  res.json(devices);
});

// POST register a device
router.post('/register', async (req, res) => {
  const { name, serial } = req.body;
  try {
    const device = await Device.create({ name, serial });
    res.status(201).json({ message: 'Device registered', device });
  } catch (err) {
    res.status(500).json({ error: 'Device already exists or invalid' });
  }
});

// POST check-in (device ping)
router.post('/checkin', async (req, res) => {
  const { serial } = req.body;
  const device = await Device.findOne({ where: { serial } });

  if (!device) return res.status(404).json({ error: 'Device not found' });

  device.status = 'online';
  device.lastCheckIn = new Date();
  await device.save();

  res.json({ message: 'Device check-in recorded', device });
});

module.exports = router;