import Joi from 'joi';

// Admin Profile Create Validation Schema 
const adminProfileCreateSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin').required(),
    name: Joi.string().min(3).required(),
    contact: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
});

export default adminProfileCreateSchema;
