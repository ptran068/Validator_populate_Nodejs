import Joi from 'joi';

exports.createUser = {
    body: {
        firstName: Joi.string().required().min(2).max(255)
    }
};

exports.updateUser = {
    body: {
        firstName: Joi.string().min(2).max(255)
    },
    params: {
    	id: Joi.string().required()
    },
    query: {
    	
    }
};

