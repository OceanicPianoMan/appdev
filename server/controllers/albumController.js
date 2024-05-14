const Album = require('../models/albumModel');

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({});
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const rateAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    album.ratings.push(rating);
    await album.save();

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error rating album:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addReview = async (req, res) => {
  try {
    const albumId = req.params.id;
    const { review } = req.body;

    console.log('Adding review:', review);

    if (!review) {
      return res.status(400).json({ error: 'Review text is required' });
    }

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    album.reviews.push(review);
    await album.save();

    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllAlbums,
  rateAlbum,
  addReview
};
