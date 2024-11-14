startX = null;
startY = null;
endX = null;
endY = null;

// set up connection to WS server
let socket = io({
    reconnection: true, // Enable reconnection
    reconnectionAttempts: Infinity, // Number of reconnection attempts
    reconnectionDelay: 1000, // Delay between reconnection attempts
    timeout: 20000 // Connection timeout
});

// what should we do when we receive a message from the WebSocket server?
socket.on('update_canvas', function(data)
{
    console.log(`received a new line at ${data.data}`);
    const [colour, sX, sY, eX, eY] = data.data;
    startDraw(colour, sX, sY);
    endDraw(eX, eY);
    return true;
});

// when we draw, send a message to the server to update the other clients.
function handleDraw(e)
{
    console.log(`transmit new line ${startX}, ${startY} to ${endX}, ${endY}`)
    socket.emit('new_drawing', [yourColour, startX, startY, endX, endY]);
};