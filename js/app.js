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

let gameLives = 5

const rnd = Math.floor(Math.random() * gameDivs.length)
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

// Generate the div that hosts the winning color
const goalDivGenerator = () => {
  const $goalDivs = $("<div>")
  $goalDivs.addClass("goal-divs")
  $gameDash.append($goalDivs)
  winningColorGenerator()
  boardGenerator()
  addWinningColorToGame()
}

// Generate a winning color, and push to winningColors array
const winningColor = new Colorizer()
const winningColorGenerator = () => {
  $(".goal-divs").css("background-color", winningColor.toRGBString())
  winningColors.push(winningColor)
  //console.log(winningColor)
  //console.log(winningColors)
}
//-Generate game board
const boardGenerator = () => {
  for (let i = 0; i < 20; i++) {
    const color = new Colorizer()
    const $gameDiv = $(`<div id=${i}>`)
    $gameDiv.css("background-color", color.toRGBString())
    $gameDiv.addClass("game-divs")
    $("#game-container").append($gameDiv)
    //add them to array as an object with div and color object
    gameDivs.push({ div: $gameDiv, color: color }) // will push each game div as objs, div = key, $gameDiv is the value. color is the next key, and the color variable is the value
    $gameDiv.on("click", (event) => {
      if ($gameDiv !== winningColors) {
        if (gameLives >= 1) {
          gameLives--
        }
        //alert("you lost the game")
        if (gameLives === 0) {
          alert("game over, press restart to try again")
        }
        $("#display").text(gameLives)
      }
    })
  }
  // console.log("test")
  //console.log(gameDivs)
}

const addWinningColorToGame = () => {
  // get a random game div out of gameDivs
  const rnd = Math.floor(Math.random() * gameDivs.length)
  // console.log(rnd)
  const $winningPolka = $(`#${rnd}`).css(
    "background-color",
    winningColor.toRGBString()
  )
  $winningPolka.removeClass("game-divs").addClass("winning-polka")
  $winningPolka.on("click", (event) => {
    console.log("winning polka was clicked!")
    gameLives++
    $("#display").text(gameLives)
  })
}

// GAME LOGIC
// player can continue playing game if they have more than 0 lives
// player can restart the game at any point
// if gameLives === 0, game over,
// if gameLives > 0 and the player finds the color (win/move on)

// {div: $Jquery}
// EVENT LISTENERS/HANDLERS

$(() => {
  $("#start-game").on("click", goalDivGenerator)
  $("#display").text(gameLives)
})
