const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  coordinates: {
    type: [[Number]], // Array of coordinates (each coord is [lat, long])
    required: true
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
