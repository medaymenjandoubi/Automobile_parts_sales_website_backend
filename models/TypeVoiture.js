const mongoose = require('mongoose');

const TypeVoitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  marque: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarqueVoiture',
    required: true,
  },
  année: {
    type: Number,
    required: true,
  },
  carburant: {
    type: String,
    required: true,
    enum: ['Essence', 'Diesel', 'Electrique', "BioEthanol", "Hybride(essence/électricité)", "Hybride (diesel/électrique)", "GPL"]
  },
  image: {},
});

module.exports = mongoose.model('TypeVoiture', TypeVoitureSchema);
