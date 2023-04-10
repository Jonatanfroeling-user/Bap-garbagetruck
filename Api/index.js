const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

// import routes
const registerRoutes = require('./Routs/routing')


// init app
const app = express();
const port = process.env.PORT || 3022;

app.use(bodyParser.json());
app.use(cors())

// connect to mognoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Succefuly to MongoDB !'))
  .catch(err => console.error('-xxx  failed connection!', err));


registerRoutes(app)

app.listen(port, () => {
  console.log('Server runs on', port);
});
