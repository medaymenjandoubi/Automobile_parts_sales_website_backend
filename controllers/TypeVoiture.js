const AWS = require('aws-sdk')
var { nanoid } = require("nanoid");
const TypeVoiture = require('../models/TypeVoiture');
const MarqueVoiture = require('../models/MarqueVoiture');

const awsConfig = {
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}
const S3 = new AWS.S3(awsConfig)

async function postTypeVoiture(req, res) {
  try {
      const { name, marque, annee, carburant, image } = req.body;
    console.log(annee)
      // Validate required fields
      if (!name || !marque || !annee || !carburant || !image) {
          return res.status(400).json({ error: 'All fields are required: name, marque, année, carburant, image.' });
      }

      // Validate `année` to be a number
      if (isNaN(annee)) {
          return res.status(400).json({ error: 'Invalid value for année. It must be a number.' });
      }

      // Validate `carburant` against enum
      const validCarburants = ['Essence', 'Diesel', 'Electrique', 'BioEthanol', 'Hybride (essence/électricité)', 'Hybride (diesel/électrique)', 'GPL'];
      if (!validCarburants.includes(carburant)) {
          return res.status(400).json({ error: `Invalid value for carburant. Must be one of ${validCarburants.join(', ')}.` });
      }

      // Create a new TypeVoiture document
      const newTypeVoiture = new TypeVoiture({
          name,
          marque,
          année:annee,
          carburant,
          image,
      });

      // Save the document to the database
      const savedTypeVoiture = await newTypeVoiture.save();
        
      // Update the MarqueVoiture to include the new TypeVoiture's ID
      await MarqueVoiture.findByIdAndUpdate(marque, {
        $push: { types: savedTypeVoiture._id },
      });
      // Send a response
      res.status(201).json({
        message: 'TypeVoiture created successfully and marque updated',
        typeVoiture: savedTypeVoiture,
      });
    //   res.status(201).json({ message: 'TypeVoiture created successfully', typeVoiture: newTypeVoiture });
  } catch (error) {
      console.error('Error creating TypeVoiture:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

  async function getAllTypeVoiture (req,res) {
    try {
        const typeVoiture = await TypeVoiture.find({});
        res.status(200).json(typeVoiture);
      } catch (error) {
        console.error('Error fetching marques:', error);
        res.status(500).json({ message: 'Error fetching marques' });
      }
  }

  async function deleteTypeVoitureById(req, res) {
    const typeVoitureId = req.params.id;
    console.log("Deleting marque with ID:", typeVoitureId);

    try {
        // Find the marque to ensure it exists
        const typeVoiture = await TypeVoiture.findById(typeVoitureId);
        if (!typeVoiture) {
            return res.status(404).json({ message: 'Marque not found' });
        }
        console.log("typeVoiture found:", typeVoiture);

        // Delete the marque
        const response = await TypeVoiture.findByIdAndDelete(typeVoitureId);
        console.log("Delete response:", response);

        // Send success response
        return res.status(200).json({ message: 'Marque deleted successfully' });
    } catch (error) {
        console.error("Error deleting marque:", error);
        // Send error response
        return res.status(500).json({ message: error.message });
    }
}

  module.exports = {postTypeVoiture,getAllTypeVoiture,deleteTypeVoitureById}