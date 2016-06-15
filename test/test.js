var quote = require('../index.js');

var list = quote(__dirname + '/index.html', __dirname + '/');

console.log(list);