const express = require('express');
const pool = require('../db');
const router = express.Router();


const wrap = (data) => ({
  success: true,
  response: data
});


router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM faculties');
    
    
    const semanticData = rows.map(faculty => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": faculty.website || `https://example.com/faculty/${faculty.id}`,
      "id": faculty.id,
      "name": faculty.name,
      "url": faculty.website,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": faculty.address_street,
        "addressLocality": faculty.address_city,
        "postalCode": faculty.postal_code
      },
      "foundingDate": String(faculty.established_year),
      "short_name": faculty.short_name,
      "university": faculty.university
    }));
    
    res.json(semanticData);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM faculties WHERE id = $1',
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
        response: null
      });

    
    const faculty = rows[0];
    const semanticData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": faculty.website || `https://example.com/faculty/${faculty.id}`,
      "id": faculty.id,
      "name": faculty.name,
      "url": faculty.website,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": faculty.address_street,
        "addressLocality": faculty.address_city,
        "postalCode": faculty.postal_code
      },
      "foundingDate": String(faculty.established_year),
      "short_name": faculty.short_name,
      "university": faculty.university
    };
    
    res.json(semanticData);
  } catch (err) {
    next(err);
  }
});


router.get('/city/:city', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM faculties WHERE address_city = $1',
      [req.params.city]
    );
    res.json(wrap(rows));
  } catch (err) {
    next(err);
  }
});


router.get('/established/before/:year', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM faculties WHERE established_year < $1',
      [req.params.year]
    );
    res.json(wrap(rows));
  } catch (err) {
    next(err);
  }
});


router.get('/:id/departments', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT d.*
       FROM departments d
       WHERE d.faculty_id = $1`,
      [req.params.id]
    );
    res.json(wrap(rows));
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const {
      name, short_name, established_year, website,
      address_street, address_city, postal_code, university
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO faculties
       (name, short_name, established_year, website,
        address_street, address_city, postal_code, university)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [name, short_name, established_year, website,
       address_street, address_city, postal_code, university]
    );

    res.status(201).json(wrap(rows[0]));
  } catch (err) {
    next(err);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { name, website } = req.body;

    const { rows } = await pool.query(
      `UPDATE faculties
       SET name = COALESCE($1, name),
           website = COALESCE($2, website)
       WHERE id = $3
       RETURNING *`,
      [name, website, req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
        response: null
      });

    res.json(wrap(rows[0]));
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM faculties WHERE id = $1',
      [req.params.id]
    );

    if (rowCount === 0)
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
        response: null
      });

    res.json(wrap({ deleted: true }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
