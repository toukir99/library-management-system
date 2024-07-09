import Joi from 'joi';

// Auth Validation Schema 
const authSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'user').required(),
});

// Auth Token Validation Schema 
const authTokenSchema = Joi.string().required();

export { authSchema, authTokenSchema };


