import './css/index.scss';
import angryBird1 from './assets/images/angrybirds_one-min.png';
import angryBird2 from './assets/images/angrybirds_two-min.png';
import angryBird3 from './assets/images/angrybirds_three-min.png';
import angryBird4 from './assets/images/angrybirds_four-min.png';
import angryBird5 from './assets/images/angrybirds_five-min.png';
import angryBird6 from './assets/images/angrybirds_six-min.png';
import revers from './assets/images/revers.png';
import matched from './assets/images/matched.png';

const puzzlesArray = [
  { image: angryBird1, name: 'Angry Bird 1', clicked: false },
  { image: angryBird2, name: 'Angry Bird 2', clicked: false },
  { image: angryBird3, name: 'Angry Bird 3', clicked: false },
  { image: angryBird4, name: 'Angry Bird 4', clicked: false },
  { image: angryBird5, name: 'Angry Bird 5', clicked: false },
  { image: angryBird6, name: 'Angry Bird 6', clicked: false },
  { image: angryBird1, name: 'Angry Bird 1', clicked: false },
  { image: angryBird2, name: 'Angry Bird 2', clicked: false },
  { image: angryBird3, name: 'Angry Bird 3', clicked: false },
  { image: angryBird4, name: 'Angry Bird 4', clicked: false },
  { image: angryBird5, name: 'Angry Bird 5', clicked: false },
  { image: angryBird6, name: 'Angry Bird 6', clicked: false },
];
let choosenPuzzles = [];
let choosenPuzzlesId = [];
let winnerPuzzles = [];
/**
 *
 * @param {*} array
 */
function shuffleArray(array) {
  const temp = array;
  for (let i = temp.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
}

/**
 *
 */
function checkForWin() {
  if (winnerPuzzles.length === puzzlesArray.length / 2) {
    document.querySelector('.game--win').style.display = 'block';
    document.querySelector('.btn').disabled = false;
  }
}
/**
 *
 */
function checkForMatch() {
  const puzzles = document.querySelectorAll('.puzzle');
  const firstPuzzle = choosenPuzzles[0];
  const secondPuzzle = choosenPuzzles[1];
  const firstPuzzleId = choosenPuzzlesId[0];
  const secondPuzzleId = choosenPuzzlesId[1];
  if (firstPuzzle === secondPuzzle) {
    puzzles[firstPuzzleId].firstChild.src = matched;
    puzzles[secondPuzzleId].firstChild.src = matched;
    puzzlesArray[firstPuzzleId].clicked = true;
    puzzlesArray[secondPuzzleId].clicked = true;
    winnerPuzzles.push(firstPuzzle);
  } else {
    puzzles[firstPuzzleId].firstChild.src = revers;
    puzzles[secondPuzzleId].firstChild.src = revers;
  }
  choosenPuzzles = [];
  choosenPuzzlesId = [];
  document.querySelector('.game--score').textContent = winnerPuzzles.length;
  checkForWin();
}
/**
 *
 */
function flipPuzzle() {
  const dataId = this.dataset.id;
  const puzzle = puzzlesArray[dataId].clicked;
  if (!puzzle) {
    const img = this.firstChild;
    img.src = puzzlesArray[dataId].image;
    choosenPuzzles.push(puzzlesArray[dataId].name);
    choosenPuzzlesId.push(dataId);
  }
  if (choosenPuzzles.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
/**
 *
 * @param {*} image
 * @param {*} dataId
 * @param {*} container
 */
function createPuzzle(image, dataId, container) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  div.classList.add('puzzle');
  div.setAttribute('data-id', dataId);
  img.src = image;
  img.classList.add('puzzle--image');
  div.appendChild(img);
  div.addEventListener('click', flipPuzzle);
  container.appendChild(div);
}
/**
 *
 * @param {*} container
 */
function createBoard(container) {
  shuffleArray(puzzlesArray);
  puzzlesArray.forEach((puzzle, index) => {
    const tempPuzzle = puzzle;
    tempPuzzle.clicked = false;
    createPuzzle(revers, index, container);
  });
}
/**
 *
 */
function startGame() {
  winnerPuzzles = [];
  const puzzles = document.querySelectorAll('.puzzle');
  puzzles.forEach((puzzle) => puzzle.remove());
  const board = document.querySelector('.game--board');
  createBoard(board);
  document.querySelector('.game--win').style.display = 'none';
  document.querySelector('.btn').disabled = true;
  document.querySelector('.game--score').textContent = winnerPuzzles.length;
}

window.addEventListener('DOMContentLoaded', function start() {
  const game = document.querySelector('.game');
  const board = document.createElement('div');
  const control = document.createElement('div');
  const result = document.createElement('p');
  const score = document.createElement('span');
  const text = document.createTextNode('Scores:');
  const startScoreText = document.createTextNode('0');
  const button = document.createElement('button');
  const win = document.createElement('p');
  button.setAttribute('type', 'button');
  button.classList.add('btn');
  button.disabled = true;
  button.textContent = 'Start';
  button.addEventListener('click', startGame);
  score.classList.add('game--score');
  score.appendChild(startScoreText);
  win.classList.add('game--win');
  win.textContent = 'Gratulations!';
  win.style.display = 'none';
  result.classList.add('game--result');
  control.classList.add('game--control');
  result.appendChild(text);
  result.appendChild(score);
  control.appendChild(result);
  control.appendChild(button);
  control.appendChild(win);

  board.classList.add('game--board');
  createBoard(board);
  game.appendChild(board);
  game.appendChild(control);
});
