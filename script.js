var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = document.body.clientWidth; 
canvas.height = document.body.clientHeight;

let columns = 300;
let rows = 150;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function createBoard(){
    let board = new Array(columns);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(rows);
    }
    return board;
}

async function start(){
    board = createBoard(columns, rows);
    change = createBoard(columns, rows);

    for (let i = 0; i<columns; i++){
        for (let j = 0; j<rows; j++){
            board[i][j] = Math.floor(Math.random() * 2);
        }
    }

    while(true){
        draw();
        await sleep(200);
}}

function draw(){
    for (let i = 0; i<columns; i++){
        for (let j = 0; j<rows; j++){
            if (board[i][j]==0){
                context.fillStyle = "black";
                context.fillRect(i*(canvas.width/columns), j*(canvas.height/rows), 1+canvas.width/columns, 1+canvas.height/rows);
            }
            else{
        	    context.fillStyle = "white";
                context.fillRect(i*(canvas.width/columns), j*(canvas.height/rows), 1+canvas.width/columns, 1+canvas.height/rows);
    }}}

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          let state = board[i][j];
          let sum = 0;
          let neighbors = calculate(board, i, j);
    
          if (state == 0 && neighbors == 3) {
            change[i][j] = 1;
          } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            change[i][j] = 0;
          } else {
            change[i][j] = state;
          }
    
        }
      }
    
    board = change;
}


function calculate(board, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + columns) % columns;
        let row = (y + j + rows) % rows;
        sum += board[col][row];
      }
    }
    sum -= board[x][y];
    return sum;
  }

start();





