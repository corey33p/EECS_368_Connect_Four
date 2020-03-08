let board = new Array(6); 
for (let i = 0; i < 6; ++i) {
    board[i] = [0,0,0,0,0,0,0];
}
let turn = 1;
let boardScaleFactor = .93;

// function printBoard(){
    // let str="";
    // for (let i = 0; i < 6; ++i){
        // str+=(board[i]+'\n');
    // }
    // console.log(str);
// }

// printBoard();

function setup() {
    refreshScreen();
}

function refreshScreen() {
    createCanvas(windowWidth, windowHeight);
    drawBoard();
    drawSlots();
}

function drawBoard() {
    board_size = get_size([windowWidth,windowHeight]);
    board_size = board_size.map(function(x) { return x * boardScaleFactor; });
    let x_buffer = (width - board_size[0])/2;
    let y_buffer = (height - board_size[1])/2;
    let x_width = board_size[0];
    let y_width = board_size[1];
    strokeWeight(4);
    fill(255,255,0);
    rect(x_buffer, y_buffer, x_width, y_width);
    //
}

function drawSlots(){
    board_size = get_size([windowWidth,windowHeight]);
    let x_buffer = (width - board_size[0])/2;
    let y_buffer = (height - board_size[1])/2;
    let x_width = board_size[0];
    let y_width = board_size[1];
    let diameter = min(windowWidth,windowHeight)/10;
    let x_step = x_width / 8;
    let y_step = y_width / 7;
    strokeWeight(4);
    for (let row = 1;row<=6;row++){
        for (let col = 1;col<=7;col++){
            if (board[row-1][col-1] == -1){ fill(224,0,0); }
            else if (board[row-1][col-1] == 1){ fill(0,0,0); }
            else { fill(224,224,224); }
            center_x = x_buffer + col * x_step;
            displayRow = 7 - row;
            center_y = y_buffer + displayRow * y_step;
            circle(center_x,center_y,diameter);
        }
    }
}

function get_size(max_size){
    var input_size = [7,6];
    if ((input_size[0] != max_size[0]) || (input_size[1] != max_size[1])){
        if ((input_size[0] > max_size[0]) || (input_size[1] > max_size[1])){
            if (!(input_size[0]/input_size[1] > max_size[0]/max_size[1])){
                resized_size=[(int)(max_size[0]),(int)(max_size[0]*input_size[1]/input_size[0])];
            } else {
                resized_size=[(int)(max_size[1]*input_size[0]/input_size[1]),(int)(max_size[1])];
            }
        }else {
            if (!(input_size[0]/input_size[1] > max_size[0]/max_size[1])) {
                resized_size=[(int)(max_size[1]*input_size[0]/input_size[1]),(int)(max_size[1])];            
            } else {
                resized_size=[(int)(max_size[0]),(int)(max_size[0]*input_size[1]/input_size[0])];
            }
        }
    } else { resized_size = input_size; }
    return resized_size;
}

function doTurn(col){
    let row = 0;
    if (col >= 0 && col <7){
        while (board[row][col] != 0) {
            row++;
            if (row == 6) {return false;}
        }
        if (turn == 1){ board[row][col]=1; turn = -1; }
        else { board[row][col]=-1; turn = 1; }
        return true;
    } else {
        return false;
    }
}

function mouseClicked(event){
    board_size = get_size([windowWidth,windowHeight]);
    board_size = board_size.map(function(x) { return x * boardScaleFactor; });
    let x_buffer = (width - board_size[0])/2;
    let x_width = board_size[0];
    col_width = x_width / 7;
    col = (int)((mouseX - x_buffer) / col_width);
    if (col < 0 || col > 6) { success = false; }
    else { success = doTurn(col); }
    if (success) {
        drawSlots();
        win = checkWin(-1*turn);
        console.log("win = "+win);
        return true;
    }
    return false;
}

function checkWin(type){
    // horizontal four in a row
    for (let row = 0;row<6;row++){
        consecutive_count = 0;
        for (let col = 0;col<7;col++){
            if (board[row][col]==type) { consecutive_count++; }
            else {consecutive_count = 0; }
            if (consecutive_count == 4) {return true;}
        }
    }
    
    // check vertical four in a row
    for (let col = 0;col<7;col++){
        consecutive_count = 0;
        for (let row = 0;row<6;row++){
            if (board[row][col]==type) { consecutive_count++; }
            else {consecutive_count = 0; }
            if (consecutive_count == 4) {return true;}
        }
    }
    
    // check NW to SE diagonal
    for (let col = -3;col<3;col++){
        consecutive_count = 0;
        sub_col = col;
        for (let row = 0;row<6;row++){
            if (row>=0&&row<7&&sub_col>=0&&sub_col<7){
                if (board[row][sub_col]==type) { consecutive_count++; }
                else {consecutive_count = 0; }
                if (consecutive_count == 4) {return true;}
            }
            sub_col++;
        }
    }
    
    // check NE to SW diagonal
    for (let col = 3;col<12;col++){
        consecutive_count = 0;
        sub_col = col;
        for (let row = 0;row<6;row++){
            if (row>=0&&row<7&&sub_col>=0&&sub_col<7){
                if (board[row][sub_col]==type) { consecutive_count++; }
                else {consecutive_count = 0; }
                if (consecutive_count == 4) {return true;}
            }
            sub_col--;
        }
    }
    return false;
}

function draw() {
    // nothing
}