const express = require('express');
const pool = require('../db');
const router = express.Router();

const wrap = (data) => ({
  success: true,
  response: data
});


router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM departments');
    res.json(wrap(rows));
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM departments WHERE id = $1',
      [req.params.id]
    );
    res.json(wrap(rows[0] || null));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
