const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
const pool = require('../libs/postres.pool');

class ProductsService {

    constructor(){
        this.products = [];
        this.generate();
        this.pool = pool;
        this.pool.on('error', (err) => console.error(err));
    }

    async generate(){
        const limit = 100; 
        for (let index = 0; index < limit; index++){
          this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10), //parse to int
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean(),
          });
      }
    }
    async create(data){
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }
    async find(){
        const query = 'SELECT * FROM tasks';
        const [data] = await sequelize.query(query);
        return data;
    }
    async findOne(id){
        const product = this.products.find(item => item.id === id);
        if (!product){
            throw boom.notFound('Product not found! :(');
        }
        if (product.isBlock){
            throw boom.conflict('product is block');
        }
        return product;
    }

    async update(id, changes){
        const index = this.products.findIndex( item => item.id === id);
        if (index === -1){
            throw boom.notFound('Product not found :(');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    async delete(id){
        const index = this.products.findIndex( item => item.id === id);
        if (index === -1){
            throw boom.notFound('product not found');
        }
        this.products.splice(index, 1);
        return {id}
    }
}

module.exports = ProductsService;