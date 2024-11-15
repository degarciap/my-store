const express = require('express');
const router = express.Router();

//an endpoint with two parameters
router.get('/categories/:categoryID/products/:productsID',(req,res) =>{
    const {categoryID, productsID} = req.params;
    res.json({
      categoryID,
      productsID,
    });
  });

  module.exports = router;