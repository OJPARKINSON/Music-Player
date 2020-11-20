var uuid = require('uuid');
const { tracks } = require('../fixtures/tracks');
const { PlaylistModel, SongModel } = require('../models/index');

const routes = (app) => {
    app.get('/tracks', async (req, res) => {
        await SongModel.find({}, (err, track) => {
            if (err) {
                return res.send(null);
            }
            return res.send(tracks);
        })
    });

    app.get('/getPlaylists', async (req, res) => {
        const user_id = req.session.user_id;
        await PlaylistModel.find({ user_id }, (err, playlists) => {
            if (err) {
                return res.send(null);
            }
            return res.send(playlists?.filter(({_id}) => _id === '5fb77defdc508d001246760d'));
        })
    });

    app.post('/getPlaylist', async (req, res) => {
        if (req.session.user_id) {
            const user_id = req.session.user_id;
            const id = req.body.id;
            await PlaylistModel.findOne({ id, user_id }, (err, playlist) => {
                if (err) {
                    return res.send(null);
                }
                return res.send(playlist);
            })
        } else {   
            return res.send(null);
        }
    });

    app.post('/createPlaylist', (req, res) => {
        const { name, description } = req.body;
        const id = uuid.v4();
        const user_id = uuid.v4()

        if (!req.session.user_id) {
            req.session.user_id = user_id;
        }
        new PlaylistModel({ user_id, id, name, description, songs: []}).save();
        return res.redirect(`/Playlist/${id}`);
    });

    app.post('/editPlaylist', async (req, res) => {
        const { track, operation, id } = req.body;
        if (req.session.user_id) {
            const user_id = req.session.user_id;
            await PlaylistModel.findOne({ id, user_id }, async (err, playlist) => {
                if (err) {
                    return res.send(null);
                }
                if (operation === 'add') {
                    playlist.songs.push(track);
                    await PlaylistModel.findOneAndUpdate({id, user_id}, playlist, (err, newPlaylist) => {
                        if (err) {
                            console.log({err});
                            return res.send(500);
                        }
                    });
                } 
                if (operation === 'remove') {
                    playlist.songs = playlist.songs.reduce((acc, current) => {
                        current.track_id !== track.track_id && acc.push(current); 
                        return acc
                    },[]);
                    await PlaylistModel.findOneAndUpdate({id, user_id}, playlist, (err, newPlaylist) => {
                        if (err) {
                            console.log({err});
                            return res.send(500);
                        }
                    });
                }
            });
            await PlaylistModel.findOne({ user_id, id }, (err, playlists) => {
                if (err) {
                    console.log({err});
                    return res.send(null);
                }
                return res.send(playlists);
            })
        } else {
            return res.status(500);
        }
    });
}

module.exports = routes;