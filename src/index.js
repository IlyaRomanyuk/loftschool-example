/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
/*function forEach(array, fn) {
  for(let i = 0; i < array.length; i++){
      fn(array[i], i, array);
  }
}

let array = [77, 56, 23, 44];
let result = 0;
function fn(item, index){
  result = result + item;
  console.log(`Index: ${index} Number: ${item}`);
  if(index === array.length - 1){
      console.log(result);
  }
}

forEach(array, fn);*/

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
/*function map(array, fn) {
  let newArray = [];
  for(let i = 0; i<array.length; i++){
    newArray[i] = array[i];
  }
  for(let i = 0; i<array.length; i++){
      newArray[i] = fn(array[i], i, array)
  }
  return newArray;
}

let array = [1, 2, 3, 4]
function fn(item, index, array){
let result = item * item;
return result;
}

console.log(map(array, fn));*/
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
  let result = 0;
  for(let i=0; i<array.length; i++){
    if(i > 2){
      break
    }
    if(i == 0){
      result = result + fn(array[i], array[i+1]);
    }else{
      result = result + fn(result, array[i+1]);
    }
  }
  return result;
}

let array = [1, 2, 3, 4];

function fn(result, element){
  let sum = result + element;
  return sum;
}

console.log(reduce(array, fn, 10))

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
