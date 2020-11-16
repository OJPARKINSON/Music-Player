const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the music player');
})

app.listen(port, () => console.log('App listening on port ' + port));