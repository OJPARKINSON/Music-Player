import { useParams } from "react-router-dom";
import styled from 'styled-components';

const TrackContainer = styled.div`

    display: grid;
`;

const TrackImage = styled.img`
    width: 25%;
    margin: 2vw auto;
`;

const Tracktext = styled.h3`
    text-align: center;
    margin: 2vw auto;
`;

const Songlist = ({songs, song, type, id}) => 
    (
        <>
            {type === "Song" && <p>{song.track_name} - {song.artist_name}</p> }
            {songs.filter(({ album_id }) => album_id === id).map(({track_name, artist_name}) => <p>{track_name} - {artist_name}</p>)}
        </>
    );

export const CollectionContainer = ({ type, songs, setMusic }) => {
    const { id } = useParams()
    const song = songs?.find((track) => track.track_id === id || track.album_id === id) 
    
    return song ? (
        <TrackContainer>
                    <TrackImage 
            onClick={() => setMusic({ playingList: type === "Album" ? songs.filter(({ album_id }) => album_id === song?.album_id) : [song], playing: true, currentSong: 0})} 
            src={song.album_url} 
        />
            <Tracktext>{song.track_name} {type === "Album" && `- ${song.artist_name}`}</Tracktext>
            <Songlist songs={songs} song={song} type={type} id={id} />
        </TrackContainer>
        
    ) : <h1>Loading</h1>
};