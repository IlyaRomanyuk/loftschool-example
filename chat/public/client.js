let socket = io();
let socketID;
socket.on('news', function(data){
    let sendButton = document.querySelector('.form__btn');

    sendButton.addEventListener('click', (e) =>{
        e.preventDefault();

        let form = document.querySelector('.form');
        let name = form.elements.name.value.trim();
        let lastName = form.elements.nik.value.trim();

        socket.emit('greeting', {name: name, lastName: lastName});    

        socket.on('hideAutoriz', (data) => {
            document.querySelector('.authorization').classList.add('hide');
            document.querySelector('.chat').classList.remove('hide');
            socketID = data.socketID;
            renderNameForChat(data);
        })
    })
})
socket.on('onlinePeople', function(data) {
    let container = document.querySelector('.menu__list');
    container.innerHTML = "";
    
    data.forEach(element => {
        let row = document.createElement('div')
        row.classList.add('list__link');
        row.textContent = `${element.name} ${element.lastName}`;
        container.append(row);
    })
})

socket.on('disconectPeople', function(data) {
    let container = document.querySelector('.menu__list');
    let users = document.querySelectorAll('.list__link');

    let needUser = [...users].find(el => el.textContent == `${data.name} ${data.lastName}`);
    container.removeChild(needUser);
})

/*socket.on('renderMessages', function(data) {

})*/

socket.on('message', function(data) {
    let messBtn = document.querySelector('.footer__btn');
    messBtn.addEventListener('click', (e) => {
        console.log('hjk');
        let message = document.querySelector('.footer__item').value;
        document.querySelector('.footer__item').value = "";
        /*if(data.socketID){
            socket.emit('sendMessage', {id: data.socketID, mes: message})
        } else{
            socket.emit('sendMessage', {id: socketID, mes: message})
        }*/
        socket.emit('sendMessage', {id: socketID, mes: message})
    })
})


socket.on("loadMessage", function(data) {
    let container = document.querySelector('.message__content');
    let div = document.createElement('div');
    div.classList.add('content__part');
    let img = document.createElement("img");
    img.classList.add('content__img');
    img.src = data.src;
    let p = document.createElement('p');
    p.textContent = data.mes;

    div.append(img);
    div.append(p);

    container.append(div);
})

socket.on('checkPeople', function(data){
    let element = document.querySelector('.title__people');
    element.textContent = `${data} участника`;
})

function renderNameForChat(info){
    let header = document.querySelector('.menu__search');
    let divInfo = document.createElement('div');
    divInfo.textContent = `${info.name} ${info.lastName}` 
    header.append(divInfo);

    if(info.src){
        document.querySelector('.my__icon').firstElementChild.src = info.src;
    }
}

let loadPhotoPlace = document.querySelector('.my__icon');
loadPhotoPlace.addEventListener('click', (e) => {
    let photoPopup = document.querySelector('.load');
    photoPopup.classList.remove('hide');
    document.querySelector('.chat').classList.add('hide');

    loadPhoto(photoPopup)
    socket.on('loadPhotoInChat', function(data) {
        loadPhotoPlace.firstElementChild.src = data;
    })
})

function loadPhoto(table) {
    let fileInput = document.querySelector('#photoInput');
    let fileImage = document.querySelector('.load__photo');
    let fileReader = new FileReader();

    fileReader.addEventListener('load', function(e) {
        fileImage.src = fileReader.result;
        document.querySelector('.close__load').addEventListener('click', (e) => {
            table.classList.add("hide");
            document.querySelector('.chat').classList.remove('hide');
        })
        socket.emit('photo', {src: fileReader.result, ID: socketID});
    })

    fileInput.addEventListener('change', (e) => {
        const [file] = e.target.files;

        if(file) {
            if(file.size > 512 * 1024){
                alert('Error')
            } else {
                fileReader.readAsDataURL(file)
            }
        }
    })
}

