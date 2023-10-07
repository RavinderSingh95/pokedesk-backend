const Pokemon = require('../models/pokemon');


function extractTypes(pokemonData) {
  if (!pokemonData.types || pokemonData.types.length === 0) {
      return [];
  }

  const extractedTypes = pokemonData.types.map(typeInfo => {
      const id = typeInfo.type.url.match(/\/(\d+)\//)[1];
      return { id, name: typeInfo.type.name };
  });

  return extractedTypes;
}


async function fetchPokemonById(pokemonId) {
    try {
      const pokemon = await Pokemon.findOne({ pokemon_id: pokemonId });
      
      if (pokemon) {
        return pokemon;
      }

      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const pokemonData = await response.json();

      const newPokemon = new Pokemon({
        pokemon_id: pokemonId,
        name: pokemonData.name,
        types: extractTypes(pokemonData),
        height: pokemonData.height,
        weight: pokemonData.weight,
        base_experience: pokemonData.base_experience,
        quantity: Math.floor(Math.random() * 5) + 1
      });
      await newPokemon.save();
  
      return newPokemon;

    } catch (error) {
      console.error(`Error fetching Pokémon with ID ${pokemonId}:`, error);
      throw error;
    }
}


module.exports = fetchPokemonById