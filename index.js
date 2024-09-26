const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res ) =>{
  res.send('Hola, mi primer server en express');
});

app.get('/categories/:categoryID/products/:productID', (req, res) => {
  const { categoryID, productID } = req.params;
  res.json({
    categoryID,
    productID
  });
});

app.listen(port, () =>{
  console.log('Mi port ' + port);
});
