/*----- constants -----*/
const symbols = ["img/Cherry.png", "img/Diamond.png", "img/Seven.png"]
const winningPatterns = [
  { symbols: ["img/Cherry.png", "img/Cherry.png", "img/Cherry.png"], payout: 10},
  { symbols: ["img/Diamond.png", "img/Diamond.png", "img/Diamond.png"], payout: 10},
  { symbols: ["img/Seven.png", "img/Seven.png", "img/Seven.png"]},
]

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
const balanceEl = document.querySelector("#balance");

/*----- event listeners -----*/
spinButtonEl.addEventListener("click",function() {
  spinReels()
})

stopButtonEl.addEventListener("click", function () {
  stopReels()
})

wagerButtonEl.forEach(function(button) {
  button.addEventListener('click', function() {
    setWager(button.dataset.wager);
  })
})

/*----- functions -----*/
init()

function init() {
  renderReels()
  updateBalance()
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
  checkWinningPatterns()
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

// Update balance
function updateBalance() {
  balanceEl.textContent = `Balance: $${balance}`;
}

//  Check each winning pattern and pay out winnings
function checkWinningPatterns(){
  for (const pattern of winningPatterns){
    if (
      reels[0] === pattern.symbols[0]  && 
      reels[1] === pattern.symbols[1]  && 
      reels[2] === pattern.symbols[2]
      ) {
        balance += currentWager 
        console.log(`You won ${currentWager}!`)
        updateBalance()
        return
    }
  }
  balance -= currentWager;
  console.log(`You lost!`)
  updateBalance()
}
