const express = require('express');
const router = express.Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth')
const stylesPath = "../../../public/css/style.css"
const { getAlbumsByArtist, getAlbumById } = require('../audioDB.js')

router.get('/artist-search', async (req, res) => {

  const artistName = req.query.artistName;


  if (!artistName || artistName.trim() === '') {
    res.status(400).render('homepage', { stylesPath: stylesPath, message: 'Please enter a valid artist name.', logged_in: req.session.logged_in });
  }

  try {

    const albums = await getAlbumsByArtist(req.query.artistName)
    res.render('results', { stylesPath: stylesPath, albums: albums.album, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).render('homepage', { stylesPath: stylesPath, message: 'Error occured while fetching data.', logged_in: req.session.logged_in });
  }

});

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
    res.render('review', { stylesPath: stylesPath, album: album.album, reviews: reviews, logged_in: req.session.logged_in })
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


router.put('/update', withAuth, async (req, res) => {
  try {
    const updateReview = await Review.findByPk(req.body.id)
    updateReview.date = new Date()
    updateReview.title = req.body.title
    updateReview.content = req.body.content
    await updateReview.save();
    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
})


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
