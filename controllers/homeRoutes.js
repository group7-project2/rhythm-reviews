const express = require('express');
const router = express.Router();
// const { User } = require('../../models');

// Registration Page
router.get('/register', (req, res) => {
  res.render('createacct');
});


// Registration Page
router.get('/register', (req, res) => {
  res.render('createacct');
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;