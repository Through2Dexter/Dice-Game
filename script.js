"use strict";
// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
// Starting point
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const freshNum = function () {
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
};

//New Game button
newGame.addEventListener("click", function () {
  console.log(activePlayer);
  if (playing) {
    currentScore = 0;
    console.log("new");
    diceEl.classList.add("hidden");
    freshNum();
    if ((activePlayer = 1)) {
      player0El.classList.add("player--active");
      player1El.classList.remove("player--active");
      activePlayer = 0;
    } else {
    }
  } else {
    console.log("new");
    currentScore = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    freshNum();
  }
});

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100
    //Finish the game

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Swith to the next player
      switchPlayer();
    }
  }
});
