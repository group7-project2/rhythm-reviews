const express = require('express');
const router = express.Router();
const { Review } = require('../../models');

const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
const audioDbOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3717db3bafmsh3630d39920bf588p1025c6jsnd065f1276f3c',
		'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
	}
};
router.get('/album/:id', async (req, res) => {
  try {
    console.log('pathid',req.params.id)
    const response = await fetch(`${audioDbRootUrl}/album.php?m=${req.params.id}`, audioDbOptions)
    const album = await response.json()
    console.log(album);
    res.render('review', {album: album.album, reviews: []})
  } catch (error) {
    res.error()
  }
})


// // View Reviews
// router.get('/', async (req, res) => {
//   try {
//     // Fetch and render a list of reviews from the database
//     const reviews = await Review.findAll();
//     res.render('reviews/index', { reviews });
//   } catch (error) {
//     // Handle errors when fetching reviews
//     res.status(500).send('Error fetching reviews');
//   }
// });

// // Create a Review (requires authentication)
// router.get('/create', (req, res) => {
//   res.render('reviews/create');
// });

// router.post('/create', async (req, res) => {
//   try {
//     res.redirect('/views/review');
//   } catch (error) {
//     res.render('reviews/create', { error });
//   }
// });



module.exports = router;
