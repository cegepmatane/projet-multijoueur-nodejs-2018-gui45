var socket = new WebSocket('ws://localhost:8888','echo-protocol');
function initialiser()
{
  socket.send("test");
}
