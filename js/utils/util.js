import { getCenter, nodeList, length } from './maths.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const cellSize = 45;
const halfCell = cellSize / 2;
const originX = (WIDTH - cellSize * length) / 2;
const originY = (HEIGHT - cellSize * length) / 2;

const pathColor = '#777';
const cellColor = '#b0b0b0';

function drawText(x, y, text, color, size, c) {
  c.fillStyle = color;
  c.textBaseline = 'middle';
  c.textAlign = 'center';
  c.font = `${size}px Arial`;
  c.fillText(text, x, y);
}

function createBoard(c) {
  for (let i = 0; i <= length; i++) {
    for (let j = 0; j <= length; j++) {
      c.lineWidth = 3;
      c.strokeStyle = cellColor;

      c.beginPath();
      c.moveTo(i * cellSize + originX, originY);
      c.lineTo(i * cellSize + originX, cellSize * length + originY);
      c.stroke();

      c.beginPath();
      c.moveTo(originX, j * cellSize + originY);
      c.lineTo(cellSize * length + originX, j * cellSize + originY);
      c.stroke();
    }
  }
}

function designPath(x, y, c) {
  c.moveTo(x, y);
  c.strokeStyle = pathColor;
  c.lineWidth = 1;
  c.lineCap = 'square';
}

function drawNodeCircle(x, y, nodeList, i, j, c) {
  c.beginPath();
  c.arc(x, y, nodeList[i][j].isOrigin ? 6 : 4, 0, 2 * Math.PI);
  c.fillStyle = nodeList[i][j].isOrigin ? 'lightgreen' : 'green';
  c.fill();
}

function drawNodeText(x, y, nodeList, i, j, c) {
  c.fillStyle = pathColor;
  c.font = '10px Arial';
  c.fillText(`${i}, ${j}`, x - 8, j * cellSize + originY + 12);
  c.fillText(nodeList[i][j].dir, x - 8, y + halfCell - 8);
}

function drawPaths(c) {
  let cellOffSet = cellSize / 2;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      c.beginPath();

      const { x: cellX, y: cellY } = getCenter(i, j, cellSize, originX, originY);
      designPath(cellX, cellY, c);

      if (nodeList[i][j].dir == 'left') {
        if (i === 0) cellOffSet = 0;
        c.lineTo(cellX - halfCell - cellOffSet, cellY);
      }
      if (nodeList[i][j].dir == 'right') {
        if (i === length - 1) cellOffSet = 0;
        c.lineTo(cellX + halfCell + cellOffSet, cellY);
      }
      if (nodeList[i][j].dir == 'up') {
        if (j === 0) cellOffSet = 0;
        c.lineTo(cellX, cellY - halfCell - cellOffSet);
      }
      if (nodeList[i][j].dir == 'down') {
        if (j === length - 1) cellOffSet = 0;
        c.lineTo(cellX, cellY + halfCell + cellOffSet);
      }
      c.stroke();

      drawNodeCircle(cellX, cellY, nodeList, i, j, c);
      drawNodeText(cellX, cellY, nodeList, i, j, c);
    }
  }
}

function drawMaze(c, bgColor) {
  let cellOffSet = cellSize / 2;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const { x: cellX, y: cellY } = getCenter(i, j, cellSize, originX, originY);

      const originCellX = cellX - halfCell;
      const originCellY = cellY - halfCell;

      // c.fillStyle = 'rgba(0, 0, 0, .9)';
      c.fillStyle = bgColor;
      if (nodeList[i][j].dir === 'left') {
        if (i === 0) cellOffSet = 0;
        c.beginPath();
        c.rect(originCellX - cellOffSet + 2, originCellY + 2, halfCell + cellOffSet - 2, cellSize - 4);
        c.fill();
      }
      if (nodeList[i][j].dir === 'right') {
        if (i === length - 1) cellOffSet = 0;
        c.beginPath();
        c.rect(cellX, originCellY + 2, halfCell + cellOffSet - 2, cellSize - 4);
        c.fill();
      }
      if (nodeList[i][j].dir === 'up') {
        if (j === 0) cellOffSet = 0;
        c.beginPath();
        c.rect(originCellX + 2, cellY - halfCell - cellOffSet, cellSize - 4, halfCell + cellOffSet - 2);
        c.fill();
      }
      if (nodeList[i][j].dir === 'down') {
        if (j === length - 1) cellOffSet = 0;
        c.beginPath();
        c.rect(originCellX + 2, cellY, cellSize - 4, halfCell + cellOffSet - 2);
        c.fill();
      }
    }
  }
}

export { createBoard, drawText, drawPaths, drawMaze };
