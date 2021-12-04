const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const todoRoute = require('./routes/todos');

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

dotenv.config();

app.use('/api/todos', todoRoute);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
