const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");
const Piece = require('../models/Piece');

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)

async function postPiece(req, res) {
  try {
    const { name, price, state, reference, marque, compatibleCars, typePiece, image } = req.body;

    // Validate required fields
    if (!name || !price || !state || !reference || !marque || !typePiece || !image) {
      return res.status(400).json({ error: 'Name, price, state, reference, marque, typePiece, and image are required.' });
    }

    // Create a new Piece document
    const newPiece = new Piece({
      name,
      price,
      state,
      reference,
      marque,
      compatibleCars,
      typePiece,
      image,
    });

    // Save the document to the database
    await newPiece.save();

    // Send a response
    res.status(201).json({ message: 'Piece created successfully', piece: newPiece });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  postPiece
};

  async function getAllPiece (req,res) {
    try {
        const marques = await Piece.find({});
        res.status(200).json(marques);
      } catch (error) {
        console.error('Error fetching marques:', error);
        res.status(500).json({ message: 'Error fetching marques' });
      }
  }
  async function deletePieceById(req, res) {
    const marqueId = req.params.id;
    console.log("Deleting marque with ID:", marqueId);

    try {
        // Find the marque to ensure it exists
        const marque = await Piece.findById(marqueId);
        if (!marque) {
            return res.status(404).json({ message: 'Marque not found' });
        }
        console.log("Marque found:", marque);

        // Delete the marque
        const response = await Piece.findByIdAndDelete(marqueId);
        console.log("Delete response:", response);

        // Send success response
        return res.status(200).json({ message: 'Marque deleted successfully' });
        
    } catch (error) {
        console.error("Error deleting marque:", error);
        // Send error response
        return res.status(500).json({ message: error.message });
    }
}

  module.exports = {postPiece,getAllPiece,deletePieceById}