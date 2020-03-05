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

function get_size(self, max_size, input_size){
    var input_size = [7,6];
    if (input_size[0] != max_size[0]) or (input_size[1] != max_size[1]){
        if (input_size[0] > max_size[0]) or (input_size[1] > max_size[1]){
            if (!(input_size[0]/input_size[1] > max_size[0]/max_size[1])){
                resized_size=((int)(max_size[0]),(int)(max_size[0]*input_size[1]/input_size[0]));
            } else {
                resized_size=((int)(max_size[1]*input_size[0]/input_size[1]),(int)(max_size[1]));
            }
        }else {
            if (!(input_size[0]/input_size[1] < max_size[0]/max_size[1])) {
                resized_size=((int)(max_size[1]*input_size[0]/input_size[1]),(int)(max_size[1]));
            } else {
                resized_size=((int)(max_size[0]),(int)(max_size[0]*input_size[1]/input_size[0]));
            }
        }
    } else { resized_size = input_size; }
    return resized_size;
}

function draw() {
  // put drawing code here
}