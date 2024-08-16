const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");
const TypePiece = require('../models/TypePiece');

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)

async function postTypePiece(req, res) {
    try {
      const { name, image ,description} = req.body;
  
      // Validate required fields
      if (!name || !image) {
        return res.status(400).json({ error: 'Name and image are required.' });
      }
  
      // Create a new BrandPiece document
      const newTypePiece = new TypePiece({
        name,
        description,
        image,
      });
  
      // Save the document to the database
      await newTypePiece.save();
  
      // Send a response
      res.status(201).json({ message: 'Brand created successfully', brand: newTypePiece });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getAllTypePiece (req,res) {
    try {
        const marques = await TypePiece.find({});
        res.status(200).json(marques);
      } catch (error) {
        console.error('Error fetching marques:', error);
        res.status(500).json({ message: 'Error fetching marques' });
      }
  }
  async function deleteTypePieceById(req, res) {
    const marqueId = req.params.id;
    console.log("Deleting marque with ID:", marqueId);

    try {
        // Find the marque to ensure it exists
        const marque = await TypePiece.findById(marqueId);
        if (!marque) {
            return res.status(404).json({ message: 'Marque not found' });
        }
        console.log("Marque found:", marque);

        // Delete the marque
        const response = await TypePiece.findByIdAndDelete(marqueId);
        console.log("Delete response:", response);

        // Send success response
        return res.status(200).json({ message: 'Marque deleted successfully' });
        
    } catch (error) {
        console.error("Error deleting marque:", error);
        // Send error response
        return res.status(500).json({ message: error.message });
    }
}

  module.exports = {postTypePiece,getAllTypePiece,deleteTypePieceById}