const express = require('express');
const { uploadImage, removeImage } = require('../controllers/Admin');
const { postMarque, getAllMarques, deleteMarqueById } = require('../controllers/Marque');
const { postTypePiece, getAllTypePiece, deleteTypePieceById } = require('../controllers/TypePiece');
const { postTypeVoiture, getAllTypeVoiture, deleteTypeVoitureById } = require('../controllers/TypeVoiture');
const { postPiece, getAllPiece, deletePieceById } = require('../controllers/Piece');
const { postMarqueVoiture, getAllMarqueVoiture, deleteMarqueVoitureById } = require('../controllers/MarqueVoiture');
const router = express.Router();



//******* ROUTES TO HANDLE IMAGES SAVE AND DELETE FROM AWS ******/
router.post('/upload-image', uploadImage);
router.post('/remove-image', removeImage);
//******* ROUTES FOR Brands*********/
router.post("/PostMarque",postMarque)
router.get("/getAllMarques",getAllMarques)
router.delete('/deleteMarqueById/:id', deleteMarqueById);
//******* ROUTES FOR TYPE OF PIECE*******/
router.post("/PostTypePiece",postTypePiece)
router.get("/getAllTypePiece",getAllTypePiece)
router.delete('/deleteTypePieceById/:id', deleteTypePieceById);
//******* ROUTES FOR TYPE OF VOITURE*******/
router.post("/PostTypeVoiture",postTypeVoiture)
router.get("/getAllTypeVoiture",getAllTypeVoiture)
router.delete('/deleteTypeVoitureById/:id', deleteTypeVoitureById)
//******* ROUTES FOR PIECE*********/
router.post("/PostPiece",postPiece)
router.get("/getAllPiece",getAllPiece)
router.delete('/deletePieceById/:id', deletePieceById);
/******** ROUTES FOR MARQUE VOITURE */
router.post("/PostMarqueVoiture",postMarqueVoiture)
router.get("/getAllMarqueVoiture",getAllMarqueVoiture)
router.delete('/deleteMarqueVoitureById/:id', deleteMarqueVoitureById)
module.exports = router;