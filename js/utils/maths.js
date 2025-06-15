class Node {
  constructor(dir, isOrigin) {
    this.dir = dir;
    this.isOrigin = isOrigin;
  }
}

const length = 16;
let nodeList = createNode();

function createNode() {
  let nodeList = [...Array(length)].map((e) => Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i === length - 1) {
        if (j === length - 1) {
          nodeList[i][j] = new Node(null, true);
        } else {
          nodeList[i][j] = new Node('down', false);
        }
      } else {
        nodeList[i][j] = new Node('right', false);
      }
    }
  }

  return nodeList;
}

function move() {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (nodeList[i][j].isOrigin) {
        let nodeX = i;
        let nodeY = j;
        const directions = [
          { name: 'up', condition: j > 0, action: () => (nodeY = j - 1) },
          { name: 'right', condition: i < length - 1, action: () => (nodeX = i + 1) },
          { name: 'down', condition: j < length - 1, action: () => (nodeY = j + 1) },
          { name: 'left', condition: i > 0, action: () => (nodeX = i - 1) },
        ];

        const validMoves = directions.filter((dir) => dir.condition);

        if (validMoves.length === 0) return;

        const choice = validMoves[Math.floor(Math.random() * validMoves.length)];

        choice.action();
        nodeList[nodeX][nodeY].isOrigin = true;
        nodeList[i][j].isOrigin = false;
        nodeList[i][j].dir = choice.name;
      }
    }
  }
}

function getCenter(i, j, cellSize, originX, originY) {
  const halfCell = cellSize / 2;
  const cellX = i * cellSize + originX + halfCell;
  const cellY = j * cellSize + originY + halfCell;
  return { x: cellX, y: cellY };
}

export { createNode, move, getCenter, nodeList, length };
