const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the favorites data file
const favoriteCitiesFile = path.join(__dirname, '../favoriteCities.json');

// Middleware to ensure user is logged in (optional, if you have an auth system)
const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'Please log in to save favorites.' });
  }
};

// GET: Retrieve the favorite cities of the logged-in user
router.get('/', checkAuth, (req, res) => {
  const userId = req.session.user.id; // Assuming user ID is stored in session
  fs.readFile(favoriteCitiesFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read favorite cities.' });
    }
    const favorites = JSON.parse(data);
    const userFavorites = favorites[userId] || [];
    res.json(userFavorites);
  });
});

// POST: Add a city to the favorite list
router.post('/add', checkAuth, (req, res) => {
  const userId = req.session.user.id;
  const city = req.body.city;

  fs.readFile(favoriteCitiesFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read favorite cities.' });
    }
    const favorites = JSON.parse(data);
    if (!favorites[userId]) {
      favorites[userId] = [];
    }

    if (!favorites[userId].includes(city)) {
      favorites[userId].push(city);
    }

    fs.writeFile(favoriteCitiesFile, JSON.stringify(favorites, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save favorite city.' });
      }
      res.json({ message: `${city} added to your favorites.` });
    });
  });
});

// DELETE: Remove a city from the favorite list
router.post('/remove', checkAuth, (req, res) => {
  const userId = req.session.user.id;
  const city = req.body.city;

  fs.readFile(favoriteCitiesFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read favorite cities.' });
    }
    const favorites = JSON.parse(data);
    if (favorites[userId]) {
      favorites[userId] = favorites[userId].filter(favCity => favCity !== city);

      fs.writeFile(favoriteCitiesFile, JSON.stringify(favorites, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to remove favorite city.' });
        }
        res.json({ message: `${city} removed from your favorites.` });
      });
    } else {
      res.status(400).json({ message: `${city} not found in your favorites.` });
    }
  });
});

module.exports = router;
