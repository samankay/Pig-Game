'use strict';
// selecting elements
const player0E1 = document.querySelector(".player--0");
const player1E1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// rolling dice funtionality
btnRoll.addEventListener("click", function () {
  // 1.generating a random dice role
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2.display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;
  // 3. check for rolled 1: change player in case of 1
  if (dice !== 1) {
    // add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle("player--active");
    player1E1.classList.toggle("player--active");

  }
})

// "hold button" funtionality
btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (scores[activePlayer] >= 10) {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle("player--active");
    player1E1.classList.toggle("player--active");
  } else {
    document.querySelector(`player--${activePlayer}El`).classList.add("player--winner");
    diceEl.classList.add("hidden");
    const btnNew = document.querySelector(".btn--new");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
})
btnNew.addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  const scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player0E1.classList.add("player--active")
  player1E1.classList.remove("player--active")
  btnRoll.disabled = false;
  btnHold.disabled = false;
})
