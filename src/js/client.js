let socket = io.connect('http://localhost:8080');

socket.on('news', function(data){
    alert(data.news)
})