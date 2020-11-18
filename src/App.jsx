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
import { MusicContainer } from './pages/MusicContainer';
import { Home } from './pages/home';


export const App = () => {
  const [tracks, setTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [music, setMusic] = useState({ playingList: [], playing: false, currentSong: 0});
  useEffect(() => {
    Axios({
      url: 'http://localhost:5000/tracks', 
      method: 'post',
      responseType: "json"
    })
    .then(({data}) => {setTracks(data?.tracks); setFilteredTracks(data?.tracks);})
    .catch(error => console.log(error))
  }, []);

  return (
    <Router>
      <div>
        <MusicControls music={music} setMusic={setMusic} />
        <Header />
        <Switch>
          <Route path="/Album/:id">
            <CollectionContainer type="Album" songs={tracks}  setMusic={setMusic} />
          </Route>
          <Route path="/Song/:id">
            <CollectionContainer type="Song" songs={tracks} setMusic={setMusic} />
          </Route>
          <Route path="/playlist/:id" >
            <CollectionContainer type="playlist" />
          </Route>
          <Route path="/Albums">
            <MusicContainer type="Albums" setMusic={setMusic} songs={tracks} filteredTracks={filteredTracks} setFilteredTracks={setFilteredTracks}/>
          </Route>
          <Route path="/Songs">
            <MusicContainer type="Songs" setMusic={setMusic} songs={tracks} filteredTracks={filteredTracks} setFilteredTracks={setFilteredTracks} />
          </Route>
          <Route path="/Playlists">
            <MusicContainer type="Playlists" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
  </Router>
  )
};