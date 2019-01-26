var img = pick('#original');
img.addEventListener('load', () => {
    var c = pick('#copy-of')
    let ctx = c.getContext("2d");
    
    ctx.drawImage(img, 0, 0);
    img.classList.add('hidden');
    clicky('canvas', drawCoordinates);
});

function drawCoordinates(event) {
    console.log(event);
    let ctx = event.target.getContext("2d");
    ctx.fillStyle = "lightseagreen";
    ctx.fillRect(event.x - event.target.offsetLeft - 5, event.y - event.target.offsetTop - 5, 10, 10);
}