var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

var app = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});

/**
 * to make smother DB connection & work
 * https://mlab.com Free Sandbox Db is used
 */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:Admin1234@ds223063.mlab.com:23063/notifications", { useNewUrlParser: true });

var nameSchema = new mongoose.Schema({
    pushedBy: String,
    time: String
}, {
        collection: 'notificationList'
    });

var NotificationSave = mongoose.model("Notice", nameSchema);

var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    // welcome msg to verify connection success
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    // takes push msg from admin & sends to all connected clients
    socket.on('push', function(msg) {
        
        // inserting Data to DB on every push
        var newInsert = new NotificationSave({
            pushedBy: 'Admin-AngularJs',
            time: Math.floor(Date.now() / 1000)
        });
        newInsert.save(function (err, result) {
            // if error than notify admin
            if (err) {
                socket.emit('errorMsg', { message: 'Notification Send Failed' });
            }

            // if result success,
            // than push notifications to all connected clients
            if (result) {
                // send notifications to all connected clients
                io.emit('notifications', { msg: msg });

            }
        });

        
    });
});

console.log('Node With Socket.io started at port: 8000');

app.listen(8000);