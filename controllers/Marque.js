const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");
const BrandPiece = require('../models/BrandPiece');

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)

async function postMarque(req, res) {
    try {
      const { name, image ,description} = req.body;
  
      // Validate required fields
      if (!name || !image) {
        return res.status(400).json({ error: 'Name and image are required.' });
      }
  
      // Create a new BrandPiece document
      const newBrandPiece = new BrandPiece({
        name,
        description,
        image,
      });
  
      // Save the document to the database
      await newBrandPiece.save();
  
      // Send a response
      res.status(201).json({ message: 'Brand created successfully', brand: newBrandPiece });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getAllMarques (req,res) {
    try {
        const marques = await BrandPiece.find({});
        res.status(200).json(marques);
      } catch (error) {
        console.error('Error fetching marques:', error);
        res.status(500).json({ message: 'Error fetching marques' });
      }
  }
  async function deleteMarqueById(req, res) {
    const marqueId = req.params.id;
    console.log("Deleting marque with ID:", marqueId);

    try {
        // Find the marque to ensure it exists
        const marque = await BrandPiece.findById(marqueId);
        if (!marque) {
            return res.status(404).json({ message: 'Marque not found' });
        }
        console.log("Marque found:", marque);

        // Delete the marque
        const response = await BrandPiece.findByIdAndDelete(marqueId);
        console.log("Delete response:", response);

        // Send success response
        return res.status(200).json({ message: 'Marque deleted successfully' });
        
    } catch (error) {
        console.error("Error deleting marque:", error);
        // Send error response
        return res.status(500).json({ message: error.message });
    }
}

  module.exports = {postMarque,getAllMarques,deleteMarqueById}