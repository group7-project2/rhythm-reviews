const express = require('express');
const router = express.Router();

// Registration Page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    // Redirect to login page after successful registration
    res.redirect('/auth/login');
  } catch (error) {
    res.render('auth/register', { error });
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Login User (Implement your login logic here)
router.post('/login', async (req, res) => {
  try {
    res.redirect('/dashboard');
  } catch (error) {
    res.render('auth/login', { error });
  }
});

module.exports = router;
