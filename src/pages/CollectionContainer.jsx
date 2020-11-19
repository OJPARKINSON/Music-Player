import { useParams } from "react-router-dom";
import styled from 'styled-components';

const TrackContainer = styled.div`
    display: grid;
`;

const TrackImage = styled.img`
    width: 25%;
    margin: 2vw auto;
    :hover {
        cursor: pointer;    
    }
`;

const Tracktext = styled.h3`
    text-align: center;
    margin: 2vw auto;
`;

const Songlist = ({songs, song, type, id}) => (
    <>
        {type === "Song" && <p>{song.track_name} - {song.artist_name}</p> }
        {songs.filter(({ album_id, track_id }) => album_id === song.album_id && track_id !== song.track_id).map(({track_name, artist_name}) => <p key={track_name}>{track_name} - {artist_name}</p>)}
    </>
);

export const CollectionContainer = ({ type, songs, setPlayback }) => {
    const { id } = useParams()
    const song = songs?.find((track) => track.track_id === id || track.album_id === id) 
    return song ? (
        <TrackContainer>
        <TrackImage 
            onClick={() => setPlayback({ playingList: type === "Album" ? songs.filter(({ album_id }) => album_id === song?.album_id) : [song], playing: true, currentSong: 0})} 
            src={song.album_url} 
        />
            <Tracktext>{song.track_name} {type === "Album" && `- ${song.artist_name}`}</Tracktext>
            <Songlist songs={songs} song={song} type={type} id={id} />
        </TrackContainer>
        
    ) : <h1>Loading</h1>
};