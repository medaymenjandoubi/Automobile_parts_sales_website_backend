const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");
const MarqueVoiture = require('../models/MarqueVoiture');

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)

async function postMarqueVoiture(req, res) {
  try {
      const { name, types, image } = req.body;
    //console.log(annee)
      // Validate required fields
      if (!name || !types|| !image) {
          return res.status(400).json({ error: 'All fields are required: name, marque, année, carburant, image.' });
      }

      // Create a new TypeVoiture document
      const newMarqueVoiture = new MarqueVoiture({
          name,
          types,
          image,
      });

      // Save the document to the database
      await newMarqueVoiture.save();

      // Send a response
      res.status(201).json({ message: 'TypeVoiture created successfully', marqueVoiture: newMarqueVoiture });
  } catch (error) {
      console.error('Error creating MarqueVoiture:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

  async function getAllMarqueVoiture (req,res) {
    try {
        const marqueVoiture = await MarqueVoiture.find({});
        res.status(200).json(marqueVoiture);
      } catch (error) {
        console.error('Error fetching marques voitures:', error);
        res.status(500).json({ message: 'Error fetching marques voitures' });
      }
  }

  async function deleteMarqueVoitureById(req, res) {
    const marqueVoitureId = req.params.id;
    console.log("Deleting marque with ID:", marqueVoitureId);

    try {
        // Find the marque to ensure it exists
        const marqueVoiture = await MarqueVoiture.findById(marqueVoitureId);
        if (!marqueVoiture) {
            return res.status(404).json({ message: 'Marque  voiture not found' });
        }
        console.log("marqueVoiture found:", marqueVoiture);

        // Delete the marque
        const response = await MarqueVoiture.findByIdAndDelete(marqueVoitureId);
        console.log("Delete response:", response);

        // Send success response
        return res.status(200).json({ message: 'Marque voiture deleted successfully' });
    } catch (error) {
        console.error("Error deleting marque:", error);
        // Send error response
        return res.status(500).json({ message: error.message });
    }
}

  module.exports = {postMarqueVoiture,getAllMarqueVoiture,deleteMarqueVoitureById}