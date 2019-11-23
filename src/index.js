/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
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

forEach(array, fn);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArray = [];
  for(let i = 0; i<array.length; i++){
      newArray[i] = array[i];
      newArray[i] = fn(array[i], i, array)
  }
  return newArray;
}

let array = [1, 2, 3, 4]
function fn(item, index, array){
let result = item * item;
return result;
}

console.log(map(array, fn));
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

 function reduce(array, fn, initial) {

  for(let i=0; i<array.length; i++){

    if(initial === undefined && i === 0){
      initial = array[i];
      continue;
    }
    
    initial = fn(initial, array[i], i, array);
  }
  return initial;
}

let array = [1, 2, 3, 4];

function fn(result, element, index, arr){
  console.log(result);
  let sum = result + element;
  console.log(index);
  return sum;
}
console.log(reduce(array, fn))

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = [];
  for(let key in obj){
      array.push(key.toUpperCase());
  }
  return array;
}
console.log(upperProps({ name: 'Сергей', lastName: 'Петров' }))

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to){
  let startIndex = from < 0 ? array.length + from : from;
  let lastIndex = to < 0 ? array.length + to : to;
  if(to === undefined){
      lastIndex = array.length;
  }
  let newArr = [];
  if((Math.abs(startIndex) > array.length - 1) || (Math.abs(lastIndex) > array.length) || lastIndex === 0){
      console.log('t')
      return newArr;
  }
  for(let i = startIndex; i < lastIndex; i++){
      newArr = [...newArr, array[i]]
  }
  console.log(lastIndex);
  return newArr;
}

let array = [1, 2, 3, 4, 5, 6, 7];
console.log(slice(array, -99999, -4));

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

function createProxy(obj) {
  let proxy = new Proxy(obj, {
    set(target, prop, val){
      if (typeof val === 'number') {
        target[prop] = val * val;
    }
    return true;
    }
  });
  return proxy
}

let obj = {}

obj = createProxy(obj);
obj.a = 2;
console.log(obj);

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
