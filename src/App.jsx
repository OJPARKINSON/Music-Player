import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from 'axios'
import './App.css';

import { Header } from './components/header';
import { CollectionContainer } from './pages/CollectionContainer';
import { MusicContainer } from './pages/MusicContainer';
import { Home } from './pages/home';

export const App = () => {
  const [tracks, setTracks] = useState(false)
  Axios({
    url: '/tracks', 
    method: 'post',
    responseType: "json"
  })
  .then(({data}) => setTracks(data))
  .catch(error => console.log(error))
  return (
    <Router>
      <div>
      <Header />
      <Switch>
        <Route path="/Album/:id">
          <CollectionContainer type="Albums" />
        </Route>
        <Route path="/Song/:id">
          <CollectionContainer type="Songs" />
        </Route>
        <Route path="/playlist/:id" >
          <CollectionContainer type="playlist" />
        </Route>
        <Route path="/Albums">
          <MusicContainer type="Albums" songs={tracks} />
        </Route>
        <Route path="/Songs">
          <MusicContainer type="Songs" songs={tracks} />
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