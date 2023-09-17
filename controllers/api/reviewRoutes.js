const express = require('express');
const router = express.Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth')
const stylesPath = "../../../public/css/style.css"
const { getAlbumsByArtist, getAlbumById } = require('../audioDB.js')

//Api Artist search
router.get('/artist-search', async (req, res) => {
  const artistName = req.query.artistName;

  if (!artistName || artistName.trim() === '') {
    return res.status(400).render('homepage', { stylesPath: stylesPath, message: 'Please enter a valid artist name.', logged_in: req.session.logged_in });
  }
  try {
    const albums = await getAlbumsByArtist(req.query.artistName)
    return res.render('results', { stylesPath: stylesPath, albums: albums.album, logged_in: req.session.logged_in });
  } catch (error) {
    return res.status(500).render('homepage', { stylesPath: stylesPath, message: 'Error occured while fetching data.', logged_in: req.session.logged_in });
  }
});

//Api Single album and display reviews
router.get('/album/:id', async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id)
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
    return res.render('review', { stylesPath: stylesPath, album: album.album, reviews: reviews, logged_in: req.session.logged_in })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

//Create New review
router.post('/create', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      album_id: req.body.album_id
    })
    return res.redirect(`/api/reviews/album/${req.body.album_id}`);
  } catch (error) {
    return res.status(500).send(error)
  }
});

//Update review
router.put('/update', withAuth, async (req, res) => {
  try {
    if (!req.body.id || !req.body.title || !req.body.content) {
      return res.status(400).send("Missing required field in request")
    }
    const updateReview = await Review.findByPk(req.body.id)
    if (!updateReview) {
      return res.status(400).send("Invalid review id")
    } else {
      updateReview.date = new Date()
      updateReview.title = req.body.title
      updateReview.content = req.body.content
      await updateReview.save();
      return res.status(200).send()
    }
  } catch (error) {
    return res.status(500).send(error)
  }
})

//Delete review
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewId = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!reviewId) {
      return res.status(404).json({ message: 'No Review found with this id!' });
    }
    return res.status(200).json(reviewId);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;