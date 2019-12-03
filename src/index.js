/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve, reject) => {
      setTimeout(function() {
          resolve(seconds);
      }, seconds * 1000);
  })
}

//delayPromise(3).then((time) => console.log(`функция delayPromise вернула промис спустя ${time} сек`))
async function func(time){
  await delayPromise(time)
  console.log(`функция delayPromise вернула промис спустя ${time} сек`)
}

func(3)

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function(){
      if(xhr.status >= 400){
        reject()
      }else{
        const towns = JSON.parse(xhr.responseText);
        let arr = [];
        let newArr = [];
        for(let name of towns){
            arr.push(name.name);
          }
        newArr = arr.sort();
        resolve(newArr);
      }
    }) 
  })

}

loadAndSortTowns('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
              .then(towns => console.log(towns));

export {
    delayPromise,
    loadAndSortTowns
};
