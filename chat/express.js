var express = require('express');
var app = express();
const {checkPeople, getDataFromFile, writeStringToFile} = require("./helpers");

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

const filePeople = "live/file.json";
const fileMessage = "live/messages.json";
let clients = [];
let newArr = [];


io.on('connection', function(socket){
	clients.push(socket.id);
	io.sockets.emit('checkPeople', checkPeople(clients))

	socket.emit('news', {});

	socket.on('greeting', function(data) {
		let newData = getDataFromFile(filePeople);
		const filterObj = newData.find(item => item.name === data.name && item.lastName === data.lastName);

		if(filterObj){
			socket.emit('hideAutoriz', filterObj);
			clients.pop();
			clients.push(filterObj.socketID[0]);

			let messages = getDataFromFile(fileMessage);
			for(let j = 0; j < messages.length; j++){

				for(let i = 0; i < newData.length; i++){
					if(messages[j].id == newData[i].socketID[0]){
						messages[j].src = newData[i].src;
						messages[j].name = newData[i].name;
						messages[j].lastName = newData[i].lastName;
					}
				}
				socket.emit('loadMessage', messages[j])
			}
		
		} else {
			data.socketID = [...(data.socketID || []), socket.id];
			newData.push(data);
			socket.emit('hideAutoriz', data);

		}
		newArr = [];
		for(let j = 0; j < clients.length; j++){
			for(let i = 0; i < newData.length; i++){
				if(clients[j] == newData[i].socketID[0]){
					newArr.push(newData[i]);
				}
			}
		}
		io.sockets.emit('onlinePeople', newArr)
		writeStringToFile(newData, filePeople);
		socket.emit('message', newData);
	})

	socket.on('sendMessage', function(data) {
		console.log('ghgj');
		let newData = getDataFromFile(filePeople);
		newData.forEach(element => {
			if(element.socketID.indexOf(...data.id) != -1){
				data.src = element.src;
				let messages = getDataFromFile('live/messages.json');
				messages.push({id: data.id[0], mes: data.mes})
				writeStringToFile(messages, 'live/messages.json');
			}
		})
		//io.sockets.emit('loadMessage', data);
		console.log(socket.id, data.mes);
		socket.emit('loadMessage', data);
		socket.broadcast.emit('loadMessage', data);
		writeStringToFile(newData, filePeople);
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
		let element = clients.find(item => {
			return (item == socket.id);
		})
		
		io.sockets.emit('disconectPeople', getDataFromFile(filePeople).find(item => item.socketID[0] == element));

		clients.splice(clients.indexOf(socket.id), 1);
		io.sockets.emit('checkPeople', checkPeople(clients));
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});