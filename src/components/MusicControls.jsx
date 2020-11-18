import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import { togglePlay } from '../components/utils';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      position: 'fixed',
      bottom: -20,
      flexDirection: 'column',
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



export const MusicControls = ({music, setMusic}) => {
    const classes = useStyles();
    useEffect(() => {
        togglePlay(music, setMusic);
        console.log({music})
    }, [music, setMusic])
   
    return (
        <ControlsContainer className={classes.root}>
            <audio className="audio"></audio>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {music?.playingList?.[music.currentSong]?.track_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {music?.playingList?.[music.currentSong]?.artist_name}
                </Typography>
                </CardContent>
            </div>
            <div className={classes.controls}>
                <IconButton  disabled={!music.playingList[music.currentSong - 1]} aria-label="previous" onClick={() => setMusic({...music, currentSong: music.currentSong - 1})}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={() => setMusic({...music, playing: !music.playing})} aria-label="play/pause">
                    {music?.playing ? 
                        <PauseIcon className={classes.playIcon} /> 
                            : 
                        <PlayArrowIcon className={classes.playIcon} /> 
                    }
                </IconButton>
                <IconButton disabled={!music.playingList[music.currentSong + 1]} aria-label="next" onClick={() => setMusic({...music, currentSong: music.currentSong + 1})} >
                    <SkipNextIcon />
                </IconButton>
            </div>
        </ControlsContainer>
    )
}