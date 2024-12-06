 const {ValidationError} = require('sequelize');
 const boom = require('@hapi/boom');

function logErrors (err, req, res, next){
    console.error(err);
    next(err);  
}

//handle the error in a json format
function errorHandler(err, req, res, next){
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
//handling errors via boom
function boomErrorHanlder (err,req,res,next){
    if (err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    }else{
    next(err);
    }
}

//handling data validation errors 
function ormErrorHandler (err,req,res,next){
    if (err instanceof ValidationError){
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    }
    next(err);
}
module.exports = {logErrors, errorHandler, boomErrorHanlder, ormErrorHandler}