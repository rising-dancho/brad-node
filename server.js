// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           ES6 syntax                          //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
import getPosts, { getPostLength } from './postController.js';

console.log(getPosts());

console.log(`Number of posts: ${getPostLength()}`);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           Common js syntax                    //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
// const { createRandomNumber, converToFahrenheit } = require('./utils');

// console.log(`Generated random number: ${createRandomNumber()}`);
// console.log(`Convert Celsius to Fahrenheit: ${converToFahrenheit(0)}`);
