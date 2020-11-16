import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import { Header } from './components/header';
import { CollectionContainer } from './pages/CollectionContainer';
import { MusicContainer } from './pages/MusicContainer';
import { Home } from './pages/home';

export const App = () => (
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
        <MusicContainer type="Albums" />
      </Route>
      <Route path="/Songs">
        <MusicContainer type="Songs" />
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
);