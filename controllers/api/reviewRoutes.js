const express = require('express');
const router = express.Router();
const { Review } = require('../../models');
const stylesPath = "../../../public/css/style.css"

const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
const audioDbOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3717db3bafmsh3630d39920bf588p1025c6jsnd065f1276f3c',
		'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
	}
};

router.get('/artist-search', async (req, res) => {

  const artistName = req.query.artistName;

  
  if (!artistName || artistName.trim() === '') {
   res.status(400).render('homepage', {stylesPath: stylesPath, message: 'Please enter a valid artist name.' });
  }

  try{
  const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${req.query.artistName}`, audioDbOptions)
  const albums = await searchResult.json()
  
  res.render('results', {stylesPath: stylesPath, albums: albums.album});
} catch (error) {
  res.status(500).render('homepage', {stylesPath: stylesPath, message: 'Error occured while fetching data.' });
}
  
});

router.get('/album/:id', async (req, res) => {
  try {
    
    const response = await fetch(`${audioDbRootUrl}/album.php?m=${req.params.id}`, audioDbOptions)
    const album = await response.json()
    const reviews = await Review.findAll({
      where: {
        album_id: req.params.id
      }
    });
    console.log(reviews)
    res.render('review', {stylesPath: stylesPath, album: album.album, reviews: reviews, logged_in: req.session.logged_in})
  } catch (error) {
    res.error()
  }
})



// View Reviews
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
