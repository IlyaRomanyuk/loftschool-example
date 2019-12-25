let app = require('http').createServer(handler);
let io = require('socket.io')(app);

let fs = require('fs');
let path = require('path');

let port = 8080;
function handler(req, res) {
	fs.readFile(path.join(__dirname, 'index.html'),
		function (err, data) {
			if(err) {
				res.writeHead(500);
				return res.end('errrr');
			}
			res.writeHead(200, {'Content-Type':'text/html'})
			res.end(data);
		}
	)
}

io.on('connection', function(socket) {
	socket.emit('news', {news: "gghgh"})
})

app.listen(port, function() {
	console.log('app running on port' + port)
})