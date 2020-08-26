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
  { image: angryBird1, name: 'Angry Bird 1' },
  { image: angryBird2, name: 'Angry Bird 2' },
  { image: angryBird3, name: 'Angry Bird 3' },
  { image: angryBird4, name: 'Angry Bird 4' },
  { image: angryBird5, name: 'Angry Bird 5' },
  { image: angryBird6, name: 'Angry Bird 6' },
  { image: angryBird1, name: 'Angry Bird 1' },
  { image: angryBird2, name: 'Angry Bird 2' },
  { image: angryBird3, name: 'Angry Bird 3' },
  { image: angryBird4, name: 'Angry Bird 4' },
  { image: angryBird5, name: 'Angry Bird 5' },
  { image: angryBird6, name: 'Angry Bird 6' },
];
let choosenPuzzles = [];
let choosenPuzzlesId = [];
const winnerPuzzles = [];
/**
 *
 */
function checkForWin() {
  if (winnerPuzzles.length === puzzlesArray.length / 2) {
    console.log('Gratulations !');
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
    console.log('You find mathed puzzles');
    puzzles[firstPuzzleId].firstChild.src = matched;
    puzzles[secondPuzzleId].firstChild.src = matched;
    winnerPuzzles.push(firstPuzzle);
  } else {
    console.log('Try again');
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
  const img = this.firstChild;
  img.src = puzzlesArray[dataId].image;
  choosenPuzzles.push(puzzlesArray[dataId].name);
  choosenPuzzlesId.push(dataId);
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
  puzzlesArray.forEach((_, index) => {
    createPuzzle(revers, index, container);
  });
}

window.addEventListener('DOMContentLoaded', function start() {
  const game = document.querySelector('.game');
  const board = document.createElement('div');
  const control = document.createElement('div');
  const result = document.createElement('p');
  const score = document.createElement('span');
  const text = document.createTextNode('Scores:');
  const startScoreText = document.createTextNode('0');
  score.classList.add('game--score');
  score.appendChild(startScoreText);
  result.classList.add('game--result');
  control.classList.add('game--control');
  result.appendChild(text);
  result.appendChild(score);
  control.appendChild(result);

  board.classList.add('game--board');
  createBoard(board);
  game.appendChild(board);
  game.appendChild(control);
});
