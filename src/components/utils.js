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
export const AlbumReduce = (songs) => 
    songs.reduce((acc, current) => {
        !acc.find(({ album_id }) => album_id === current.album_id) && acc.push(current);
        return acc
    }, []);

export const randomize = (a, b) =>  Math.random() - 0.5
