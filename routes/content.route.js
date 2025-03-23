const express = require('express');
const router = express.Router();
const Content = require('../models/content.model');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// GET all content
router.get('/', verifyToken, async (req, res) => {
  const content = await Content.findAll();
  res.json(content);
});

// POST new content (admin or manager)
router.post('/', verifyToken, requireRole('manager'), async (req, res) => {
  try {
    const { title, type, url, schedule } = req.body;
    const newContent = await Content.create({ title, type, url, schedule });
    res.status(201).json(newContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// ✅ DELETE content by ID (admin or manager)
router.delete('/:id', verifyToken, requireRole('manager'), async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Content.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: `Content with ID ${id} deleted.` });
    } else {
      res.status(404).json({ error: 'Content not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete content.' });
  }
});

module.exports = router;