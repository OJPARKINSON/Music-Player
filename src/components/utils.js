export const togglePlay = (music) => {
    const audio = document.getElementsByClassName("audio")?.[0]
    audio.volume = 0.1; 
    if (music.playing) {
        audio.src = music?.playingList?.[music?.currentSong]?.preview_url;
        audio.play()
    } else {
        audio.pause()
    };
}