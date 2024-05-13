const express = require('express');
const router = express.Router();

const {
  getAllAlbums,
  rateAlbum
} = require('../controllers/albumController');

// GET all albums
router.get('/', getAllAlbums);

// POST a rating to an album
router.post('/:id/rate', rateAlbum);

module.exports = router;
