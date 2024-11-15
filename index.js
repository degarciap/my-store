const express = require('express');
const routerApi = require ('./routes');
const {logErrors, errorHanlder, errorHandler, boomErrorHanlder} =require('./middlewares/error.handler');

const app = express();
const port = 3000;

//a middlewere to use json on a post method
app.use(express.json());

app.get('/', (req, res ) =>{
  res.send('Hola, mi primer server en express');
});

routerApi(app);
//middlewares must always be declared after the routing
app.use(logErrors);
app.use(boomErrorHanlder);
app.use(errorHandler);

app.listen(port, () =>{
  console.log('Mi port ' + port);
});
