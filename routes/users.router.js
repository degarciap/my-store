const express = require ('express');
const router = express.Router();

//an endpoint where the parameter is entered as a query
router.get('/users', (req,res) =>{
    const {limit, offset} = req.query
    //must validate since the parameters are optional
    if (limit && offset){
      res.json({
        limit,
        offset
      });
    }else{
      res.send('No parameters');
    }
  })

  module.exports = router;