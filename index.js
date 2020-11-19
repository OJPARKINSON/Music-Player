const express = require('express');
var uuid = require('uuid');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

// const store = new MongoDBStore({
//   uri: 'mongodb://mongo/passport-jwt',
//   collection: "sessions"
// }).on("error", (error) => console.log(error));

const port = process.env.PORT || 5000;
const app = express();
const tracks = require('./fixtures/tracks')

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(cors())
    .use(session({
        secret: "Secret",
        resave: false,
        saveUninitialized: true,
    }));

app.get('/tracks', (req, res) => {
    console.log(req.session)
    res.send(tracks);
});

app.get('/Playlists', (req, res) => {
    console.log(req.session)
    if (req.session.playlists) {
        return res.send(req.session.playlists);
    } else {
        return res.send(null);
    }
});

app.post('/playlist/new', (req, res) => {
    console.log(req.body)
    const { name, description } = req?.body;
    const id = uuid.v4()
    if (req.session.playlists) {
        req.session.playlists = [
            ...req.session.playlists,
            { id, name, description, songs: null}
        ];
    } else {
        req.session.playlists = [
            { id, name, description, songs: null}
        ];
    }
    console.log(req.session)
    res.redirect(`http://localhost:3000/Playlist/${id}`);
});

app.use(express.static('build'));
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: `build/` });
});

app.listen(port, () => console.log('App listening on port ' + port));