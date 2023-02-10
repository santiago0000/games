var board = [];
var rows = 8;
var columns = 8;
var minesCount = 5;
var mineLocation = []; 
var tilesClicked = 0; // goal is to click all tiles except mines
var flagEnabled = false;
var gameOver = false;


window.onload = function(){
    startGame();
}

function setMines(){
    let minesLeft = minesCount;
    while(minesLeft > 0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!mineLocation.includes(id)){
            mineLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame(){
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flagButton").addEventListener("click", setFlag);
    setMines();
    //populate board
    for (let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function setFlag(){
    if (flagEnabled){
        flagEnabled = false;
        document.getElementById("flagButton").style.backgroundColor = "lightgray";
    }
    else{
        flagEnabled = true;
        document.getElementById("flagButton").style.backgroundColor = "darkgray";
    }
}

function clickTile(){

    // prevents that player clicks on more tiles after game over
    if (gameOver || this.classList.contains("tile-clicked")){
        return;
    }

    let tile = this;
    if (flagEnabled){
        if (tile.innerText == ""){
            tile.innerText = "🚩"
        }
        else if (tile.innerText == "🚩"){
            tile.innerText = ""
        }
        return;
    }
    if(mineLocation.includes(tile.id)){
        alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function checkMine(r, c){
    // check if out of bounds
    if (r < 0 || r >= rows || c < 0 || c >= columns){
        return;
    }
    
    if (board[r][c].classList.contains("tile-clicked")){
        return;
    }

    board[r][c].classList.add("tile-clicked");
    
    tilesClicked += 1;


    let minesFound = 0;

    minesFound += checkTile(r-1, c);     //check top 
    minesFound += checkTile(r-1, c-1);   //check top left
    minesFound += checkTile(r-1, c+1);   //check top right
    minesFound += checkTile(r, c-1);     //check left 
    minesFound += checkTile(r, c+1);     //check right 
    minesFound += checkTile(r+1, c);     //check bottom
    minesFound += checkTile(r+1, c-1);   //check bottom left
    minesFound += checkTile(r+1, c+1);   //check bottom right

    if (minesFound > 0){
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else{
        // check surroundings
        checkMine(r-1, c)
        checkMine(r-1, c-1)
        checkMine(r-1, c+1)
        checkMine(r, c-1)
        checkMine(r, c+1)
        checkMine(r+1, c)
        checkMine(r+1, c-1)
        checkMine(r+1, c+1)
    }

    if (tilesClicked == rows * columns - minesCount){
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r, c){
    // check if out of bounds
    if (r < 0 || r >= rows || c < 0 || c >= columns){
        return 0;
    }

    if (mineLocation.includes(r.toString() + "-" + c.toString())){
        return 1;
    }
    return 0;
}

function revealMines(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let tile = board [r][c];
            if (mineLocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }   
}