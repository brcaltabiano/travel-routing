const http = require('http');
const app = require('../index');
const myConsole = require('./console');

const server = http.createServer(app);
server.listen(3000);
myConsole();
