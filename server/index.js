var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

var app = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});


var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    // welcome msg to verify connection success
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    // takes push msg from admin & sends to all connected clients
    socket.on('push', function(msg) {
        // send notifications to all connected clients
        io.emit('notifications', { msg: msg });
    });
});

console.log('Node With Socket.io started at port: 8000');

app.listen(8000);