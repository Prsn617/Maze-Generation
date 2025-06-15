import { createBoard, drawText, drawPaths, drawMaze } from './utils/util.js';
import { move, length } from './utils/maths.js';

let paper = document.getElementById('paper');
paper.width = window.innerWidth;
paper.height = window.innerHeight;

const WIDTH = paper.width;
const HEIGHT = paper.height;

let c = paper.getContext('2d');
c.fillStyle = '#fff';
c.fillRect(0, 0, innerWidth, innerHeight);

//Game Logic
let iterations = 0;
let totalIterations = length * length * 5;
let bgColor = '#121212';

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = bgColor;
  c.fillRect(0, 0, WIDTH, HEIGHT);

  drawText(WIDTH / 2, 100, 'Maze Generator', '#ccc', '32', c);
  createBoard(c);
  drawMaze(c, bgColor);
  if (iterations < totalIterations) {
    drawPaths(c);
    move();
    iterations++;
  }
}

animate();
