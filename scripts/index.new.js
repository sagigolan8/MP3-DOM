/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    const divAllSong = document.getElementsByClassName("child") //the div that wrap of the song
    for (const divSong of divAllSong) {
        //remove the green mark from all songs
        divSong.style.borderLeft = "transparent"
    }
    const currentSong = document.getElementById(songId)
    currentSong.style.borderRadius = "10px" //the left green mark when song playing
    currentSong.style.borderLeft = "20px solid green"
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
// function removeSong(songId) {
//     // Your code here
// }

/**
 * Adds a song to the player, and updates the DOM to match.
 */
// function addSong({ title, album, artist, duration, coverArt }) {
//     // Your code here
// }
//adding a song
const addButton = document.getElementById("add-button")
addButton.addEventListener("click", addSong)
function addSong(e) {
    e.preventDefault()
    const divAllSongs = document.getElementById("songs")
    const idVal = generateId()
    const titleVal = document.getElementById("title").value
    const albumVal = document.getElementById("album").value
    const artistVal = document.getElementById("artist").value
    const durationVal = covertFormatToNumber(document.getElementById("duration").value)
    const coverArtVal = document.getElementById("cover-art").value
    const newSongObj = {
        id: idVal,
        title: titleVal,
        album: albumVal,
        artist: artistVal,
        duration: durationVal,
        coverArt: coverArtVal,
    }
    player.songs.push(newSongObj)
    const song = createSongElement(newSongObj)
    divAllSongs.append(song)
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("img", [], ["border-Img"], { src: coverArt }),
        createElement("span", "Title | " + title, [], {}),
        createElement("span", "Album | " + album, [], {}),
        createElement("span", "Artist | " + artist, [], {}),
        createElement("span", durationFormat(duration), ["duration"], {}),
        createElement("button", ["❌"], ["remove-song-button"], {}),
        createElement("button", ["▶️"], ["play-song-button"], {}),
    ]
    const classes = ["child"]
    const attrs = { id: "song" + id, title: "title" + title }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [
        createElement("span", name, [], {}),
        createElement("span", "  | " + [songs.length] + " songs ", [], {}),
        createElement("span", playlistDuration(id), ["duration"], {}),
    ]
    const classes = ["child"]
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
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

///////////////////////////////////--- All my help functions(start) ---//////////////////////////////////////////////////////////
function removeSongFromPlayer(songId) {
    //remove the song from the player
    for (let playlist of player.playlists) {
        for (let i = 0; i <= playlist.songs.length; i++) {
            if (playlist.songs[i] == songId) {
                playlist.songs.splice(i, 1)
            }
        }
    }
}

function covertFormatToNumber(duration) {
    //convert from mm:ss to actual number
    const minutes = Number(duration.split(":")[0]) * 60
    const seconds = Number(duration.split(":")[1])
    return minutes + seconds
}

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

function generateId() {
    //the function return the biggest ID from thw array
    let max = player.songs[0].id
    for (let i = 0; i < player.songs.length; i++) {
        //run on songs or playlists array
        if (max < player.songs[i].id) max = player.songs[i].id
    }
    return max + 1
}
///////////////////////////////////--- All my help functions(end) ---//////////////////////////////////////////////////////////

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
// document.getElementById("add-button").addEventListener("click", handleAddSongEvent)//I did it in line 46

//here we call all the songs and the playlists
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
