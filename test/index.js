const nativeSlice = Array.prototype.slice;
const nativeMap = Array.prototype.map;
const nativeReduce = Array.prototype.reduce;

import { assert } from 'chai';
import { randomValue as random, randomNumberArray } from '../helper';
import {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
} from '../src/index';

describe('ДЗ 3 - объекты и массивы', () => {
    describe('forEach', () => {
        it('должна вызывать функцию для каждого элемента массива и передавать элемент первым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];

            forEach(array, el => passed.push(el));

            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента вторым аргументом', () => {
            let array = randomNumberArray();
            let index = 0;

            forEach(array, (el, i) => assert.equal(i, index++));
        });

        it('должна передавать сам массив третьим аргументом', () => {
            let array = randomNumberArray();

            forEach(array, (el, i, a) => assert.strictEqual(a, array));
        });
    });

    describe('map', () => {
        it('должна вызывать функцию для каждого элемента массива и передавать элемент первым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];

            map(array, el => passed.push(el));

            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента вторым аргументом', () => {
            let array = randomNumberArray();
            let index = 0;

            map(array, (el, i) => assert.equal(i, index++));
        });

        it('должна передавать сам массив третьим аргументом', () => {
            let array = randomNumberArray();

            map(array, (el, i, a) => assert.strictEqual(a, array));
        });

        it('должна возвращать измененную копию массива', () => {
            let array = randomNumberArray();
            let target = nativeMap.call(array, el => el ** 2);
            let result = map(array, el => el ** 2);

            assert.deepEqual(result, target);
        });

        it('не должна изменять оригинальный массив', () => {
            let array = randomNumberArray();
            let arrayCopy = nativeSlice.call(array);

            map(array, el => el ** 2);
            assert.deepEqual(array, arrayCopy);
        });
    });

    describe('reduce', () => {
        it('должна вызывать функцию для каждого элемента и передавать предыдущий результат первым аргументом', () => {
            let array = randomNumberArray();
            let i = 0;
            let prevResult = array[0];

            reduce(array, prev => {
                assert.equal(prev, prevResult);

                return prevResult = i++;
            });
        });

        it('должна учитывать initial', () => {
            let array = randomNumberArray();
            let passed = [];
            let initial = random('number');

            reduce(array, prev => passed.push(prev), initial);
            assert.deepEqual(passed[0], initial);
        });

        it('если initial не указан, то при первой итерации в prev передается первый элемент массива', () => {
            let array = randomNumberArray();
            let passed = [];

            reduce(array, prev => passed.push(prev));
            assert.strictEqual(passed[0], array[0]);
        });

        it('должна передавать элемент вторым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];
            let initial = random('number');

            reduce(array, (prev, el) => passed.push(el));
            assert.deepEqual(array.slice(1), passed);

            passed = [];
            reduce(array, (prev, el) => passed.push(el), initial); // с учетом initial
            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента третьим аргументом', () => {
            let array = randomNumberArray();
            let index = 1;
            let initial = random('number');

            reduce(array, (prev, el, i) => assert.equal(i, index++));

            index = 0;
            reduce(array, (prev, el, i) => assert.equal(i, index++), initial); // с учетом initial
        });

        it('должна передавать сам массив четвертым аргументом', () => {
            let array = randomNumberArray();

            reduce(array, (prev, el, i, a) => assert.strictEqual(a, array));
        });

        it('не должна изменять оригинальный массив', () => {
            let array = randomNumberArray();
            let arrayCopy = nativeSlice.call(array);

            reduce(array, el => el ** 2);
            assert.deepEqual(array, arrayCopy);
        });

        it('общая проверка работоспособности', () => {
            let array = randomNumberArray();
            let target = nativeReduce.call(array, (prev, el) => prev + el);
            let result = reduce(array, (prev, el) => prev + el);
            let initial = random('number');

            assert.deepEqual(result, target);

            target = nativeReduce.call(array, (prev, el) => prev + el, initial);
            result = reduce(array, (prev, el) => prev + el, initial);
            assert.deepEqual(result, target);
        });
    });

    describe('upperProps', () => {
        it('должна возвращать массив с именами свойств и преобразовывать эти имена в верхний регистр', () => {
            let obj = { a: 1, b: 2 };
            let target = ['A', 'B'];
            let result = upperProps(obj);

            assert.deepEqual(result, target);
        });
    });

    describe('slice', () => {
        let array = [1, 2, 3, 4, 5, 6, 7];
        it('общая проверка работоспособности 0', () => {
            
            let target = nativeSlice.call(array);
            let result = slice(array);

            assert.deepEqual(result, target);
        })
        it('общая проверка работоспособности 1', () => {

            let target = nativeSlice.call(array, 0);
            let result = slice(array, 0);
            assert.deepEqual(result, target);
        });

        it('общая проверка работоспособности 2', () => {
            let target = nativeSlice.call(array, 0, 0);
            let result = slice(array, 0, 0);
            assert.deepEqual(result, target);
        });

        it('общая проверка работоспособности 3', () => {
            let target = nativeSlice.call(array, 0, 1);
            let result = slice(array, 0, 1);
            assert.deepEqual(result, target);
        });

        it('общая проверка работоспособности 4', () => {
            let target = nativeSlice.call(array, 0, 2);
            let result = slice(array, 0, 2);
            assert.deepEqual(result, target);
        });

        it('общая проверка работоспособности 5', () => {
            let target = nativeSlice.call(array, 0, 5);
            let result = slice(array, 0, 5);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 6', () => {
            let target = nativeSlice.call(array, 0, -1);
            let result = slice(array, 0, -1);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 7', () => {
            let target = nativeSlice.call(array, 0, -3);
            let result = slice(array, 0, -3);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 8', () => {
            let target = nativeSlice.call(array, 0, -10000);
            let result = slice(array, 0, -10000);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 9', () => {
            let target = nativeSlice.call(array, 3);
            let result = slice(array, 3);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 10', () => {
            let target = nativeSlice.call(array, 3, -100);
            let result = slice(array, 3, -100);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 11', () => {
            let target = nativeSlice.call(array, 3, 100);
            let result = slice(array, 3, 100);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 12', () => {
            let target = nativeSlice.call(array, 3, 5);
            let result = slice(array, 3, 5);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 13', () => {
            let target = nativeSlice.call(array, 9999);
            let result = slice(array, 9999);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 14', () => {
            let target = nativeSlice.call(array, -9999);
            let result = slice(array, -9999);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 15', () => {
            let target = nativeSlice.call(array, -9999, 4);
            let result = slice(array, -9999, 4);
            assert.deepEqual(result, target);
        });
        it('общая проверка работоспособности 16', () => {
            let target = nativeSlice.call(array, -9999, -4);
            let result = slice(array, -9999, -4);
            assert.deepEqual(result, target);
        });
    });

    describe('createProxy', () => {
        it('должна вернуть Proxy, который возводит в квадрат любое записываемое значение', () => {
            let obj = {};

            obj = createProxy(obj);

            obj.a = 2;
            obj.b = 5;

            assert.deepEqual(obj, { a: 4, b: 25 });
        });
    });
});
