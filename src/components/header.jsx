import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const Nav = styled.nav`
    margin: 0;  
    z-index: 10;
    color: white;
    list-style: none;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    color: white ;
    display: grid;
    display: -ms-grid;
    grid-template-columns: repeat(8, auto);
    -ms-grid-template-columns: repeat(8, auto);
    align-items: center;
    width: 100vw;
    transition: 0.8s cubic-bezier(0.02, 0.8, 0.2, 1);
    justify-items: center;
    background: rgba(8, 9, 11, 0.8);
    height: 8vh;
`

const Navlink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.25vw;
`;


export const Header = () => (
    <Nav>
        <Navlink to="/">Music Player</Navlink>
        <Navlink style={{"grid-column-start": "6"}} to="/Albums">Albums</Navlink>
        <Navlink to="/Songs">Songs</Navlink>
        <Navlink to="/Playlists">Playlists</Navlink>
    </Nav>
);