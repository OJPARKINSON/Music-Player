import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from "react-router-dom";
import Axios from 'axios';

const TrackList = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 3vw;
    width: 95%;
    padding: 0;
    margin: 1vw auto 5vw auto;
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }
    p {
        margin: 0 auto;
        text-align: center;
        text-decoration: none;
    }
`;

const TrackListItem = styled.li`
    list-style: none;
`
const TrackImage = styled.img`
    width: 100%;
    margin: 0 auto;
`;


export const Playlists = () => {
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        Axios({
        url: '/playlists', 
        method: 'get',
        responseType: "json"
        })
        .then(({data}) => {console.log({data}); setPlaylists(data)})
        .catch(error => console.log(error))
    }, []);

    return (
        <>
            {playlists !== null ? 
                playlists.map(track => <p>{track.name}</p>) 
                : 
                <Link to="/Playlist/new">Make a new Playlist</Link>
            }
        </>
    )
}

const Track = ({track, songsInPlaylists, setSongsInPlaylists}) => {
    return (
        <TrackListItem key={track.track_id}>
            <TrackImage
                src={track.album_url} 
            />
            <p>{track.track_name} - {track.artist_name}</p>
            {!songsInPlaylists?.find(({ track_id }) => track_id === track.track_id) ?
            <button 
                onClick={() => setSongsInPlaylists([...songsInPlaylists, track])}
            >+</button>
            :
            <button 
                onClick={() => setSongsInPlaylists(songsInPlaylists.reduce((acc, current) => {
                        current.track_id !== track.track_id && acc.push(current)
                        return acc
                    }, [])
                )}
            >-</button>
            }
        </TrackListItem>
    );
};


export const PlaylistDisplay  = ({songs}) => {
    const [songsInPlaylists, setSongsInPlaylists] = useState([]);
    const { id } = useParams()
    return (
        <>
            <TrackList>
                {songsInPlaylists === [] ? 
                    <h2>Add songs to get started</h2> 
                    : 
                    songsInPlaylists.map(track => <Track setSongsInPlaylists={setSongsInPlaylists} songsInPlaylists={songsInPlaylists}  track={track}/>)
                }
            </TrackList>
            <TrackList>
                {songs.map(track => <Track songsInPlaylists={songsInPlaylists} setSongsInPlaylists={setSongsInPlaylists} track={track}/>)}
            </TrackList>

        </>
    )
}

export const CreatePlaylist = ({songs}) => {
    return (
        <>
            <form action="http://localhost:5000/playlist/new"  method="post">
                <label for="name">Playlist name:</label>
                <input type="text" id="name" name="name" required/>
                <label for="description">Playlist name:</label>
                <input type="text" id="description" name="description" required/>
                <input value="Create Playlist" type="submit"/>
            </form>
        </>
    )
}