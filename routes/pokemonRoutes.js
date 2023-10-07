const express = require('express');
const router = express.Router();
const fetchPokemonById = require('../controllers/pokemonController.js');


router.get('/api/pokemon/:id', async (req, res) => {
    try {
        const pokemonId = req.params.id;
        const pokemonData = await fetchPokemonById(pokemonId);
        res.json(pokemonData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = router;
