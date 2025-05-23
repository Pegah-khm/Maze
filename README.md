# Maze Generator
A simple web-based maze generator that allows users to select difficulty levels and generates random mazes accordingly.

## Description
The Maze Generator web app is built using Vanilla HTML, CSS, and JavaScript. It generates mazes dynamically on an HTML canvas based on user-selected difficulty levels (Easy, Medium, Hard).

## Maze Generation Logic
The maze generation logic is implemented entirely within the script.js file. It utilises a depth-first search (DFS) algorithm to create random mazes that are always solvable. The algorithm starts from a specified entrance and marks cells as visited while randomly removing walls between adjacent cells until all cells have been visited. This ensures that each generated maze is unique and presents varying levels of difficulty based on user selection.

## Instructions
1. **Setup**:
    - Ensure you have a web server to serve the HTML, CSS, and JavaScript files.

2. **Running the App**:
    - Open a terminal in the directory containing the files.
    - Start your web server (e.g., `http-server`).
    - Open your web browser and navigate to the address provided by the web server (usually `http://localhost:8080`).

3. **Usage**:
    - Select the difficulty level from the dropdown menu.
    - Click the "Start" button to generate a new maze.

## Files
- `index.html`: The main HTML file.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the maze generation logic.

## Author
- Name: Pegah Khodakaramimamaghani
- Email: p.khodakarami@gmail.com
