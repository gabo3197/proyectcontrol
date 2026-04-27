'use strict';

require('dotenv').config();
const app       = require('./app');
const sequelize = require('./shared/db');

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  Database connection established');
    app.listen(PORT, () => {
      console.log(`🚀  TaskFlow API  →  http://localhost:${PORT}`);
      console.log(`🏥  Health        →  http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌  Unable to start:', err.message);
    process.exit(1);
  }
};

start();
