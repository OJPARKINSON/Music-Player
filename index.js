const express = require('express');
var cors = require('cors')

const port = process.env.PORT || 5000;
const app = express();
const tracks = require('./fixtures/tracks')

app.use(cors())

app.post('/tracks', (req, res) => {
    res.send(tracks);
})

app.use(express.static('build'));
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: `build/` });
});

app.listen(port, () => console.log('App listening on port ' + port));