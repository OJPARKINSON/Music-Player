const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const routes = require('./routes/index')

const store = new MongoDBStore({
  uri: 'mongodb://mongo/music-player',
  collection: "sessions"
}).on("error", (error) => console.log(error));
  
mongoose.connect('mongodb://mongo/music-player', {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
const app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(cors())
    .use(session({
        secret: "Secret",
        resave: false,
        saveUninitialized: true,
        store
    }));

routes(app);

app.use(express.static('build'));
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: `/app/build/` });
});

app.listen(port, () => console.log('App listening on port ' + port));