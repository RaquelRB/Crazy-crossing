# Crazy-crossing


## Description

Crazy-crossing is a game that consists of moving a character from one point of the screen to another, avoiding the obstacles on the way.
The player **moves his character** using the arrow keys on the keyboard, while obstacles move vertically, up and down the screen, at different speeds.

The game has four levels. When the player reaches the goal **without hitting an obstacle**, they go to the next level.
If the player crashes, they can try again for that level.

The **object of the game** is to reach the last level and cross the finish line.

## Technical structure

Game of skill and dexterity created in a canvas context with JavaScript, and visualized from HTML, CSS and handling of the DOM.

### Elements
- myGameArea{}: with start, clear, stop and levelUp/Win functions.
- function component(): to create backgrounds, player and obstacles.
- function sound()

### Basic functions
- startGame()
- movePlayer()
- moveObstacles()
- checkCrash()
- checkGoal()

### Update functions
- upDateComponents()
- upDatePositions()
- updateGameArea()

## Requirements

To play it is only necessary to open the game in a web browser. The game has been designed solely for PC so it is not functional for mobile phones or tablets.


#### Click the following link to open the game: https://raquelrb.github.io/Crazy-crossing/

