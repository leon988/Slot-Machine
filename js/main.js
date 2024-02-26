/*----- constants -----*/
const symbols = ["A", "B", "C"]

/*----- app's state (variables) -----*/
let reels = Array.from({length: 3}, getRandomSymbol)
})

/*----- cached element references -----*/
const reelContainerEl = document.querySelector(".reel-container");
const spinButtonEl = document.querySelector(".spin-button");
const stopButtonEl = document.querySelector(".stop-button");

/*----- event listeners -----*/
spinButtonEl.addEventListener("click",function() {
  spinReels()
})

stopButtonEl.addEventListener("click", function () {
  stopReels();
});

/*----- functions -----*/
init()

function init() {
  renderReels()
}
//To get random symbols
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Update reels state
function renderReels() {
  reelContainerEl.innerHTML = ""
  reels.forEach(function (symbol) {
    const reelElement = document.createElement("div")
    reelElement.classList.add("reel")
    reelElement.textContent = symbol
    reelContainerEl.appendChild(reelElement)
  })
}

//Fisher-Yates algorithm to shuffle symbols
function shuffleReels() {
  for (let i = reels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reels[i], reels[j]] = [reels[j], reels[i]];
  }
  renderReels()
}

//Timer for spin
function spinReels() {
  console.log('Spinning reels...')
  let spinTimer = setTimeout(function(){
    stopReels()
  }, 3000)
  //Add a new frame every
  let shuffleInterval = setInterval(function(){
    shuffleReels()
  }, 200)
}

