/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(a) {
    let result = a;
    return result;
}

let result = returnFirstArgument(10);

console.log(result);

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6
   */

   function sumWithDefaults(a, b) {

    if(b === undefined){
      b = 100;
    }

    let result = a + b;
    return result
  }

  let res = sumWithDefaults(15, 28);
  let res2 = sumWithDefaults(15);
  console.log(res);
  console.log(res2);
   
 /*2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */

function returnFnResult(fn) {
    return fn();
}

let fn = function(){
  let message = 'Hello world';
  return message;
}

console.log(returnFnResult(fn));

/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */

function returnCounter(number) {
  return function(){
    if(number === undefined){
      number = 0
    }
      number = number + 1;
      return number;
  }
}

let myFunc = returnCounter();
console.log(myFunc());
console.log(myFunc());
console.log(myFunc());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */

function returnArgumentsArray() {
  let arr = [];
    for(let i = 0; i < arguments.length; i++){
        arr[i] = arguments[i];
    }

    return arr;
}

console.log(returnArgumentsArray(1, 2, 3));

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */


function bindFunction(func2){
    let arr = [];
    for(let i = 1; i < arguments.length; i++){
        arr.push(arguments[i]);
    }
    return func2.bind(null, ...arr);
}

function sum() {
    let result = 0;
    for(let i = 0; i < arguments.length; i++){
        result = result + arguments[i];
    };
    return result;
}

console.log(bindFunction(sum, 5, 8, 9)());

export {
    returnFirstArgument,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
