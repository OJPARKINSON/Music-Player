import { useEffect } from "react";
import styled from 'styled-components';
import {IconButton, CardContent, makeStyles, Typography} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import { togglePlay, randomize } from '../components/utils';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      position: 'fixed',
      bottom: -20,
      flexDirection: 'column',
      left: 0
    },
    shuffle: {
        position: 'fixed',
        bottom: 10,
        flexDirection: 'column',
        right: 0
      },
    content: {
      flex: '1 0 auto',
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

  const ControlsContainer = styled.div`
    width: 100vw;
    position: fixed;
    bottom: 0;
    background-color: grey;
`;

export const MusicControls = ({playback, setPlayback}) => {
    const classes = useStyles();
    useEffect(() => {
        togglePlay(playback, setPlayback);
    }, [playback, setPlayback])
   
    return (
        <ControlsContainer className={classes.root}>
            <audio className="audio"></audio>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {playback?.playingList?.[playback.currentSong]?.track_name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {playback?.playingList?.[playback.currentSong]?.artist_name}
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.controls}>
                <IconButton disabled={!playback.playingList[playback.currentSong - 1]} aria-label="previous" onClick={() => setPlayback({...playback, currentSong: playback.currentSong - 1})}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={() => setPlayback({...playback, playing: !playback.playing})} aria-label="play/pause">
                    {playback?.playing ? 
                        <PauseIcon className={classes.playIcon} /> 
                            : 
                        <PlayArrowIcon className={classes.playIcon} /> 
                    }
                </IconButton>
                <IconButton disabled={!playback.playingList[playback.currentSong + 1]} aria-label="next" onClick={() => setPlayback({...playback, currentSong: playback.currentSong + 1})} >
                    <SkipNextIcon />
                </IconButton>
            </div>
            <div className={classes.shuffle}>
                <IconButton  
                    disabled={!playback.playingList[1]} 
                    aria-label="shuffle" 
                    onClick={() => 
                        setPlayback({...playback, playingList: playback.playingList.sort(() => randomize()), currentSong: 0})
                    }>
                    <ShuffleIcon fontSize="large" />
                </IconButton>
            </div>
        </ControlsContainer>
    )
}