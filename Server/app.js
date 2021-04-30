// Written by Nemese Kalubi
// Date: Sunday, April 18, 2021

const port = 4000; 
const express = require('express'); 
const morgan  = require('morgan'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { Socket } = require('socket.io');
let tankLists = [];

// loading app depen and middleware
const app = express(); 
app.use(morgan('dev')); 
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json);


// path 
app.use('/', (res, req) => {
    console.log(rep + res);
})

// creating server 
const server = app.listen(port, ()=> {
    console.log('Server is running on port: '+ port);
})

const  socket = require('socket.io')(server, (
    {
        cors: {
            origin: '*',
            method: ['POST', 'GET']
        }
    }
));



// creating a socket for multiple communication channel
const battlezone = socket.of('/battlezone'); 

// listening for client connection 
battlezone.on('connection', (socket)=> {
    console.log(`Client connected: [ ClientId: ${socket.id} ]`); 

    socket.on('ready', (data)=> {
        const newData = {...data, clientSocketId: socket.id};
        tankLists.push(newData);
        battlezone.emit('ready', tankLists); // emeting back the event
    })

    socket.on('moving', (data)=> {
        // battlezone.adapter.nsp.sockets[socket.id].broadcast.emit('moving', data);
        battlezone.local.emit('moving', data);
    })

})
