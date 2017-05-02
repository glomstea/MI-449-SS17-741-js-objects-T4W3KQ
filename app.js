// Local Storage retrieval
var jokes = window.localStorage.getItem('jokes')

// ----
// DATA start
// ----
if (jokes === null) {
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
} else {
  jokes = JSON.parse(jokes)
}
// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'
// The message if no match is found
var noJokeFound = 'No matching joke found.'
// The message for existing jokes
var existingJokeFound = 'Joke updated'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')

var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
// Get joke box
var jokeBox = document.getElementById('joke1-box')
var jokeBox2 = document.getElementById('joke2-box')
var removeBox = document.getElementById('remove-box')
var addBox = document.getElementById('add-box')
// Update the discard jokeBox
var dislikeJokeInput = document.getElementById('dislike')
var discardJokePrompt = document.getElementById('discard')
// Update the added jokeBox
var addJokeInput = document.getElementById('addition')
var addJokePromt = document.getElementById('add')
var addJokeSetup = document.getElementById('setup')
var addJokePunchline = document.getElementById('punchline')

// ADD JOKE
var addJoke = function () {
  var addJokeKey = addJokeInput.value
  var setup = addJokeSetup.value
  var punchline = addJokePunchline.value

  if (jokes[addJokeKey]) {
    addBox.innerText = existingJokeFound
  } else {
    jokes[addJokeKey] = {'setup': setup, 'punchline': punchline}
    addBox.innerText = addJokeKey + ': ' + setup + ' ' + punchline

    var stringifiedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedJokes)
  }
  updatePage()
}

// REMOVE JOKE
var removeJoke = function () {
  var discardJokeKey = dislikeJokeInput.value

  if (jokes[discardJokeKey]) {
    removeBox.innerText = existingJokeFound
    delete jokes[discardJokeKey]
    var stringifiedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedJokes)
  } else {
    removeBox.innerText = noJokeFound
  }
  updatePage()
}

// UPDATE JOKEBOX
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var existingJoke = jokes[requestedJokeKey]
  if (existingJoke) { // use truthiness to determine if joke exists
    jokeBox.textContent = existingJoke.setup
    jokeBox2.textContent = existingJoke.punchline
  } else {
    jokeBox.textContent = noJokeFound
    jokeBox2.textContent = ' '
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()
// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
// Discard joke prompt
discardJokePrompt.addEventListener('click', removeJoke)
// Add joke to jokes
addJokePromt.addEventListener('click', addJoke)
