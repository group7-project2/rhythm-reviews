const express = require('express');
const router = express.Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth')
const stylesPath = "../../../public/css/style.css"
const { getAlbumsByArtist, getAlbumById } = require('../audioDB.js')
// const getAlbumById = require('../audioDB.js')

// const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
// const audioDbOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3717db3bafmsh3630d39920bf588p1025c6jsnd065f1276f3c',
// 		'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
// 	}
// };

router.get('/artist-search', async (req, res) => {

  const artistName = req.query.artistName;

  
  if (!artistName || artistName.trim() === '') {
   res.status(400).render('homepage', {stylesPath: stylesPath, message: 'Please enter a valid artist name.', logged_in: req.session.logged_in });
  }

  try{
  // const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${req.query.artistName}`, audioDbOptions)
  // const albums = await searchResult.json()
  const albums = await getAlbumsByArtist (req.query.artistName)
  res.render('results', {stylesPath: stylesPath, albums: albums.album, logged_in: req.session.logged_in});
} catch (error) {
  res.status(500).render('homepage', {stylesPath: stylesPath, message: 'Error occured while fetching data.', logged_in: req.session.logged_in });
}
  
});

router.get('/album/:id', async (req, res) => {
  try {
    
    // const response = await fetch(`${audioDbRootUrl}/album.php?m=${req.params.id}`, audioDbOptions)
    // const album = await response.json()
    const album = await getAlbumById (req.params.id)
    const reviews = await Review.findAll({
      where: {
        album_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.render('review', {stylesPath: stylesPath, album: album.album, reviews: reviews, logged_in: req.session.logged_in})
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


router.post('/create', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      album_id: req.body.album_id
    })
    res.redirect(`/api/reviews/album/${req.body.album_id}`);
  } catch (error) {
    res.status(500).send(error)
  }
});

// Delete Review route
// router.delete('/user/review/:id', async (req, res) => {
//   try {
//     const reviewId = req.params.id;

//     const review = await Review.findByPk(reviewId);

//     if (!review) {
//       res.status(404).json({ error: 'Review not found' });
//       return;
//     }

//     await review.destroy();

//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewId = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewId) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(reviewId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
