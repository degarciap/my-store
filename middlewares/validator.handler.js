const boom = require('@hapi/boom');

function validatorHandler(schema, property){
    return(req,res,next)=>{
        const data = req[property];
        const {error} = schema.validate(data, {abortEarly: false}); //so it sends all the error at once, not just the first it finds
        if(error){
            next(boom.badRequest(error));
        } 
        next();  
    }
}

module.exports = validatorHandler;