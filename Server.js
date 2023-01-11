//Basic Require;
require('./Src/Config/Connection')
const Datacheck = require('./Src/Routes/Route')
const express = require('express');
const App = express();
const corse = require('cors')


//Middleware;
App.use(express.json());
App.use(corse({
    origin: '*'
}))


//User Checking Routes;
App.use('/',Datacheck)
App.use('/User',Datacheck)



//PORT Listen;
const PORT = 8080
App.listen(PORT, () => {
    console.log('Port is Running in' + PORT);
})