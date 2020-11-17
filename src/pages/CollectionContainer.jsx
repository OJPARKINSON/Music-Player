import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      margin: "0 auto",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

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

const Songlist = ({songs, song, type, id}) => 
    (
        <>
            {type === "Song" && <p>{song.track_name} - {song.artist_name}</p> }
            {songs.filter(({ album_id }) => album_id === id).map(({track_name, artist_name}) => <p>{track_name} - {artist_name}</p>)}
        </>
    );

export const CollectionContainer = ({ type, songs }) => {
    const [playing, setPlaying] = useState(false)
    const { id } = useParams()
    const classes = useStyles();
    const song = songs?.find((track) => track.track_id === id || track.album_id === id) 

    const togglePlay = () => {
        console.log(song)
        const audio = document.getElementsByClassName("audio")?.[0]
        audio.volume = 0.1; 
        if (!playing) {
            setPlaying(true);
            audio.src = song.preview_url;
            audio.play()
        } else {
            setPlaying(false);
            audio.pause()
        };
    }
    
    return song ? (
        <TrackContainer>
            <TrackImage onClick={() => togglePlay()} src={song.album_url} />
            <Tracktext>{song.track_name} {type === "Album" && `- ${song.artist_name}`}</Tracktext>
            <Songlist songs={songs} song={song} type={type} id={id} />
            <div className={classes.controls}>
                <IconButton aria-label="previous">
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={() => togglePlay()} aria-label="play/pause">
                    {playing ? 
                        <PauseIcon className={classes.playIcon} /> 
                            : 
                        <PlayArrowIcon className={classes.playIcon} /> 
                    }
                </IconButton>
                <IconButton  aria-label="next">
                    <SkipNextIcon />
                </IconButton>
            </div>
        </TrackContainer>
        
    ) : <h1>Error</h1>
};