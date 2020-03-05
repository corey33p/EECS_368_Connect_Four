function setup() {
    onResize();
}

function onResize() {
    createCanvas(windowWidth, windowHeight);
    let x_buffer = .08 * width;
    let y_buffer = .08 * height;
    let x_width = width - 2*x_buffer;
    let y_width = height - 2*y_buffer;
    console.log(width);
    fill(255,255,0);
    strokeWeight(4);
    rect(x_buffer, y_buffer, x_width, y_width);
    //
    let diameter = min(x_buffer,y_buffer);
    let x_step = x_width / 8;
    let y_step = y_width / 7;
    fill(224,224,224);
    for (let i = 1;i<=7;i++){
        for (let j = 1;j<=6;j++){
            center_x = x_buffer + i * x_step;
            center_y = y_buffer + j * y_step;
            circle(center_x,center_y,diameter);
        }
    }
}

function draw() {
  // put drawing code here
}