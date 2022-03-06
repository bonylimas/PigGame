'use strict';

const player1TotalScore = document.querySelector('#score--0');
const player1CurrentScore = document.querySelector('#current--0');
const player2TotalScore = document.querySelector('#score--1');
const player2CurrentScore = document.querySelector('#current--1');
const player1Board = document.querySelector('.player--0');
const player2Board = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let p1TotalScore = 0;
let p2TotalScore = 0;
let p1CurrentScore = 0;
let p2CurrentScore = 0;
let currentPlayer = 0;
let playing = true;

const resetGame = function () {
  p1TotalScore = 0;
  p2TotalScore = 0;
  p1CurrentScore = 0;
  p2CurrentScore = 0;

  player1TotalScore.textContent = p1TotalScore;
  player1CurrentScore.textContent = p1CurrentScore;
  player2TotalScore.textContent = p2TotalScore;
  player2CurrentScore.textContent = p2CurrentScore;

  player1Board.classList.add('player--active');
  player2Board.classList.remove('player--active');
  player1Board.classList.remove('player--winner');
  player2Board.classList.remove('player--winner');

  btnRollDice.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  dice.classList.add('hidden');

  playing = true;
};

const switchPlayer = function () {
  currentPlayer = currentPlayer == 0 ? 1 : 0;

  if (currentPlayer == 0) {
    player2Board.classList.remove('player--active');
    player1Board.classList.add('player--active');
  } else {
    player1Board.classList.remove('player--active');
    player2Board.classList.add('player--active');
  }
};

const rollDice = function () {
  if (!playing) return;

  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.setAttribute('src', 'dice-' + diceNumber + '.png');

  // If Rolled 1, set the current score to 0
  // and switch player
  if (diceNumber == 1) {
    if (currentPlayer == 0) {
      p1CurrentScore = 0;
      updateP1Score();
    } else {
      p2CurrentScore = 0;
      updateP2Score();
    }

    switchPlayer();

    // If dice is not 1 then add to current player score
  } else {
    if (currentPlayer == 0) {
      p1CurrentScore += diceNumber;

      updateP1Score();
    } else {
      p2CurrentScore += diceNumber;
      updateP2Score();
    }
  }
};

const holdPlayer = function () {
  if (!playing) return;

  if (currentPlayer == 0) {
    p1TotalScore += p1CurrentScore;
    p1CurrentScore = 0;
    updateP1Score();

    if (p1TotalScore >= 100) {
      // P1 Win
      player1Board.classList.add('player--winner');
    }
  } else {
    p2TotalScore += p2CurrentScore;
    p2CurrentScore = 0;
    updateP2Score();

    if (p2TotalScore >= 100) {
      // P2 win
      player2Board.classList.add('player--winner');
    }
  }

  switchPlayer();
};

function updateP1Score() {
  player1CurrentScore.textContent = p1CurrentScore;
  player1TotalScore.textContent = p1TotalScore;
}

function updateP2Score() {
  player2CurrentScore.textContent = p2CurrentScore;
  player2TotalScore.textContent = p2TotalScore;
}

btnNewGame.addEventListener('click', resetGame);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdPlayer);

resetGame();
