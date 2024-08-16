const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: ['Neuf', 'Utilisé']
  },
  reference: {
    type: String,
    required: true
  },
  marque: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrandPiece',
    required: true
  },
  compatibleCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeVoiture'
  }],
  typePiece: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypePiece',
    required: true
  },
  image: {},
}, { timestamps: true });

module.exports = mongoose.model('Piece', pieceSchema);
