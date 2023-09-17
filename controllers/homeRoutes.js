const express = require('express');
const router = express.Router();
const stylesPath = "../../public/css/style.css";
const { User, Review } = require('../models');
const withAuth = require('../utils/auth')
const {  getAlbumById } = require('./audioDB.js')

// Registration Page
router.get('/register', (req, res) => {
  return res.render('createacct', {stylesPath: stylesPath});
});

// Login Page
router.get('/login', (req, res) => {
  return res.render('login', {stylesPath: stylesPath} );
});

// Profile Page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = userData.get({ plain: true });
    const userReviews = await Review.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    //Display album reviews by user
    for (const review of userReviews) {
      const album = await getAlbumById(review.album_id)
      try {
        console.log(album.album[0].strAlbumThumb)
        review.strAlbumThumb = album.album[0].strAlbumThumb
      } catch (error) {
        console.error(error);
      }
    }
    return res.render('profile', {
      reviews: userReviews,
      username: user.username,
      email: user.email,
      logged_in: true,
      stylesPath: stylesPath,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;