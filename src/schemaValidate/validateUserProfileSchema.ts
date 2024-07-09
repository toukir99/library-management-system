import Joi from 'joi';

// User Profile Create Validation Schema 
const userProfileCreateSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('user').required(),
    name: Joi.string().min(3).required(),
    department: Joi.string().required(),
    contact: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
    studentId: Joi.number().integer().min(3).required(),
});

export default userProfileCreateSchema;
