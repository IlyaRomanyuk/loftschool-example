var express = require('express');
var app = express();
const {checkPeople, getDataFromFile, writeStringToFile} = require("./helpers");

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

const filePeople = "file.json";
let clients = [];

io.on('connection', function(socket){
	clients.push(socket);
	io.sockets.emit('checkPeople', checkPeople(clients))

	socket.emit('news', {});

	socket.on('greeting', function(data) {
		let newData = getDataFromFile(filePeople);
		const filterObj = newData.find(item => item.name === data.name && item.lastName === data.lastName);

		if(filterObj){
			socket.emit('hideAutoriz', filterObj)
		} else {
			data.socketID = [...(data.socketID || []), socket.id];
			newData.push(data);
			socket.emit('hideAutoriz', data);
		}

		writeStringToFile(newData, filePeople);
		
		io.sockets.emit('onlinePeople', newData);
		socket.emit('message', newData);
	})

	socket.on('sendMessage', function(data) {
		let newData = getDataFromFile(filePeople);
		newData.forEach(element => {
			if(element.socketID.indexOf(...data.id) != -1){
				data.src = element.src;
				let messages = getDataFromFile('messages.json');
				messages[element.socketID] = [...(messages[element.socketID] || []), data.mes]
				writeStringToFile(messages, 'messages.json')
			}
		})
		writeStringToFile(newData, filePeople);
		io.sockets.emit('loadMessage', data);
	})

	socket.on('photo', function(data) {
		let newData = getDataFromFile(filePeople);
		newData.forEach(element => {
			if(element.socketID.indexOf(...data.ID) != -1){
				element.src = data.src;
			}
		});
		writeStringToFile(newData, filePeople);
		socket.emit('loadPhotoInChat', data.src);
	})

	socket.on('disconnect', function(data) {
		clients.splice(clients.indexOf(socket), 1);
		io.sockets.emit('checkPeople', checkPeople(clients));

	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});