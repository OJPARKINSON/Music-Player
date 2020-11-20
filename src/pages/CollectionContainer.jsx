import { useParams } from "react-router-dom";
import styled from 'styled-components';

const TrackContainer = styled.div`
    display: grid;
    margin: 1vw auto 5vw auto;
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

const Song = styled.p`
    text-align: center;
  
`

const AlbumList = ({songs, song, type, id}) => (
    <>
        {songs.filter(({ album_id, track_id }) => 
            album_id === song.album_id && track_id !== song.track_id
        ).map(({track_name, artist_name}) => 
            <Song key={track_name}>{track_name} - {artist_name}</Song>
        )}
    </>
);

export const CollectionContainer = ({ type, songs, setPlayback }) => {
    const { id } = useParams()
    const song = songs?.find((track) => track.track_id === id || track.album_id === id);
    const album = type === "Album";
    return song ? (
        <TrackContainer>
        <TrackImage 
            onClick={() => setPlayback({ playingList: album ? songs.filter(({ album_id }) => album_id === song?.album_id) : [song], playing: true, currentSong: 0})} 
            src={song.album_url} 
        />
            <Tracktext>{song.track_name} {album && `- ${song.artist_name}`}</Tracktext>
            {album && <AlbumList songs={songs} song={song} type={type} id={id} />}
        </TrackContainer>
        
    ) : <h1>Loading</h1>
};