import Joi from 'joi';

// Admin Profile Create Validation Schema 
const adminProfileCreateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(8).required(),
    contact: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
    role: Joi.string().valid('admin').required(),
});

export default adminProfileCreateSchema;
