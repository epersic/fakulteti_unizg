require('dotenv').config();
const express = require('express');

const facultiesRoutes = require('./routes/faculties');
const departmentsRoutes = require('./routes/departments');

const app = express();
app.use(express.json());


app.use('/api/faculties', facultiesRoutes);
app.use('/api/departments', departmentsRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    response: null
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
