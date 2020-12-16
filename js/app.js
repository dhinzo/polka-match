/*
---* Polka Match *---
a game that prompts a user to find and select a div with a specific rgb value, within in a range of acceptable values


CHECK OUT FOR MODALS: https://micromodal.now.sh/ [ not this time :( ]

// DATA
Numbers, Data

- Numbers -- HSL values, hs
- Booleans -- does the user-selected value match the WINNING value? is it within a percentage?
  is the user past a certain level in the game? 

*/

// ---------> GAME SETUP <----------

// winningColor is not initialized until generateWinningColor()
let winningColor
// winningColors array has the winningColor value pushed into it
let winningColors = []
// gameDivs has the gameDiv color values pushed into it
let gameDivs = []

// gameLives to determine how many incorrect tries the player has
let gameLives = 8

// set starting level, count the level number after each succesful round win
let gameLevel = 1

// setting jQuery for main elements of the game
const $gameDash = $("#game-dashboard")
const $gameArea = $("#game-area")
const $polkaDashDisplay = $("#polka-container")
const $startGame = $("#start-game")
const $openBtn = $("#openModal")
const $modal = $("#modal")
const $closeBtn = $("#close")

// COLORIZER class generates random color values
class Colorizer {
  constructor() {
    this.hue = Math.floor(Math.random() * 360)
    //console.log(red)
    this.saturation = Math.floor(Math.random() * 25) + 75

    //console.log(green)
    this.light = Math.floor(Math.random() * 50) + 25
    //this.color = "color"
  }
  toHSLString() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`
  }
}

// SimilarColorizer generates HSL values within close range of the winningColor HSL
class SimilarColorizer {
  constructor() {
    this.hue = Math.floor(Math.random() * 180) + (winningColor.hue - 90)
    this.saturation =
      Math.floor(Math.random() * 40) + (winningColor.saturation - 20)

    this.light = Math.floor(Math.random() * 40) + (winningColor.light - 20)
  }

  toHSLString() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`
  }
}

// ******FUNCTIONS*******

// Generate the div that hosts the winning color
const goalDivGenerator = () => {
  if (winningColors.length !== 0) {
    return
  }
  const $goalDivs = $("<div>")
  $goalDivs.addClass("goal-divs")
  $polkaDashDisplay.append($goalDivs)

  winningColorGenerator()
  boardGenerator()
  addWinningColorToGame()
  //setTimer()
  $("#restart").css("opacity", 1)
  $("#end-game").css("opacity", 1)
}

// Generate a winning color, and push to winningColors array
const winningColorGenerator = () => {
  winningColor = new Colorizer()
  $(".goal-divs").css("background-color", winningColor.toHSLString())
  winningColors.push(winningColor)
  console.log(winningColor)
  //console.log(winningColor)
  //console.log(winningColors)
}

// Generate game board
const boardGenerator = () => {
  // levelDiff adds 20 gameDivs to the board until the min is reached
  let levelDiff = Math.min(100, gameLevel * 20)
  // sets the starting number of gameDivs and adds levelDiff for next level
  let max = 25 + levelDiff
  if (gameLevel > 5) {
    max = 40
  } else if (gameLevel > 10) {
    alert("you won the game! click new game to play again!")
    endGame()

    // gameOver()
    return
  }
  // empty gameDivs array to ensure the winningColor is included in the board
  gameDivs = []

  for (let i = 0; i < max; i++) {
    const color = gameLevel > 5 ? new SimilarColorizer() : new Colorizer()
    const $gameDiv = $(`<div id=${i}>`)
    $gameDiv.css("background-color", color.toHSLString())
    $gameDiv.addClass("game-divs")
    $("#game-container").append($gameDiv)
    //add them to array as an object with div and color object
    gameDivs.push({ div: $gameDiv, color: color }) // will push each game div as objs, div = key, $gameDiv is the value. color is the next key, and the color variable is the value
    //console.log(gameDivs)
    $gameDiv.on("click", (event) => {
      if (
        // checking to see if clicked game piece matches the winning-polka class div
        $(event.currentTarget).css("background-color") !==
        $(".winning-polka").css("background-color")
      ) {
        // adds a challenge, shuffleBoard(), after level 5 is passed
        if (gameLevel > 5) {
          shuffleBoard()
        }
        if (gameLives >= 1) {
          gameLives--
          $("#turn-display").text(gameLives)
        }
        //alert("you lost the game")
        if (gameLives === 0) {
          gameOver()
        }
      }
    })
  }
  // console.log("test")
  //console.log(gameDivs)
}

