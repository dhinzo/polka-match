//console.log("hello")
$
/*
---* COLOR FINDER *---
a game that prompts a user to find and select a div with a specific rgb value, within in a range of acceptable values


CHECK OUT FOR MODALS: https://micromodal.now.sh/

// DATA
Objects/Arrays
Arrays will host winning colors
Objects will host 

- Numbers -- RGB values, RGBa values for more difficult levels of the game
- Booleans -- does the user-selected value match the WINNING value? is it within a percentage?
  is the user past a certain level in the game? 

  FUNCTIONS 
  -Generate winning color
  -Generate game pieces
  -Generate game board
  -Determine the result of the wrong selection 
  -Determine the result of the correct selection 
*/

// ---------> GAME SETUP <----------

// winningColor is not initialized until generateWinningColor()
let winningColor
// winningColors array has the winningColor value pushed into it
let winningColors = []
// gameDivs has the gameDiv color values pushed into it
const gameDivs = []

// gameLives to determine how many incorrect tries the player has
let gameLives = 5

// count the level number after each succesful round win
let gameLevel = 1

// setting jQuery for main elements of the game
const $gameDash = $("#game-dashboard")
const $gameArea = $("#game-area")
const $polkaDashDisplay = $("#polka-container")
const $startGame = $("#start-game")

// COLORIZER class generates random color values
class Colorizer {
  constructor() {
    this.red = Math.floor(Math.random() * 255)
    //console.log(red)
    this.green = Math.floor(Math.random() * 255)
    //console.log(green)
    this.blue = Math.floor(Math.random() * 255)
    //this.color = "color"
  }
  toRGBString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
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
  setTimer()
}

// Generate a winning color, and push to winningColors array
const winningColorGenerator = () => {
  winningColor = new Colorizer()
  $(".goal-divs").css("background-color", winningColor.toRGBString())
  winningColors.push(winningColor)
  console.log(winningColor)
  //console.log(winningColor)
  //console.log(winningColors)
}

//-Generate game board
const boardGenerator = () => {
  let levelDiff = Math.min(100, gameLevel * 20)

  for (let i = 0; i < 22 + levelDiff; i++) {
    const color = new Colorizer()
    const $gameDiv = $(`<div id=${i}>`)
    $gameDiv.css("background-color", color.toRGBString())
    $gameDiv.addClass("game-divs")
    $("#game-container").append($gameDiv)
    //add them to array as an object with div and color object
    gameDivs.push({ div: $gameDiv, color: color }) // will push each game div as objs, div = key, $gameDiv is the value. color is the next key, and the color variable is the value
    //console.log(gameDivs)
    $gameDiv.on("click", (event) => {
      //check event current target.css.(backgroudncolor) winningcolors[0].toRBGstring
      console.log(
        "target color",
        $(event.currentTarget).css("background-color")
      )
      console.log("winning Color", winningColors[0].toRGBString())
      if (
        $(event.currentTarget).css("background-color") !==
        winningColors[0].toRGBString()
      ) {
        if (gameLives >= 1) {
          gameLives--
        }
        //alert("you lost the game")
        if (gameLives === 0) {
          alert("game over, press restart to try again")
        }
        $("#turn-display").text(gameLives)
      }
    })
  }
  // console.log("test")
  //console.log(gameDivs)
}

const addWinningColorToGame = () => {
  let rnd = Math.floor(Math.random() * gameDivs.length)
  // get a random game div out of gameDivs
  // console.log(rnd)
  let $winningPolka = $(`#${rnd}`).css(
    "background-color",
    winningColor.toRGBString()
  )
  $winningPolka.addClass("winning-polka")
  $winningPolka.on("click", (event) => {
    alert("winning polka was clicked! click ok to move on")
    gameLevel++
    gameLives++
    $("#turn-display").text(gameLives)
    resetGame()
    goalDivGenerator()
  })
}

// TO-DO
//To make colors closer to winning color
// function

//Generate a color modifer between (closer to 0 is harder closer to 100 is easier), increase or decrase each R G B value by modifier
//Keep in mind cant go below 0 or above 255 Math.min or Math.max

const colorModifier = () => {
  let modifiedColor = winningColor
  modifiedColor.blue = Math.floor(Math.random() * Math.min(winningColor.blue))
  console.log(modifiedColor.blue)
}

interval = null
let clock = 25

const resetGame = () => {
  $("#game-container").empty()
  $("#polka-container").empty()
  //goalDivGenerator()
  winningColors = []
  //addWinningColorToGame()
  $("#lvl-counter").text(gameLevel)
  clearInterval(interval)
  clock = 25
}

function updateInterval() {
  clock--
  console.log(clock)
  $("#timer").text(clock)
  if (clock <= 0) {
    // reference (goalDivGenerator)
    // or GAME is not a new game
    //Do things when time runs out
    alert("you ran out of time! click ok to try this level again")
    $("#turn-display").text(gameLives)
    gameLives--
    resetGame()
    // clearInterval(interval)
    // clock = 25
    goalDivGenerator()
  }
}

const setTimer = () => {
  interval = setInterval(updateInterval, 1000)
}

// {div: $Jquery}
// EVENT LISTENERS/HANDLERS

$(() => {
  $("#start-game").on("click", goalDivGenerator)
  $("#restart").on("click", function() {
    resetGame()
    goalDivGenerator()
  })

  $("#turn-display").text(gameLives)
  $("#lvl-counter").text(gameLevel)
})
