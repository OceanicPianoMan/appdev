const express = require('express');
const router = express.Router();

const {
  getAllAlbums,
  rateAlbum,
  addReview
} = require('../controllers/albumController');

// GET all albums
router.get('/', getAllAlbums);

// POST a rating to an album
router.post('/:id/rate', rateAlbum);

// POST a review to an album
router.post('/:id/review', addReview);

module.exports = router;
