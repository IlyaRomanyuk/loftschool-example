/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMathing(full, chunk) {
    return (full.indexOf(chunk) !== -1);
}

function getCookiesTable() {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev.push({ name, value });
        
        return prev;
    }, [])
}

function removeTable(table) {
    [...table.children].forEach(elem => {
        elem.remove();
    })
}

const handlerRemoveClick = (name, value) => (e) => {
    e.target.parentNode.parentNode.remove();
    document.cookie = `${name}=${value}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function getTableRow(name, value) {
    const element = document.createElement('tr');

    element.innerHTML = `<td>${name}</td><td>${value}</td><td><button>Удалить</button></td>`;
    element.querySelector('button').addEventListener('click', handlerRemoveClick(name, value))
    
    return element;
}

function renderTable(arr) {
    const filterValue = filterNameInput.value;
    const filteredArr = arr.filter(({ name, value }) => isMathing(value, filterValue) || isMathing(name, filterValue) || !filterValue)

    removeTable(listTable);
    filteredArr.forEach(({ name, value }) => {

        let element = getTableRow(name, value);

        listTable.append(element);
    })
}

function handlerKeyup() {
    const filterValue = filterNameInput.value;
    const cookies = getCookiesTable().filter(({ name, value }) => isMathing(name, filterValue) || isMathing(value, filterValue))

    renderTable(cookies);

}

const handlerClick = () => {
    const inputName = addNameInput.value;
    const inputValue = addValueInput.value;

    if (!inputName || !inputValue) {
        return 
    }
    document.cookie = `${inputName}=${inputValue}`;

    renderTable(getCookiesTable());
}

filterNameInput.addEventListener('keyup', handlerKeyup);

addButton.addEventListener('click', handlerClick);