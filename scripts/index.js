/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children =  [createElement("p",title,[],{}),
    createElement("p",album,[],{}),
    createElement("p",artist,[],{}),
    createElement("p",durationFormat(duration)),
    
    const classes = []
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children =
     [createElement("p",title,[],{}),
        createElement("p",album,[],{}),
        createElement("p",artist,[],{}),
        createElement("p",durationFormat()),
        createElement()]
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
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
        element.classList.append(name)
    }
    for (let attribute of attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    return element
}


const elemHtml = document.getElementById("songs")
// You can write more code below this line



function durationFormat(duration) {
    //converting from seconds to mm:ss format
    let minutes = Math.floor(duration / 60)
    let seconds = duration % 60
    if (minutes < 10 && seconds < 10) return '0' + minutes + ':' + '0' + seconds
    else if (minutes < 10) return '0' + minutes + ':' + seconds
    else if (seconds < 10) return minutes + ':' + '0' + seconds
    else return minutes + ':' + seconds
  }


/**
 * Creates a song DOM element based on a song object.
 */

// function doSomething() {
//     const firstEl = createElement("div", ["some text"], ["duration-class"], {style:`color: red;`});
//     const secondEl = createElement("span", [], ["class1", "class2"]);
//     const thirdEl = createElement("span", [secondEl], [], {onclick:`console.log("hello")`});
//     const imgEl = createElement("img", ["art"], {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HelloWorld.svg/1200px-HelloWorld.svg.png"})
//     return createElement("div", [imgEl, createElement("br"), "hi", firstEl, thirdEl]);
//   }

document.createElement("div")
div.innerHTML = "<h1>hello</h1>"