const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async(req,res) => {
  const products = await service.find();
  res.json(products);
  });

//an endpoint with one parameter
router.get('/:id', async(req,res, next)=>{
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
  });

  router.post('/',
    validatorHandler(createProductSchema,'body'),
    async(req, res) =>{
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct);
  });

  router.patch('/:id', 
    validatorHandler(getProductSchema,'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) =>{
    try {
      const {id} = req.params; //the is is in params
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id',(req, res) =>{
    const {id} = req.params; //the is is in params
    const body = req.body;
    res.json({
      message: 'update',
      data: body,
      id,
    });
  });

  router.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  });
  module.exports = router;