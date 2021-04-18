// Written by Nemese Kalubi
// Date: Sunday, April 18, 2021

const port = 9000; 
const domain = 'localhost';

const express = require('express'); 
const morgan  = require('morgan'); 
const socketIo = require('socket.io'); 
const bodyParser = require('body-parser'); 

// loading app depen and middleware
const app = express(); 
app.use(morgan('dev')); 
app.use(bodyParser.json);


// path 
app.use('/', (res, req) => {
    console.log(rep + res);
})

// creating server 
const server = app.listen(port, ()=> {
    console.log('Server is running of port: '+ port);
})
