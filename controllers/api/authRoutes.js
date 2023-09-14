const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Create account
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

    });

    res.render('homepage', {
      stylesPath: stylesPath,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.render('homepage', { error });
  }
});


// Login User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
      });
      res.render('homepage', {
        stylesPath: stylesPath,
        logged_in: req.session.logged_in
      });
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    res.render('login', { error });
  }
});

// Logout User
router.get('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
