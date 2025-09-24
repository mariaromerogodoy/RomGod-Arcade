let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;

window.onload = function() {
    setGame();

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', initializeGame);
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";
    let mole = document.createElement("img");
    mole.src = "shell.png";
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";
    let plant = document.createElement("img");
    plant.src = "coral.png";
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currPlantTile) {
        document.getElementById("score").innerText = "You hurt the coral :( " + score.toString();
        gameOver = true;

       
        const restartButton = document.getElementById('restartButton');
        restartButton.classList.add('show');
    }
}

function initializeGame() {
    console.log("Game Restarted");


    const restartButton = document.getElementById('restartButton');
    restartButton.classList.remove('show');


    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }

    
    currMoleTile = null;
    currPlantTile = null;
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();


    clearInterval(moleInterval);
    clearInterval(plantInterval);
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}
