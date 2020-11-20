const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    artist_name: String,
    album_url: String,
    album_id: String,
    track_name: String,
    track_id: String,
    preview_url: String
});

const PlaylistSchema = new Schema({
    id: String,
    user_id: String,
    name: String,
    description: String,
    songs: [SongSchema]
});
  
const PlaylistModel = mongoose.model('playlist', PlaylistSchema);
const SongModel = mongoose.model('song', SongSchema);

module.exports = { PlaylistModel, SongModel };