const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Registration Page
router.get('/register', (req, res) => {
  res.render('createacct');
});

router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

    res.redirect('/');
  } catch (error) {
    res.render('homepage', { error });
  }
});

// // Login Page
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// Login User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.logged_in = true;
      res.redirect('/profile');
    } else {
      res.render('auth/login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    res.render('auth/login', { error });
  }
});

// Logout User
router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
