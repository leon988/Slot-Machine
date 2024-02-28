/*----- constants -----*/
const symbols = ["img/Cherry.png", "img/Diamond.png", "img/Seven.png"]
const winningPatterns = [
  { symbols: ["img/Cherry.png", "img/Cherry.png", "img/Cherry.png"],},
  { symbols: ["img/Diamond.png", "img/Diamond.png", "img/Diamond.png"],},
  { symbols: ["img/Seven.png", "img/Seven.png", "img/Seven.png"]},
]

/*----- app's state (variables) -----*/
let balance = 0
let reels 
let currentWager = 0
let remainingTries = 3
let spin
let spinInterval

/*----- cached element references -----*/
const reelContainerEl = document.querySelector("#reel-container")
const spinButtonEl = document.querySelector(".spin-button")
// const stopButtonEl = document.querySelector(".stop-button")
const wagerButtonEl = document.querySelectorAll("#buttons .button")
const balanceEl = document.querySelector("#balance")
const triesEl = document.querySelector("#tries")
const playButtonEl = document.querySelector(".play-button")

/*----- event listeners -----*/
spinButtonEl.addEventListener("click", function() {
  if (remainingTries > 0) {
    spinReels()
    remainingTries--
    updateTries()
    console.log(`Remaining Tries: ${remainingTries}`)
  } else if (remainingTries === 0) {
    spinButtonEl.setAttribute("disabled", "true")
    playButtonEl.style.display = "block"
    playButtonEl.removeEventListener("click", resetGame)
    playButtonEl.addEventListener("click", resetGame)
    console.log("No more tries. Game over!")
  }
});

playButtonEl.addEventListener("click", function() {
  resetGame()
});

// stopButtonEl.addEventListener("click", function () {
//   stopReels()
// })

wagerButtonEl.forEach(function(button) {
  button.addEventListener('click', function() {
    setWager(button.dataset.wager)
  })
})

/*----- functions -----*/
init()

function init() {
  renderReels()
  updateBalance()
  updateTries()
  checkForGameOver()
  resetGame()
}

// Set current wager
function setWager(wager) {
  currentWager = parseInt(wager)
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
  // checkWinningPatterns()
}

// Update amount of tries
function updateTries() {
  triesEl.textContent = `Amount of tries left: ${remainingTries}`
  checkForGameOver()
}

//Timer for spin
function spinReels() {
  if (currentWager > 0) {
    console.log('Spinning reels')
    reelContainerEl.classList.add("spinning")
    // Symbol change
    spinInterval = setInterval(function() {
      renderReelsSymbols()
    }, 100)
    // Set a timer to stop the reels
    const spinTimer = setTimeout(function() {
      stopReels()
    }, 3000)
    spinButtonEl.dataset.spinTimer = spinTimer
  }
}

//  Check each winning pattern and pay out winnings
function checkWinningPatterns() {
  // for (const pattern of winningPatterns) {
    if (
      reels[0] === symbols[0]  &&
      reels[1] === symbols[1]  && 
      reels[2] === symbols[2]
    ) {
      balance += currentWager
      console.log(balance)
      console.log(`You won ${currentWager}!`)
      updateBalance()
      return
    }
  // }
  updateBalance()
}

function stopReels() {
  clearInterval(spinInterval)
  renderReels()
  console.log('Stopping reels')
  clearTimeout(Number(spinButtonEl.dataset.spinTimer))
  reelContainerEl.classList.remove("spinning")
  console.log('Reels stopped')
  checkWinningPatterns()
  checkForGameOver()
}

// Update balance
function updateBalance() {
  balanceEl.textContent = `Balance: $${balance}`
}


// Render reels changing symbols 
function renderReelsSymbols() {
  reelContainerEl.innerHTML = ""
  reels = reels.map(getRandomSymbol)

  reels.forEach(function(symbol) { 
    let reelElement = document.createElement("img")
    reelElement.classList.add("reel")
    reelElement.src = symbol
    reelContainerEl.appendChild(reelElement)
  })
}

function checkForGameOver() {
  if (remainingTries === 0) {
    playButtonEl.style.display = 'block'
  } else {
    playButtonEl.style.display = 'none'
  }
}

// Handle play again button
function resetGame() {
  remainingTries = 3
  balance = 0
  updateTries()
  spinButtonEl.removeAttribute( "disabled" )
  playButtonEl.style.display = "none"
  updateBalance()
}
