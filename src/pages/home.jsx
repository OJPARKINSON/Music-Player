import styled from 'styled-components';
import { Track, TrackList } from './MusicList';
import { Link } from "react-router-dom";
import { AlbumReduce } from '../components/utils';

const HomeContainer = styled.ul`
    h1, h2 {
        margin: 1vw 2vw;
        color: black;
    }
`;

export const Home = ({playback, setPlayback, songs}) => {
    
    return (
        <HomeContainer>
            <h1>Welcome to the music player</h1>
            <Link to="/Songs"><h2>Songs: </h2></Link>
            <TrackList>
                {songs.slice(25,31).map(track => 
                    <Track setPlayback={setPlayback} songs={songs} track={track}/>
                )}
            </TrackList>
            <Link to="/Albums"><h2>Albums: </h2></Link>
            <TrackList>
                {AlbumReduce(songs).slice(1,7).map(track => 
                    <Track setPlayback={setPlayback} songs={songs} album={true} track={track}/>
                )}
            </TrackList>
        </HomeContainer>
    )
};