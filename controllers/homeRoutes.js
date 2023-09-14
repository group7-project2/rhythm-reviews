const express = require('express');
const router = express.Router();
const stylesPath = "../../public/css/style.css";


// Registration Page
router.get('/register', (req, res) => {
  res.render('createacct', {stylesPath: stylesPath});
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login', {stylesPath: stylesPath} );
});

module.exports = router;