const express = require('express');
const { register,login,logout, currentUser } = require('../controllers/auth');

const router = express.Router();
// const sql = require('mssql');
const { requireSignin } = require('../middlewares');
// const config = {
//     server: 'DESKTOP-8GVPJNN',
//     database: 'finance',
//     user: 'tunisair_express',
//     password: 'jasser123',
//     options: {
//         trustServerCertificate: true
//     }
//   };

router.post('/register', register);
router.post('/login', login);
router.get("/logout", logout)
router.get("/current-user",requireSignin,currentUser)
module.exports = router;