import { Link } from "react-router-dom";

export const Header = () => (
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Albums">Albums</Link>
      </li>
      <li>
        <Link to="/Songs">Songs</Link>
      </li>
      <li>
        <Link to="/Playlists">Playlists</Link>
      </li>
    </ul>
  </nav>
);