const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get properties by location
router.get('/location/:city', async (req, res) => {
  try {
    const properties = await Property.find({ location: req.params.city });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get properties by price range
router.get('/price/:min/:max', async (req, res) => {
  try {
    const { min, max } = req.params;
    const properties = await Property.find({
      price: { $gte: min, $lte: max }
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get properties by location and price range
router.get('/filter', async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    const query = {};

    if (location) {
      query.location = location;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
