function playSong(songId) {
    const divAllSong = document.getElementsByClassName("child")
    for (const divSong of divAllSong) {
        //remove the red marks from all songs
        divSong.style.borderLeft = "transparent"
        divSong.style.color = "rgb(0 0 0 / 73%)"
    }
    const currentSong = document.getElementById(songId)
    currentSong.style.borderRadius = "10px" //the red marks when song playing
    currentSong.style.borderLeft = "20px solid white"
    currentSong.style.color = "white"
}

function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("img", [], ["border-Img"], { src: coverArt }),
        createElement("span", "Title | " + title, [], {}),
        createElement("span", " Album | " + album, [], {}),
        createElement("span", " Artist | " + artist, [], {}),
        createElement("span", " " + durationFormat(duration), ["duration"], {}),
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
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName)
    for (let child of children) {
        //adds the text or the element as a child his the parent element
        element.append(child)
    }
    for (let name of classes) {
        //adds the classes to the element
        element.classList.add(name)
    }
    for (let attribute in attributes) {
        //adds the attributes to the element
        element.setAttribute(attribute, attributes[attribute])
    }
    return element
}

// adding the event listener to the songs list
const divOfAllSongs = songs
divOfAllSongs.addEventListener("click", (e) => {
    //listening to the click event in order to remove/play button
    if (e.target.className === "play-song-button") {
        //if the play button pressed
        playSong(e.target.parentElement.id)
    } else if (e.target.className === "remove-song-button") {
        //if the remove button pressed
        removeSongFromPlayer(e.target.parentElement.id) //remove the song from the player
        const divSong = e.target.parentElement
        divOfAllSongs.removeChild(divSong) //remove the song from the webpage
    }
})

//adding a song
const addButton = document.getElementById("add-button")
addButton.addEventListener("click", (e) => {
    //listening to the click event in order to add a song button
    e.preventDefault()
    const divAllSongs = songs
    const id = generateId() //get new unique ID for the new song
    const title = title.value
    const album = album.value
    const artist = artist.value
    const duration = duration.value
    const coverArt = document.getElementById("cover-art").value
    const newSongObj = {
        //get all values from the user and put them together in object
        id,
        title,
        album,
        artist,
        duration,
        coverArt,
    }

    const song = createSongElement(newSongObj) //creates a song element
    player.songs.push(newSongObj) //adds the new song to the player
    divAllSongs.append(song) //add the song to the webpage
    window.scrollTo(0, document.body.scrollHeight) //scroll automatically to the bottom of the page in order to see the new song
})

const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", (e) => {
    //listening to the click event in order to reset all the inputs
    e.preventDefault()
    const inputs = document.getElementsByClassName("input")
    for (const input of inputs) {
        //runs on all inputs
        input.value = "" //reset the inputs
    }
})

///////////////////////////////////--- All my help functions(start) ---//////////////////////////////////////////////////////////
function removeSongFromPlayer(songId) {
    //remove the song from the player
    for (let i = 0; i < player.playlists; i++) {
        for (let j = 0; j < playlist.songs.length; i++) {
            if (playlist.songs[j] == songId) {
                playlist.songs.splice(j, 1)
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

//the function adds the elements to the web page
function renderMp3ToDom() {
    const songsElement = songs
    const playlistsElement = playlists

    //sorts the songs and the playlists arrays
    player.playlists.sort((playlistA, playlistB) => playlistA.name.localeCompare(playlistB.name))
    player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title))

    //add the songs and the playlists elements to the page
    for (let i = 0; i < player.songs.length; i++) {
        songsElement.append(createSongElement(player.songs[i]))
    }
    for (let i = 0; i < player.playlists.length; i++) {
        playlistsElement.append(createPlaylistElement(player.playlists[i]))
    }
}

//calling the function
renderMp3ToDom()
