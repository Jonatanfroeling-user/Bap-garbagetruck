const mongoose = require('mongoose');

const realTimeLocationSchema = new mongoose.Schema({
  coordinates: {
    type: [[Number]], // Array of coordinates (each coord is [lat, long])
    required: true
  }
});

const RealTimeLocation = mongoose.model('RealTimeLocation', realTimeLocationSchema);

module.exports = RealTimeLocation;