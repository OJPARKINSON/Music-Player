import styled from 'styled-components';


const TrackList = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;
const TrackListItem = styled.li`
    list-style: none;
`
const TrackImage = styled.img`
    width: 75%;
`;

export const MusicContainer = ({ type, songs }) => {
    console.log({songs})
    return (
        <>
            <h1>{type}</h1>
            <TrackList>
                {songs && songs.tracks.map(track => <Track track={track}/>)}
            </TrackList>
        </>
    );
};

const Track = ({track}) => (
    <TrackListItem>
        <TrackImage src={track.album_url} />
        <p>{track.track_name}</p>
    </TrackListItem>
);