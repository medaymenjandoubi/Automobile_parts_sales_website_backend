const mongoose = require('mongoose');

const brandPieceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {},
}, { timestamps: true });

module.exports = mongoose.model('BrandPiece', brandPieceSchema);
