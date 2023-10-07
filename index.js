const express = require('express');
const app = express();
const routes = require('./routes/pokemonRoutes');

const db = require('./database');

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});

