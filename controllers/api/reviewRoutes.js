// controllers/api/reviewRoutes.js
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
    // Implement logic to create a new review and save it to the database
    // Redirect to the reviews page after successful review creation
    res.redirect('/reviews');
  } catch (error) {
    // Handle errors when creating a review
    res.render('reviews/create', { error });
  }
});

module.exports = router;
