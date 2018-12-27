import Joi from 'joi';

exports.createGroup = {
    body: {
        name: Joi.string().required().min(2).max(255)
    }
};

exports.updateGroup = {
    body: {
        name: Joi.string().min(2).max(255)
    },
    params: {
    	id: Joi.string().required()
    },
    query: {
    	
    }
};

