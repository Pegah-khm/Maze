document.getElementById('startMazeBtn').addEventListener('click', generateMaze);

function generateMaze() {
    const canvas = document.getElementById('mazeCanvas');
    const context = canvas.getContext('2d');
    const difficulty = parseInt(document.getElementById('diffSelect').value);

    // Calculating cell size based on difficulty
    const cellSize = Math.floor(canvas.width / difficulty);
    const maze = createMaze(difficulty, difficulty);

    drawMaze(context, maze, cellSize);
}

function createMaze(rows, cols) {
    // Initialising the maze grid with cells having all four borders
    const maze = Array.from({ length: rows }, () => Array(cols).fill(null).map(() => ({
        top: true,
        right: true,
        bottom: true,
        left: true
    })));

    const stack = [];
    const startCell = { row: 0, col: 0 };
    // Starting from the top-left cell
    stack.push(startCell);
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    // Marking the starting cell as visited
    visited[0][0] = true;

    // Creating entrance and exit ways to remove the related walls
    maze[0][0].top = false;
    maze[rows - 1][cols - 1].bottom = false;

    // Defining the four possible directions for movement (up, down, left, right)
    const directions = [
        { row: -1, col: 0, dir: 'top', opposite: 'bottom' }, // up
        { row: 1, col: 0, dir: 'bottom', opposite: 'top' },   // down
        { row: 0, col: -1, dir: 'left', opposite: 'right' },  // left
        { row: 0, col: 1, dir: 'right', opposite: 'left' }    // right
    ];

    while (stack.length > 0) {
        const currentCell = stack[stack.length - 1];
        const { row, col } = currentCell;
        // Finding unvisited neighbors
        const neighbors = directions
            .map(({ row: dRow, col: dCol, dir, opposite }) => ({
                row: row + dRow,
                col: col + dCol,
                dir,
                opposite
            }))
            .filter(({ row, col }) => row >= 0 && row < rows && col >= 0 && col < cols && !visited[row][col]);

        if (neighbors.length > 0) {
            //Picking a random neighbour
            const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)]; 
            // Removing the wall between the current cell and the chosen neighbor
            maze[row][col][nextCell.dir] = false;
            maze[nextCell.row][nextCell.col][nextCell.opposite] = false;
            // Marking the neighbour as visited
            visited[nextCell.row][nextCell.col] = true;
            // Pushing the neighbour to the stack
            stack.push(nextCell);
        } else {
            // Backtracking if there are no unvisited neighbours
            stack.pop();
        }
    }

    return maze;
}

function drawMaze(context, maze, cellSize) {
    // Clearing the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = maze[row][col];
            const x = col * cellSize;
            const y = row * cellSize;

            // Drawing top wall
            if (cell.top) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + cellSize, y);
                context.stroke();
            }
            // Drawing right wall
            if (cell.right) {
                context.beginPath();
                context.moveTo(x + cellSize, y);
                context.lineTo(x + cellSize, y + cellSize);
                context.stroke();
            }
            // Drawing bottom wall
            if (cell.bottom) {
                context.beginPath();
                context.moveTo(x, y + cellSize);
                context.lineTo(x + cellSize, y + cellSize);
                context.stroke();
            }
            // Drawing left wall
            if (cell.left) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x, y + cellSize);
                context.stroke();
            }
        }
    }
}
