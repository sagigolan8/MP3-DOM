/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    for (const song of player.songs) {
        document.getElementById("song" + song.id).classList.remove("playing")
        if (song.id === songId) {
            document.getElementById("song" + song.id).classList.add("playing")
        }
    }
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("p", "Title: " + title, [], {}),
        createElement("p", "Album: " + album, [], {}),
        createElement("p", "Artist: " + artist, [], {}),
        createElement("p", "Duration: " + durationFormat(duration), [], {}),
        createElement("img", [], ["border-Img"], { src: coverArt }),
        createElement("button", ["▶"], ["play-song-button"], {}),
        createElement("button", ["❌"], ["remove-song"], {}),
    ]
    const classes = []
    const attrs = { onclick: `playSong(${id})`, id: "song" + id, title: "title" + title }
    return createElement("div", children, classes, attrs)
}

// console.log(String(songId))

const divAllSongs = document.getElementById("songs")
divAllSongs.addEventListener("click", removeSongs)
function removeSongs(e, songId) {
    if (e.target.classList.contains("remove-song")) {
        const divSong = e.target.parentElement
        divAllSongs.removeChild(divSong)
    }
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [
        createElement("p", "Playlist name: " + name, [], {}),
        createElement("p", "Number of songs: " + [songs.length], [], {}),
        createElement("p", "Duartion: " + playlistDuration(id), [], {}),
    ]
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

function removeSong(songId) {
    for (let i = 0; i < player.songs.length; i++) if (player.songs[i].id === songId) player.songs.splice(i, 1)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element: for example- p,h1,div...
 * @param {Array} children - the child elements for the new element: for example- assume ew have <ul> his children <li>
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName)
    for (let child of children) {
        element.append(child)
    }
    for (let name of classes) {
        element.classList.add(name)
    }
    for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    return element
}

// You can write more code below this line

function durationFormat(duration) {
    //converting from seconds to mm:ss format
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    if (minutes < 10 && seconds < 10) return "0" + minutes + ":" + "0" + seconds
    else if (minutes < 10) return "0" + minutes + ":" + seconds
    else if (seconds < 10) return minutes + ":" + "0" + seconds
    else return minutes + ":" + seconds
}

function playlistDuration(id) {
    const correctPlaylist = findPlaylistById(id) //correctPlaylist contain the wanted playlist
    let saveSongId = 0,
        sum = 0
    for (let i = 0; i < correctPlaylist.songs.length; i++) {
        //run on the songs array inside this playlist
        saveSongId = correctPlaylist.songs[i]
        for (let j = 0; j < player.songs.length; j++) {
            //run on the songs array
            if (player.songs[j].id === saveSongId) sum += player.songs[j].duration
        }
    }
    return durationFormat(sum)
}

function findPlaylistById(id) {
    //Get a playlist id and return the wanted playlist by his id
    let correctPlaylist
    for (let i = 0; i < player.playlists.length; i++) {
        //run on playlists array
        if (id === player.playlists[i].id) correctPlaylist = player.playlists[i]
    }
    return correctPlaylist
}

const songsElement = document.getElementById("songs")
const playlistsElement = document.getElementById("playlists")

player.playlists.sort((playlistA, playlistB) => playlistA.name.localeCompare(playlistB.name)) //sort the songs
player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title)) //sort the playlists

for (let i = 0; i < player.songs.length; i++) {
    // run on songs array

    songsElement.append(createSongElement(player.songs[i]))
}

for (let i = 0; i < player.playlists.length; i++) {
    // run on playlists array
    playlistsElement.append(createPlaylistElement(player.playlists[i]))
}
