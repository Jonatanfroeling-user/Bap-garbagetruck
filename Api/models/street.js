const mongoose = require('mongoose');
const { Schema } = mongoose;

// const CoordSchema = new Schema({
//   lat: {
//     type: Number,
//     required: true
//   },
//   lng: {
//     type: Number,
//     required: true
//   }
// });

const PartSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  coords: {
    type: [[Number]],
    required: true
  }
});

const StreetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  parts: {
    type: [PartSchema],
    required: true
  }
});

const StreetModel = mongoose.model('Street', StreetSchema);

module.exports = StreetModel;
