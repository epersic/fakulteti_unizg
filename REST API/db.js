const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'dpg-d5fcnrchg0os73f7hph0-a.oregon-postgres.render.com',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'fakulteti_unizg_user',
  password: process.env.PGPASSWORD || 'L4F9YgHGoKFtyk26sxFG0wZBW1h7RZm9',
  database: process.env.PGDATABASE || 'fakulteti_unizg',
  max: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
