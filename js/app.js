console.log("hello")
$
/*
---* COLOR FINDER *---
a game that prompts a user to find and select a div with a specific rgb value, within in a range of acceptable values


// DATA
Objects/Arrays
Arrays will host winning colors
Objects will host 

- Numbers -- RGB values, RGBa values for more difficult levels of the game
- Booleans -- does the user-selected value match the WINNING value? is it within a percentage?
  is the user past a certain level in the game? 

  FUNCTIONS 
  -Generate winning colors
  -Generate game board
  -Determine acceptable range of win (1%-10%)
  -Determine wrong selection
*/
// winningColors array has the winningColor value pushed into it
const winningColors = []

// gameDivs has the gameDiv color values pushed into it
const gameDivs = []

const $gameDash = $("#game-dashboard")
const $gameArea = $("#game-area")
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
    return `rgb(${this.red},${this.green},${this.blue})`
  }
}

// ******FUNCTIONS*******

// Generate a winning color, and push to winningColors array
const winningColor = new Colorizer()
const winningColorGenerator = () => {
  $(".goal-divs").css("background-color", winningColor.toRGBString())
  // <-- i want to push this color to winningColors array
  winningColors.push(winningColor)
  console.log(winningColor)
  //console.log(winningColors)
}

const goalDivGenerator = () => {
  const $goalDivs = $("<div>")
  $goalDivs.addClass("goal-divs")
  $gameDash.append($goalDivs)
  // click $goalDivs
  $(".goal-divs").on("click", (event) => {
    event.currentTarget
    console.log(`goal div was clicked`)
    console.log(winningColors)
  })
  winningColorGenerator()
  boardGenerator()
}
//-GENERATE GAME BOARD
const boardGenerator = () => {
  for (let i = 0; i < 500; i++) {
    const color = new Colorizer()
    const $gameDiv = $(`<div id=${i}>`)
    $gameDiv.css("background-color", color.toRGBString())
    $gameDiv.addClass("game-divs")
    $("#game-container").append($gameDiv)
    // click each $gameDiv
    $gameDiv.on("click", (event) => {
      event.currentTarget
      console.log(`game div was clicked`)
    })
    //add them to array as an object with div and color object
    gameDivs.push({ div: $gameDiv, color: color }) // will push each game div as objs, div = key, $gameDiv is the value. color is the next key, and the color variable is the value
    // console.log("test")
    //console.log(gameDivs)
  }
  addWinningColorToGame()
}

const addWinningColorToGame = () => {
  // get a random game div out of gameDivs
  const rnd = Math.floor(Math.random() * gameDivs.length)
  // console.log(rnd)
  $(`#${rnd}`).css("background-color", winningColor.toRGBString())
  // take random div and add event listener to it to denote a match
  gameDivs[rnd].div.on("click", (event) => {
    console.log("winning div was clicked!")
  })
}

// {div: $Jquery}
// EVENT LISTENERS/HANDLERS

$(() => {
  // click $goalDivs
  $("#start-game").on("click", goalDivGenerator)
})
