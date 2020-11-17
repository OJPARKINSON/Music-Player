import { useParams } from "react-router-dom";
import styled from 'styled-components';

const TrackContainer = styled.div`
    background-color: grey;
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

export const CollectionContainer = ({ type, songs }) => {
    const { id } = useParams()
    const song = songs?.find((track) => track.track_id === id || track.album_id === id) 
    return song ? (
        <TrackContainer>
            <TrackImage src={song.album_url} />
            <Tracktext>{song.track_name} {type !== "Album" && `- ${song.artist_name}`}</Tracktext>
        </TrackContainer>
    ) : <h1>Error</h1>
};