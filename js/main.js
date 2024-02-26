/*----- constants -----*/
const symbols = ["img/Cherry.png", "img/Diamond.png", "img/Seven.png"]

/*----- app's state (variables) -----*/
let balance = 0
let reels 
// Array.from({length: 3}, getRandomSymbol)
let currentWager = 0

/*----- cached element references -----*/
const reelContainerEl = document.querySelector("#reel-container")
const spinButtonEl = document.querySelector(".spin-button")
const stopButtonEl = document.querySelector(".stop-button")
const wagerButtonEl = document.querySelectorAll("#buttons .button")

/*----- event listeners -----*/
spinButtonEl.addEventListener("click",function() {
  spinReels()
})

stopButtonEl.addEventListener("click", function () {
  stopReels();
})

wagerButtonEl.forEach(function(button) {
  button.addEventListener('click', function(){
    setWager(button.innerText.replace(/\D/g, ''))
  })
})
/*----- functions -----*/
init()

function init() {
  renderReels()
}
// Set current wager
function setWager(wager) {
  currentWager = parseInt(wager);
  console.log(`Current Wager: $${currentWager}`)

  spinButtonEl.removeAttribute("disabled")
}

//To get random symbols
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Update reels state
function renderReels() {
  reels = Array.from({length: 3}, getRandomSymbol)
  reelContainerEl.innerHTML = ""
  reels.forEach(function (symbol) {
    let reelElement = document.createElement("img")
    reelElement.classList.add("reel")
    reelElement.src = symbol
    reelContainerEl.appendChild(reelElement)
  })
}

//Timer for spin
function spinReels() {
  if (currentWager > 0) {
    console.log('Spinning reels')
    reelContainerEl.classList.add("spinning")
  
    // Set a timer to stop the reels 
    const spinTimer = setTimeout(function() {
      stopReels()
    }, 3000)
    spinButtonEl.dataset.spinTimer = spinTimer;
  }
}

function stopReels() {
  renderReels()
  console.log('Stopping reels')
  clearTimeout(Number(spinButtonEl.dataset.spinTimer))
  reelContainerEl.classList.remove("spinning");
  console.log('Reels stopped')
}
