const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
