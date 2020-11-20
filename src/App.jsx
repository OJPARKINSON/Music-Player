import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from 'axios'
import './App.css';

import { Header } from './components/header';
import { MusicControls } from './components/MusicControls';
import { CollectionContainer } from './pages/CollectionContainer';
import { MusicList } from './pages/MusicList';
import { Playlists, CreatePlaylist, PlaylistDisplay } from './pages/Playlists';
import { Home } from './pages/home';


export const App = () => {
  const [tracks, setTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [playback, setPlayback] = useState({ playingList: [], playing: false, currentSong: 0});
  useEffect(() => {
    Axios({
      url: 'http://localhost:5000/tracks', 
      method: 'get',
      responseType: "json"
    })
    .then(({data}) => {setTracks(data?.tracks); setFilteredTracks(data?.tracks);})
    .catch(error => console.log(error))
  }, []);

  return (
    <Router>
      <div>
        <MusicControls playback={playback} setPlayback={setPlayback} />
        <Header />
        <Switch>
        <Route path="/playlist/new">
            <CreatePlaylist songs={tracks}  />
          </Route>
          <Route path="/Playlists">
            <Playlists />
          </Route>
          <Route path="/Album/:id">
            <CollectionContainer type="Album" songs={tracks}  setPlayback={setPlayback} />
          </Route>
          <Route path="/Song/:id">
            <CollectionContainer type="Song" songs={tracks} setPlayback={setPlayback} />
          </Route>
          <Route path="/Playlist/:id" >
            <PlaylistDisplay type="Playlist" songs={tracks} playback={playback} setPlayback={setPlayback}/>
          </Route>
          <Route path="/Albums">
            <MusicList 
              type="Albums" 
              playback={playback} 
              setPlayback={setPlayback} 
              songs={tracks} 
              filteredTracks={filteredTracks} 
              setFilteredTracks={setFilteredTracks}
            />
          </Route>
          <Route path="/Songs">
            <MusicList 
              type="Songs" 
              playback={playback} 
              setPlayback={setPlayback} 
              songs={tracks} 
              filteredTracks={filteredTracks} 
              setFilteredTracks={setFilteredTracks} 
            />
          </Route>
          <Route path="/">
            <Home playback={playback} setPlayback={setPlayback} songs={tracks} />
          </Route>
        </Switch>
      </div>
  </Router>
  )
};