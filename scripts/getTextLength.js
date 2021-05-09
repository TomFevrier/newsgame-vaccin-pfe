const fs = require('fs');

const texts = fs.readFileSync('src/texts.js').toString();
const strings = texts.match(/`[^\`]*`/g);
const length = strings.reduce((acc, value) => { console.log(value.replace(/`/g, '')); return acc + value.replace(/`/g, '').length}, 0);
console.log(length)
