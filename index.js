require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

const db = require('./database');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
