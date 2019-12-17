ymaps.ready(init);

function init(){
    

    let map = new ymaps.Map('map', {
        center: [48.71, 44.49],
        zoom: 12,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors: ['drag']
    })

    map.events.add('click', (e) => {
        let coords = e.get('coords');
        getAdress(coords);
    })
    
    let array = [];
    let arr = [];

    function getBalloon(coords, location) {
        arr = [
            '<div class="reviews">',
            '<div class="reviews__header">',
            '<div class="place">',
            '<img class="place__img" src="img/place.png" alt="">',
            `<p class="place__content">${location}</p>`,
            '</div>',
            '<button class="close__button"><img class="close" src="img/close.png" alt=""></button>',
            '</div>',
            '<div class="reviews__content">',
            '</div>',
            '<div class="reviews__form">',
            '<p class="head">ваш отзыв</p>',
            '<form action="" class="form">',
            '<input class="input form__name" type="text" name="name" placeholder="Ваше имя">',
            '<input class="input form__place" type="text" name="place" placeholder="Укажите место">',
            '<textarea class="input form__about" type="text" name="about" placeholder="Поделитесь впечатлениями"></textarea>',
            '<button class="form__btn">Добавить</button>',
            '</form>',
            '</div>',
            '</div>'];
        map.balloon.open(coords, arr.join(""), {
            closeButton: false,
            minWidth: 354,
            minHeight: 550,
            autoPanDuration: 100
        }).then(() => {  
            let closeButton = document.querySelector('.close__button');
            closeButton.addEventListener('click', () => map.balloon.close());
            document.querySelector('.form__btn').addEventListener('click', (e) => {
                e.preventDefault();
                addReview(coords);
                createPlaysMark(coords, arr, location);
            })  
        })
    }


    function addReview(coords) {
        let form = document.querySelector('.form');
        let name = form.elements.name.value;
        let place = form.elements.place.value;
        let about = form.elements.about.value;
        let date = new Date();
        let nowDate = `${date.getFullYear()}.${date.getDate()}.${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        renderReview({name, place, about, nowDate});
        if(localStorage[makeFixedCords(coords)]){
            array.push(JSON.stringify({name, place, about, nowDate}))
        }else{
            array = [];
            array.push(JSON.stringify({name, place, about, nowDate}));
        }
         
        localStorage.setItem(makeFixedCords(coords), JSON.stringify(array));
    }


    function makeFixedCords(coords){
        let newArrCoords = coords.map((el) => el.toFixed(5))
        return newArrCoords;
    }


    function renderReview(object) {
        let element = document.createElement('div');
        element.classList.add('comment');
        let template = Handlebars.compile(document.querySelector('#entry-template').textContent);
        element.innerHTML = template(object)
        document.querySelector('.reviews__content').append(element);
    }

    
    function createPlaysMark(coords, arr, location) {
        let el;
        if(localStorage[makeFixedCords(coords)]){
            for(let key of JSON.parse(localStorage[makeFixedCords(coords)])){
                el = JSON.parse(key);
            }
        }

        let mark = new ymaps.Placemark(coords, {
            balloonContentCoords: coords,
            balloonContentHeader1: el.place,
            balloonContentBody1: location,
            balloonContentBody2: el.about,
            balloonContentFooter1: el.nowDate
        }, {
            iconLayout: "default#image",
            iconImageHref: 'img/geo.png',
            iconImageSize: [44, 66],
            iconImageOffset: [-22, -66]
        });

        clusterer.add(mark);  

        mark.events.add('click', (e) => {
            map.balloon.open(coords, arr.join(""), {
                closeButton: false,
                minWidth: 354,
                minHeight: 550,
                autoPanDuration: 100,
                offset: [70, 570]
            }).then(() => {
                document.querySelector('.close__button').addEventListener('click', () => map.balloon.close())
                document.querySelector('.form__btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    addReview(coords);
                    createPlaysMark(coords, arr);
                })

                let coordinates = e.get('target').geometry.getCoordinates().map((element) => {
                    return element.toFixed(5);
                })
    
                for(let key in localStorage){
                    if(key == coordinates){
                        JSON.parse(localStorage[key]).forEach(element => {
                            let el = JSON.parse(element);
                            renderReview(el);   
                        });
                    }
                }
                
            })    
        })

    }

    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(

        '<div>{{properties.balloonContentHeader1}}</div>'+
        `<a class="balloonAddress" href="#">{{properties.balloonContentBody1}}</a>`+
        '<div>{{properties.balloonContentBody2}}</div>'+
        '<div>{{properties.balloonContentFooter1}}</div>', {

            build: function(){
                console.log(this)

                customItemContentLayout.superclass.build.call(this);

                this.balloonContentBody1 = document.querySelector('.balloonAddress');
                this.balloonContentBody1Listener = this.balloonContentBody1Listener.bind(this);

                this.balloonContentBody1.addEventListener('click', this.balloonContentBody1Listener);
                
            },
            balloonContentBody1Listener: function(e) {
                e.preventDefault();
                let coords = this.events.params.context._data.properties.get('balloonContentCoords');
                let address = this.events.params.context._data.properties.get('balloonContentBody1');
                
                map.balloon.open(coords, arr.join(""), {
                    closeButton: false,
                    minWidth: 354,
                    minHeight: 550,
                    autoPanDuration: 100,
                    offset: [70, 570]
                }).then(() => {
                    document.querySelector('.close__button').addEventListener('click', () => {
                        map.balloon.close();
                    })

                    let el;
                    if(localStorage[makeFixedCords(coords)]){
                        for(let key of JSON.parse(localStorage[makeFixedCords(coords)])){
                            el = JSON.parse(key);
                            renderReview(el);
                        }
                    }

                    document.querySelector('.form__btn').addEventListener('click', (e) => {
                        e.preventDefault();
                        addReview(coords);
                        createPlaysMark(coords, arr, address);
                    })
                    
                })
                /*getBalloon(coords, address);
                const BalloonContentLayout = getBalloon(coords, address)
                map.balloon.open(coords, null, {
                  layout:  BalloonContentLayout
                });*/
                
            }
        
        }); 

    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout
    })

    map.geoObjects.add(clusterer);

    function getAdress(coords){
        ymaps.geocode(coords)
        .then((response => {
            let geoObject = response.geoObjects.get(0);
            const houseNumber = geoObject.getPremiseNumber();
            const nameStreet = geoObject.getThoroughfare();
            const nameCity = geoObject.getLocalities();
            const nameRegion = geoObject.getAdministrativeAreas();

            let location = !houseNumber ? `${nameRegion}` : `${nameCity}, ${nameStreet}, ${houseNumber}`;
            
            getBalloon(coords, location)
        }))
    }
}

