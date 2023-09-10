const express = require('express');
const router = express.Router();
const { Review } = require('../../models');

// View Reviews
router.get('/', async (req, res) => {
  try {
    // Fetch and render a list of reviews from the database
    const reviews = await Review.findAll();
    res.render('reviews/index', { reviews });
  } catch (error) {
    // Handle errors when fetching reviews
    res.status(500).send('Error fetching reviews');
  }
});

// Create a Review (requires authentication)
router.get('/create', (req, res) => {
  res.render('reviews/create');
});

router.post('/create', async (req, res) => {
  try {
    res.redirect('/reviews');
  } catch (error) {
    res.render('reviews/create', { error });
  }
});

module.exports = router;
