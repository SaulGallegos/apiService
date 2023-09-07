const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use;
app.use(cors());
app.use(bodyParser.json());

const dbConnection = require('./db/index');
dbConnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
