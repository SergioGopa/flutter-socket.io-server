const { Console } = require('console');
const express =  require('express');

const path = require('path');
require('dotenv').config()

//App de Express
const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io  = require('socket.io')(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

require('./sockets/socket');

//Path publico
const publicPath = path.resolve(__dirname,'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, ( err )=>{
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto!: ',process.env.PORT);
});