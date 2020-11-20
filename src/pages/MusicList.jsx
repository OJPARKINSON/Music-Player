import styled from 'styled-components';
import { Link } from "react-router-dom";
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { AlbumReduce } from '../components/utils'

const TrackListHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 70%;
    width: 85%;
    margin: 1vw auto;
    align-items: center;
    div {
        display: flex;
    }
    div input {
        height: 40%;
        align-self: center;
    }
`

export const TrackList = styled.ul`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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
    :hover {
        cursor: pointer;    
    }
`;

export const Track = ({track, album, songs, setPlayback}) => (
    <TrackListItem key={track.track_id}>
        <TrackImage 
            onClick={() => setPlayback({ playingList: album  ? songs.filter(({ album_id }) => album_id === track?.album_id) : [track], playing: true, currentSong: 0})} 
            src={track.album_url} 
        />
        <Link to={!album ? `/Song/${track.track_id}` : `/Album/${track.album_id}`}>
            <p>{track.track_name} {!album && `- ${track.artist_name}`}</p>
        </Link>
    </TrackListItem>
);

export const MusicList = ({ type, songs, filteredTracks, setFilteredTracks, playback, setPlayback}) => {
    const handleChange = ({target}) => {
        target.value !== "" ?
            setFilteredTracks(songs.filter(({ track_name }) => 
                track_name.toLowerCase().includes(target.value.toLowerCase())
            )) : setFilteredTracks(songs);
    }

    return (
        <>
            <TrackListHeader>
                <h1>{type}</h1>
                <div>
                    <IconButton onClick={() => setPlayback({...playback, playing: true, playingList: type === "Albums" ? AlbumReduce(filteredTracks) : filteredTracks})}>
                        <PlayArrowIcon style={{ fontSize: 50 }} /> 
                    </IconButton>
                    <input type="text" className="input" onChange={handleChange} placeholder="Search..." />
                </div>
            </TrackListHeader>
            <TrackList>
                {type === "Albums" ? 
                    AlbumReduce(filteredTracks)?.map(track => <Track setPlayback={setPlayback} songs={songs} album={type === "Albums"} track={track}/>)
                    :
                    filteredTracks?.map(track => <Track setPlayback={setPlayback} songs={songs} album={type === "Albums"} track={track}/>)
                }
            </TrackList>
        </>
    );
};