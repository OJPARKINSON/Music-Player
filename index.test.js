const express = require('express');
const session = require('express-session');
const routes = require('./routes/index');
const request = require('supertest');
const mockingoose = require('mockingoose').default
const { PlaylistModel, SongModel } = require('./models/index');

const { SongFixture, PlaylistFixture } = require('./fixtures/tracks');

const app = express();

app.set(
  'sessionMiddleware',
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use((...args) => app.get('sessionMiddleware')(...args));

routes(app);

describe('/tracks', () => {
  it('Gets the tracks from MongoDB', done => {
    mockingoose(SongModel).toReturn(SongFixture, 'find');
    request(app)
      .get('/tracks')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('Returns empty with an MongoDB error', done => {
    mockingoose(SongModel).toReturn(new Error('My Error'), 'find');
    request(app)
      .get('/tracks')
      .set('Accept', 'application/json')
      .expect(200, {}, done);
  });
});

describe('/getPlaylists', () => {
  it('Without user_id it returns 500', done => {
    mockingoose(PlaylistModel).toReturn(new Error('My Error'), 'find');
    app.set('sessionMiddleware', (req, res, next) => {
      req.body = {
        id,
      };
      next();
    });
    request(app)
        .get('/getPlaylists')
        .set('Accept', 'application/json')
        .expect(500, done);
  });
  it('With user_id it returns the playlist name', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.session = {
        user_id: '123',
      };
      next();
    });
    mockingoose(PlaylistModel).toReturn([PlaylistFixture], 'findOne');
    request(app)
      .get('/getPlaylists')
      .set('Accept', 'application/json')
      .expect(200, done)
      .expect(function(res) {
        res.body.name = "testName";
      })
  });
});

describe('/getPlaylist', () => {
  it('Without user_id it returns 500', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.body = {
        id,
      };
      next();
    });
      request(app)
        .post('/getPlaylist')
        .set('Accept', 'application/json')
        .expect(500, done);
  });
  it('With user_id and session id it returns the playlist name', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.body = {
        id: '1234',
      };
      req.session = {
        user_id: '123',
      };
      next();
    });
    mockingoose(PlaylistModel).toReturn(PlaylistFixture, 'findOne');
    request(app)
      .post('/getPlaylist')
      .set('Accept', 'application/json')
      .expect(200, done)
      .expect(function(res) {
        res.body.name = "testName";
      })
  });
});

describe('/createPlaylist', () => {
  it('With user_id, session id, name and description it redirects the user', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.body = {
        description: '1234',
        name: '123',
      };
      req.session = {
        user_id: '123'
      }
      next();
    });
    request(app)
      .post('/createPlaylist')
      .set('Accept', 'application/json')
      .expect(302, done)
  });
});

describe('/editPlaylist', () => {
  it('Adds a song to a playlist', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.session = {
        user_id: '123'
      }
      req.body = { 
        track: SongFixture, 
        operation: 'add', 
        id: '1234'
      }
      next();
    });
    mockingoose(PlaylistModel).toReturn(PlaylistFixture, 'findOne');
    request(app)
      .post('/editPlaylist')
      .set('Accept', 'application/json')
      .expect(200, done)
      .expect(function(res) {
        res.body.name = "testName";
      })
  });

  it('Removes a song from a playlist', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.session = {
        user_id: '123'
      }
      req.body = { 
        track: SongFixture, 
        operation: 'remove', 
        id: '1234'
      }
      next();
    });
    mockingoose(PlaylistModel).toReturn(PlaylistFixture, 'findOne');
    request(app)
      .post('/editPlaylist')
      .set('Accept', 'application/json')
      .expect(200, done)
      .expect(function(res) {
        res.body.name = "testName";
        res.body.songs = []
      })
  });

  it('without the session id it errors the page', done => {
    app.set('sessionMiddleware', (req, res, next) => {
      req.session
      req.body = { 
        track, 
        operation, 
        id
      }
      next();
    });
    request(app)
      .post('/editPlaylist')
      .set('Accept', 'application/json')
      .expect(500, done)
  });
});