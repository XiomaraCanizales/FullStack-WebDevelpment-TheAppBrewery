//const generateName = require('sillyname')

// 1
import generateName from 'sillyname'
const sillyname = generateName()
console.log(`My name is ${sillyname}`)

// 2
import superheroes from 'superheroes'
const superheroName = superheroes.random()
console.log(`I am ${superheroName}`)