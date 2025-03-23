const { Content } = require('../models/content.model');

// DELETE /api/content/:id
exports.deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Content.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: `Content with ID ${id} deleted.` });
    } else {
      res.status(404).json({ error: 'Content not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete content.' });
  }
};