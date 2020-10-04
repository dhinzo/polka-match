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

const winningColors = []

const boardColorGenerator = () => {}

const $gameDash = $("#game-dashboard")
const $gameArea = $("#game-area")
const $startGame = $("#start-game")

const goalDivGenerator = () => {
  for (let i = 1; i <= 1; i++) {
    const $goalDivs = $("<div>")
    $goalDivs.addClass("goal-divs")
    $gameDash.append($goalDivs)
    const red = Math.floor(Math.random() * 255)
    console.log(red)
    const green = Math.floor(Math.random() * 255)
    console.log(green)
    const blue = Math.floor(Math.random() * 255)
    console.log(blue)
    const color = `rgb(${red},${green},${blue})`
    $goalDivs.css("background-color", color)
  }
}

// will set the board before color is assigned
const boardGenerator = () => {
  for (let i = 0; i < 10; i++) {
    const $gameDivs = $("<div>")
    $gameDivs.addClass("game-divs")
    $("#game-area").append($gameDivs)
  }
}

// EVENT LISTENERS/HANDLERS

$(() => {
  // click $gameDivs
  $(".game-divs").on("click", (event) => {
    event.currentTarget
    console.log(`game div was clicked`)
  })
  // click $goalDivs
  $("#goal-divs").on("click", (event) => {
    event.currentTarget
    console.log(`goal div was clicked`)
  })
  // add color
  $("#start-game").on("click", goalDivGenerator, boardGenerator)
})
