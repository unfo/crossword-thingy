var img = pick('#original');
var ctx;
img.addEventListener('load', () => {
    var c = pick('#copy-of')
    ctx = c.getContext("2d");
    
    ctx.drawImage(img, 0, 0);
    img.classList.add('hidden');
    clicky('canvas', drawCoordinates);
    showHowto();
});

var coordinates = {}
var coordinate_descriptions = {
    'nw': 'Click on NW corner of the grid',
    'ne': 'Click on NE corner of the grid',
    'sw': 'Click on SW corner of the grid',
    'se': 'Click on SE corner of the grid',
    'first': 'Click on SE corner of the first cell',
    'last': 'Click on NW corner of the last cell'
}
var needed_coordinates = ['nw', 'ne', 'sw', 'se', 'first', 'last'];

function showHowto() {
    pick('#mapping-howto').innerText = coordinate_descriptions[needed_coordinates[0]];
}

// Grid 498x689, Cell 43x41
function drawGridOnImage() {
    pick('#mapping-howto').innerText = 'Coordinates set. Drawing grid.';
    // let top_width = coordinates['ne'].x - coordinates['nw'].x;
    // let bottom_width = coordinates['se'].x - coordinates['sw'].x;
    // let grid_width = Math.floor((top_width + bottom_width) / 2);

    // let left_height = coordinates['sw'].y - coordinates['nw'].y;
    // let right_height = coordinates['se'].y - coordinates['ne'].y;
    // let grid_height = Math.floor((left_height + right_height) / 2);

    // let first_cell_width = coordinates['first'].x - coordinates['nw'].x;
    // let last_cell_width = coordinates['se'].x - coordinates['last'].x;
    // let cell_width = Math.floor((first_cell_width + last_cell_width) / 2);

    // let first_cell_height = coordinates['first'].y - coordinates['nw'].y;
    // let last_cell_height = coordinates['se'].y - coordinates['last'].y;
    // let cell_height = Math.floor((first_cell_height + last_cell_height) / 2);
    let grid_width = 500;
    let grid_height = 690;
    let cell_width = 45;
    let cell_height = 42;
    let border = 1;
    let origo = {'x': 11, 'y': 25 }; //coordinates['nw'];
    pick('#mapping-howto').innerText += ` || Grid ${grid_width}x${grid_height}, Cell ${cell_width}x${cell_height}`
    ctx.strokeStyle = "limegreen";
    // ctx.strokeRect(origo.x, origo.y, grid_width, grid_height);

    let x = origo.x;
    let y = origo.y;

    let rows = Math.round(grid_height / cell_height);
    let cols = Math.round(grid_width / cell_width);

    for (var ir = 0; ir < rows; ir++) {
        for (var ic = 0; ic < cols; ic++) {
            let c_x = x + (ic * (cell_width + border));
            let c_y = y + (ir * (cell_height + border));
            let cell_data = ctx.getImageData(c_x + (cell_height / 2), c_y + (cell_width / 2), 5, 5).data;
            // structure: const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;
            // we care only about rgb
            // let rgb_cell_count = (cell_data.length * 0.75);
            let total_cells = cell_data.length;
            let red_count = 0;
            for (var red_index = 0; red_index < cols; red_index++) {
                red_count += cell_data[red_index * 4];
                // if (ic == 0 && ir >= 8 && ir < 13)
                //     console.log("R", cell_data[red_index * 4]);
            }
            let avg_red = Math.ceil(red_count / cols);
            if (avg_red < 100) {
                ctx.fillStyle = "rgba(255,0,0,0.5)";
            } else if (avg_red > 250) {
                ctx.fillStyle = "rgba(0,255,0,0.5)";
            } else {
                ctx.fillStyle = "rgba(0,0,255,0.5)";
            }
            if (ic == 0 && ir >= 8 && ir < 13)
                console.log(ir, ic, avg_red);
            ctx.fillRect(c_x, c_y, cell_width, cell_height);
            // console.log(cell_avg, rgb_cell_count, rgb_sum);
            // console.log(cell_data);

        }
    }

    // while (x  < grid_width) {
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    //     ctx.lineTo(x, y + grid_height);
    //     ctx.closePath();
    //     ctx.stroke();
    //     x += cell_width;
    // }
    // x = origo.x;
    // y += cell_height;
    // while (y  < grid_height) {
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    //     ctx.lineTo(x + grid_width, y);
    //     ctx.closePath();
    //     ctx.stroke();
    //     y += cell_height;
    // }

}

function drawCoordinates(event) {
    console.log(event);
    
    let x = event.x - event.target.offsetLeft - 5;
    let y = event.y - event.target.offsetTop - 5;

    coordinates[needed_coordinates.shift()] = {'x': x, 'y': y };

    ctx.fillStyle = "lightseagreen";
    // ctx.fillRect(x, y, 5, 5);
    if (needed_coordinates.length > 66) {
        showHowto();
    } else {
        drawGridOnImage();
    }
    
}