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



const Track = ({track, type}) => (
    <TrackListItem key={track.track_id}>
        <Link to={type !== "Albums" ? `/Song/${track.track_id}` : `/Album/${track.album_id}`}>
            <TrackImage src={track.album_url} />
            <p>{track.track_name} {type !== "Albums" && `- ${track.artist_name}`}</p>
        </Link>
    </TrackListItem>
);

export const MusicContainer = ({ type, songs, filteredTracks, setFilteredTracks}) => {
    useEffect(() => {
        if (type === 'Albums') {
            setFilteredTracks(
                songs.reduce((acc, current) => {
                    !acc.find(({ album_id }) => album_id === current.album_id) && acc.push(current);
                    return acc
                }, [])
            )
        }
    },[]);

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
                {filteredTracks.map(track => <Track type={type} track={track}/>)}
            </TrackList>
        </>
    );
};