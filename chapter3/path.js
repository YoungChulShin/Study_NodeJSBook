const path = require('path');

const string = __filename;

console.log('path.sep: ', path.sep);
console.log('path.delimeter: ', path.delimiter);
console.log('--------------');
console.log('path.dirname():', path.dirname(__filename));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));