// game over fucntion
const gameOver = () => {
  alert("game over, press new game to try again")
  $("#turn-display").text(gameLives)
  $("#new-game").css("opacity", 1)
  clearInterval(interval)
  $("#restart").css("opacity", 0)
  $("#start-game").css("opacity", 0)
}

const endGame = () => {
  $("#turn-display").text(gameLives)
  $("#new-game").css("opacity", 1)
  clock = 0
  clearInterval(interval)
  $("#restart").css("opacity", 0)
  $("#start-game").css("opacity", 0)
}


// adds the winningColor value to the game board
const addWinningColorToGame = () => {
  let rnd = Math.floor(Math.random() * gameDivs.length)
  // get a random game div out of gameDivs
  // console.log("this is the length of the array", gameDivs.length)
  // console.log(rnd)
  let $winningPolka = $(`#${rnd}`).css(
    "background-color",
    winningColor.toHSLString()
  )
  $winningPolka.addClass("winning-polka")
  $winningPolka.on("click", (event) => {
    gameLives++
    alert("winning polka was clicked! click ok to move on")
    gameLevel++
    $("#turn-display").text(gameLives)
    resetGame()
    goalDivGenerator()
    clearInterval(interval)
    setTimer()
  })
}

// the challenge after level 5 is passed
const shuffleBoard = () => {
  $(".game-divs").each(function(gameDiv) {
    $(this).css("order", Math.floor(Math.random() * 100))
  })
}

// ------> Timer Functions<-------
let interval = null
let clock = 60

const resetGame = () => {
  $("#game-container").empty()
  $("#polka-container").empty()
  winningColors = []
  $("#lvl-counter").text(gameLevel)
  clearInterval(interval)
  //clock = 60
}


function updateInterval() {
  clock--
  $("#timer").text(clock)
  if (clock <= 0) {
    // reference (goalDivGenerator)
    // or GAME is not a new game
    //Do things when time runs out
    alert("you ran out of time! click ok to try this level again")
    $("#turn-display").text(gameLives)
    if (gameLives >= 1) {
      gameLives--
      $("#turn-display").text(gameLives)
    }
    //alert("you lost the game")
    if (gameLives === 0) {
      gameOver()
    }
    resetGame()
    // clearInterval(interval)
    // clock = 25
    goalDivGenerator()
  }
}

const setTimer = () => {
  clock = 60
  interval = setInterval(updateInterval, 1000)
}

// EVENT LISTENERS/HANDLERS

$(() => {
  //Modals
  const openModal = () => {
    $modal.css("display", "block")
  }
  const closeModal = () => {
    $modal.css("display", "none")
  }
  $openBtn.on("click", openModal)
  $closeBtn.on("click", closeModal)

  // Start Game
  $("#start-game").on("click", goalDivGenerator)
  $("#start-game").on('click', setTimer)
  // Restart Game
  $("#restart").on("click", function() {
    resetGame()
    setTimer()
    goalDivGenerator()
  })
  // New Game
  $("#new-game").on("click", () => {
    resetGame()
    gameLevel = 1
    $("#lvl-counter").text(gameLevel)
    gameLives = 8
    $("#turn-display").text(gameLives)
    goalDivGenerator()
    setTimer()
    $("#new-game").css("opacity", 0)
    $("#start-game").css("opacity", 1)
  })
  $("#turn-display").text(gameLives)
  $("#lvl-counter").text(gameLevel)

  // End Game
  $("#end-game").on("click", () => {
    endGame()
  })
})
