
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;

const drawEvent = new Event('draw');
canvas.addEventListener('draw', handleDraw);

// start a drawing when mouse is pressed
canvas.addEventListener('mousedown', (e) => {
    drawing = true;   
    startX = e.offsetX
    startY = e.offsetY
    startDraw(yourColour, startX, startY)
});

// update drawing when mouse is moved
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    endX = e.offsetX
    endY = e.offsetY   
    canvas.dispatchEvent(drawEvent);
    endDraw(endX, endY);
});

// stop drawing when mouse button released
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

// factored out these functions to allow them
// to be called by both mouse events AND websocket events
function startDraw(colour, x, y)
{   
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function endDraw(x, y)
{
    ctx.lineTo(x, y);
    ctx.stroke();
}

