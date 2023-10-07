const mongoose = require('mongoose');


const typeSchema = new mongoose.Schema({
    id: String,
    name: String
});

const pokemonSchema = new mongoose.Schema({
    pokemon_id: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    name: String,
    types: [typeSchema],
    height: String,
    weight: String,
    base_experience: String,
    quantity: {
        type: Number,
        default: 5
    }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
