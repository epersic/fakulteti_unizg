const path = require('path');
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'password',
  database: process.env.PGDATABASE || 'fakulteti_unizg',
  max: 10
});


function buildFilters(q, params) {
  const conditions = [];

  const textCols = ['name','short_name','website','address_street','address_city','postal_code','university'];
  textCols.forEach(col => {
    if (q[col]) {
      params.push(`%${q[col]}%`);
      conditions.push(`${col} ILIKE $${params.length}`);
    }
  });
 
  if (q.established_year) {
    params.push(parseInt(q.established_year, 10));
    conditions.push(`established_year = $${params.length}`);
  }

  if (q.id) {
    params.push(parseInt(q.id, 10));
    conditions.push(`id = $${params.length}`);
  }
  return conditions.length ? ('WHERE ' + conditions.join(' AND ')) : '';
}


app.get('/api/faculties', async (req, res) => {
  try {
    const q = req.query || {};
    const params = [];
    const where = buildFilters(q, params);

    const facultiesSql = `SELECT id, name, short_name, established_year, website, address_street, address_city, postal_code, university FROM faculties ${where} ORDER BY id`;
    const { rows: faculties } = await pool.query(facultiesSql, params);

    if (!faculties.length) {
      
      if (q.format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        return res.send('');
      }
      return res.json([]);
    }

   
    const facultyIds = faculties.map(f => f.id);
    const { rows: departments } = await pool.query(
      `SELECT id, faculty_id, dept_name FROM departments WHERE faculty_id = ANY($1::int[]) ORDER BY id`,
      [facultyIds]
    );

  
    const byFaculty = {};
    departments.forEach(d => {
      if (!byFaculty[d.faculty_id]) byFaculty[d.faculty_id] = [];
      byFaculty[d.faculty_id].push({ dept_id: d.id, dept_name: d.dept_name });
    });

  
    const result = faculties.map(f => ({
      id: f.id,
      name: f.name,
      short_name: f.short_name,
      established_year: f.established_year,
      website: f.website,
      address_street: f.address_street,
      address_city: f.address_city,
      postal_code: f.postal_code,
      university: f.university,
      Departments: (byFaculty[f.id] || []).map(d => ({ dept_name: d.dept_name }))
    }));

    if (q.format === 'csv') {

      const headers = [
        'id','name','short_name','established_year','website','address_street','address_city','postal_code','university','dept_name'
      ];
      const escapeCsv = v => {
        if (v === null || v === undefined) return '';
        const s = String(v);
        if (s.includes(',') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g, '""') + '"';
        return s;
      };
      const lines = [headers.join(',')];
      result.forEach(f => {
        if (f.Departments.length) {
          f.Departments.forEach(d => {
            const row = [f.id, f.name, f.short_name, f.established_year, f.website, f.address_street, f.address_city, f.postal_code, f.university, d.dept_name].map(escapeCsv);
            lines.push(row.join(','));
          });
        } else {
          const row = [f.id, f.name, f.short_name, f.established_year, f.website, f.address_street, f.address_city, f.postal_code, f.university, ''].map(escapeCsv);
          lines.push(row.join(','));
        }
      });
      res.setHeader('Content-Type', 'text/csv');
      res.send(lines.join('\n'));
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
