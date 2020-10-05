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

class Colorizer {
  constructor() {
    this.red = Math.floor(Math.random() * 255)
    //console.log(red)
    this.green = Math.floor(Math.random() * 255)
    //console.log(green)
    this.blue = Math.floor(Math.random() * 255)
  }
  toRGBString() {
    return `rgb(${this.red},${this.green},${this.blue})`
  }
}

const winningColors = []
const gameDivs = []

const $gameDash = $("#game-dashboard")
const $gameArea = $("#game-area")
const $startGame = $("#start-game")

// ******FUNCTIONS*******

// Generate a winning color, and push to winningColor array
const winningColorGenerator = () => {
  // const red = Math.floor(Math.random() * 255)
  // //console.log(red)
  // const green = Math.floor(Math.random() * 255)
  // //console.log(green)
  // const blue = Math.floor(Math.random() * 255)
  //console.log(blue)
  // const color = {
  //   red: red,
  //   blue: blue,
  //   green: green
  // }
  // const color = `rgb(${red},${green},${blue})`
  const winningColor = new Colorizer()
  $(".goal-divs").css("background-color", winningColor.toRGBString())
  // <-- i want to push this color to winningColors array
  //console.log(this)
  winningColors.push(winningColor)
  console.log(winningColor)
  console.log(winningColors)
}

const goalDivGenerator = () => {
  const $goalDivs = $("<div>")
  $goalDivs.addClass("goal-divs")
  $gameDash.append($goalDivs)
  // click $goalDivs
  $(".goal-divs").on("click", (event) => {
    event.currentTarget
    console.log(`goal div was clicked`)
    // console.log(winningColors)
  })
  winningColorGenerator()
  boardGenerator()
}
//-GENERATE GAME BOARD
// will set the board before color is assigned
const boardGenerator = () => {
  for (let i = 0; i < 500; i++) {
    const color = new Colorizer()
    const $gameDiv = $("<div>")
    $gameDiv.css("background-color", color.toRGBString())
    $gameDiv.addClass("game-divs")
    $("#game-container").append($gameDiv)
    // click $gameDivs
    $gameDiv.on("click", (event) => {
      event.currentTarget
      console.log(`game div was clicked`)
    })
    //add them to array as an object with div and color object
    gameDivs.push({ div: $gameDiv, color: color }) // will push each game div as objs, div = key, $gameDiv is the value. color is the next key, and the color variable is the value
    console.log(gameDivs)
  }
}

const addWinningColorToGame = () => {
  // get a random game div out of gameDivs
  //rnd = random between 0 - gamedivs.length
  // set color property of a random div to match the winning div
  //gameDivs[rnd].color = winningcolors[0].color
  // '' ''''  .css(background to winningcolors.toRGBString)
  // take random div and add event listener to it to denote a match
  //gamedivs[rnd].div.on(click, {dostuf})
}

// {div: $Jquery}
// EVENT LISTENERS/HANDLERS

$(() => {
  // click $goalDivs
  $("#start-game").on("click", goalDivGenerator)
})
