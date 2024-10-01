const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the favorites JSON file
const favoritesFilePath = path.join(__dirname, '../favoriteCities.json'); // Adjust if needed

// Save to Favorites Route
router.post('/save-favorite', (req, res) => {
    const { cityName, temperature, weatherDescription } = req.body;

    // Read existing favorites
    fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading favorites file');
        }

        let favorites = [];
        if (data) {
            favorites = JSON.parse(data);  // Parse existing data
        }

        // Add the new favorite
        const newFavorite = {
            city: cityName,
            temp: temperature,
            weather: weatherDescription
        };

        favorites.push(newFavorite);  // Add new favorite to array

        // Write updated favorites back to the file
        fs.writeFile(favoritesFilePath, JSON.stringify(favorites, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving favorite');
            }
            res.status(200).send('Favorite saved successfully');
        });
    });
});

// Remove from Favorites Route
router.post('/remove-favorite', (req, res) => {
    const { cityName } = req.body;

    // Read existing favorites
    fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading favorites file');
        }

        let favorites = [];
        if (data) {
            favorites = JSON.parse(data);  // Parse existing data
        }

        // Filter out the favorite to be removed
        favorites = favorites.filter(favorite => favorite.city !== cityName);

        // Write updated favorites back to the file
        fs.writeFile(favoritesFilePath, JSON.stringify(favorites, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error removing favorite');
            }
            res.status(200).send('Favorite removed successfully');
        });
    });
});

module.exports = router;
