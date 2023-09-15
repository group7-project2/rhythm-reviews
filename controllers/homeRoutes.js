const express = require('express');
const router = express.Router();
const stylesPath = "../../public/css/style.css";
const { User, Review } = require('../models');
const withAuth = require('../utils/auth')

// Registration Page
router.get('/register', (req, res) => {
  res.render('createacct', {stylesPath: stylesPath});
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login', {stylesPath: stylesPath} );
});

// Profile Page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const user = userData.get({ plain: true });
    const userReviews = await Review.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    res.render('profile', {
      reviews: userReviews,
      username: user.username,
      email: user.email,
      logged_in: true,
      stylesPath: stylesPath,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;