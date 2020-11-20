import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import styled from 'styled-components';
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

const SongList = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 3vw;
    height: 25vw;
    overflow: scroll;
    padding: 2vw;
    margin: 1vw auto 5vw auto;
    color: white;
    background-color: black;
    width: 90%;
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
    button {
        float: right;
        margin: .5vw;
    }
`
const TrackImage = styled.img`
    width: 100%;
    margin: 0 auto;
`;
const PlaylistList = styled.ul`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 2vw;
    margin: 1vw auto;
`;

const PlaylistItem = styled.li`
    border-radius: 10%;
    border: 1px solid black;
    padding: 1vw;
    list-style: none;
    text-align: center;
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }
`;

const StyledForm = styled.form`
    display: block;
    margin: 0 auto;
    max-width: 15vw;
`;

const StyledInput = styled.input`
    width: 100%;
    margin: .5vw !important;
`;



export const Playlists = () => {
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        Axios({
        url: '/getPlaylists', 
        method: 'get',
        responseType: "json"
        })
        .then(({data}) => {setPlaylists(data)})
        .catch(error => console.log(error))
    }, []);
    return (
        <>
            <PlaylistList>
                {playlists !== null && playlists.map(playlist => (
                    <PlaylistItem>
                        <Link to={`/Playlist/${playlist.id}`}>
                            <h3>{playlist.name}</h3>
                            <p>{playlist.description}</p>
                        </Link>
                    </PlaylistItem>
                ))}
                <PlaylistItem style={{display: "grid"}}>
                    <Link to="/Playlist/new" style={{alignSelf: "center"}}>
                        Make a new Playlist
                    </Link>
                </PlaylistItem>
            </PlaylistList>
        </>
    )
}

const Track = ({track, songsInPlaylists, setSongsInPlaylists, id}) => {
    const handleClick = (track, setSongsInPlaylists, operation) => {
        Axios({
        url: '/editPlaylist', 
        method: 'post',
        data: { track, operation, id },
        responseType: "json"
        })
        .then(({data}) => {setSongsInPlaylists(data)})
        .catch(error => console.log(error))
    };

    return (
        <TrackListItem key={track.track_id}>
            <TrackImage
                src={track.album_url} 
            />
            <p>{track.track_name} - {track.artist_name}</p>
            {!songsInPlaylists?.songs?.find(({ track_id }) => track_id === track.track_id) ?
            <button 
                onClick={() => handleClick(track, setSongsInPlaylists, 'add')} >+</button>
            :
            <button 
                onClick={() => handleClick(track, setSongsInPlaylists, 'remove')}>-</button>
            }
        </TrackListItem>
    );
};

const PlaylistHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 70%;
    width: 90%;
    margin: 1vw auto;
    align-items: center;
    div p, div h1 {
        margin: .8vw auto;
    }
    button {
        width: 30%;
        margin: 0 auto;
        font-size: 5vw;
    }
`;

export const PlaylistDisplay  = ({songs, playback, setPlayback}) => {
    const [songsInPlaylists, setSongsInPlaylists] = useState(null);
    const { id } = useParams()
    useEffect(() => {
        Axios({
        url: '/getPlaylist', 
        method: 'post',
        data: { id },
        responseType: "json"
        })
        .then(({data}) => {setSongsInPlaylists(data)})
        .catch(error => console.log(error))
    }, []);

    return songsInPlaylists !== null ? (
        <>
            <PlaylistHeader >
                <div>
                    <h1>{songsInPlaylists.name || 'Error'}</h1>
                    <p>{songsInPlaylists.description || 'Error'}</p>
                </div>
                <IconButton onClick={() => setPlayback({...playback, playing: true, playingList: songsInPlaylists.songs})}>
                        <PlayArrowIcon style={{ fontSize: 50 }} /> 
                </IconButton>
            </PlaylistHeader>
            <TrackList>
                {songsInPlaylists.songs !== [] ? 
                    songsInPlaylists.songs?.map(track => 
                        <Track id={id} setSongsInPlaylists={setSongsInPlaylists} songsInPlaylists={songsInPlaylists}  track={track}/>)
                    :
                    <h3>There are no songs in your playlist</h3>
                }
            </TrackList>
            <h3 style={{width: "90%", margin: "0 auto"}}>Add songs to your playlist:</h3>
            <SongList>
                {songs.map(track => <Track id={id} songsInPlaylists={songsInPlaylists} setSongsInPlaylists={setSongsInPlaylists} track={track}/>)}
            </SongList>

        </>
    ) : (
        <>
            <h1>This playlist doesn't exist</h1>
            <Link to="/Playlists">Click here for all playlists</Link>
        </>
    )
}

export const CreatePlaylist = ({songs}) => {
    return (
        <>
            <StyledForm action="/createPlaylist"  method="post">
                <h1>Create your playlist</h1>
                <label for="name">Playlist name:</label>
                <StyledInput type="text" id="name" name="name" required/>
                <label for="description">Playlist name:</label>
                <StyledInput type="text" id="description" name="description" required/>
                <StyledInput value="Create Playlist" type="submit"/>
            </StyledForm>
        </>
    )
}