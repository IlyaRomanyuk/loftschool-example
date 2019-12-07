/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', (e) => {
      if(xhr.status >= 400){
        reject()
      } else{
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      }
    })
  })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
const isMatching =(full, chunk) => full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
  let arr = [];
  let newArr = [];
  loadingBlock.style.display = 'block';
  loadTowns('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then((response) => {
      loadingBlock.style.display = 'none';
      for(const town of response){
        arr.push(town.name);
      }
      newArr = arr.sort();
      
      [...filterResult.children].forEach(el => {
        el.parentNode.removeChild(el)
      })
        
      newArr.forEach(element => {
        if(isMatching(element, filterInput.value)){
          const div = document.createElement("DIV");
          div.textContent = element;
          filterResult.append(div);

          if(filterInput.value.length === 0){
            [...filterResult.children].forEach(el => {
              el.parentNode.removeChild(el)
            })
          }
        }
      })
    })
    .catch(() => {
      let btn = document.querySelector('.btn');
      btn.style.display = "block";
      btn.addEventListener('click', (e) => {
      loadTowns('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
      .then((response) => {
        loadingBlock.style.display = 'none';
        for(const town of response){
          arr.push(town.name);
        }
        newArr = arr.sort();
        
          [...filterResult.children].forEach(el => {
            el.parentNode.removeChild(el)
          })
          
        newArr.forEach(element => {
          if(isMatching(element, filterInput.value)){
            const div = document.createElement("DIV");
            div.textContent = element;
            filterResult.append(div);
  
            if(filterInput.value.length === 0){
              [...filterResult.children].forEach(el => {
                el.parentNode.removeChild(el)
              })
            }
            
          }
        })
      })
      })
    })
});

export {
  loadTowns,
  isMatching
};
