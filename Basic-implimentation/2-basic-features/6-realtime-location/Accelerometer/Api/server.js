const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);

//https://socket.io/docs/v4/handling-cors/
const socketio = require('socket.io')(http,{
  cors: {
    origin: "*",
}
});

app.use(cors());


socketio.on('connection', (socket) => {
  console.log('Device connected. Origin:', socket.handshake.headers.origin);

  socket.on('updateLocation', async (data) => {
    console.log(data)
    // console.log(`Location update received: ${data.lat}, ${data.lng}`);
  });
});

app.get('/test', async (req, res) => {
  console.log('getlocations')
  res.send("test succes!");
});

const PORT = 3001;
const HOST = "192.168.0.120"

http.listen(PORT,HOST, () => {
    console.clear()
    console.log(`Server running on port ${HOST}:${PORT}`)
});
