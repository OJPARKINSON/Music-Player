import styled from 'styled-components';
import { useEffect } from 'react'
import { Link } from "react-router-dom";

const TrackList = styled.ul`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 3vw;
    width: 95%;
    padding: 0;
    margin: 0 auto;
    a {
        text-decoration: none;
        color: black;
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

const Track = ({track, type, songs, setMusic}) => (
    <TrackListItem key={track.track_id}>
        <TrackImage 
            onClick={() => setMusic({ playingList: type === "Albums" ? songs.filter(({ album_id }) => album_id === track?.album_id) : [track], playing: true, currentSong: 0})} 
            src={track.album_url} 
        />
        <Link to={type !== "Albums" ? `/Song/${track.track_id}` : `/Album/${track.album_id}`}>
            <p>{track.track_name} {type !== "Albums" && `- ${track.artist_name}`}</p>
        </Link>
    </TrackListItem>
);

export const MusicContainer = ({ type, songs, filteredTracks, setFilteredTracks, setMusic}) => {
    useEffect(() => {
        if (type === 'Albums') {
            setFilteredTracks(
                songs.reduce((acc, current) => {
                    !acc.find(({ album_id }) => album_id === current.album_id) && acc.push(current);
                    return acc
                }, [])
            )
        }
    },[songs]);

    const handleChange = ({target}) => {
        target.value !== "" ?
            setFilteredTracks(songs.filter(({ track_name }) => 
                track_name.toLowerCase().includes(target.value.toLowerCase())
            )) : setFilteredTracks(songs);
    }
    return (
        <>
            <h1>{type}</h1>
            <input type="text" className="input" onChange={handleChange} placeholder="Search..." />
            <TrackList>
                {filteredTracks.map(track => <Track setMusic={setMusic} songs={songs} type={type} track={track}/>)}
            </TrackList>
        </>
    );
};