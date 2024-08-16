const mongoose = require('mongoose');

const MarqueVoitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  types: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeVoiture',
    },
  ],
  image: {},
});

module.exports = mongoose.model('MarqueVoiture', MarqueVoitureSchema);
