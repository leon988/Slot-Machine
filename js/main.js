/*----- constants -----*/
const symbols = ["A", "B", "C"]

/*----- app's state (variables) -----*/
let reels = Array.from({length: 3}, function(){
  return getRandomSymbol
})

/*----- cached element references -----*/
const reelsEl = document.getElementById("reels")
const spinButtonEl = document.querySelector(".spin-button")

/*----- event listeners -----*/
spinButtonEl.addEventListener("click",function() {
  shuffleReels()
})

/*----- functions -----*/
init()

function()