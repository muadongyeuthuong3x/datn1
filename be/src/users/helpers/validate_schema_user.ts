import * as Joi from '@hapi/joi';
import {UserRole} from './../../enums/enum_users'


export const UserSchema = Joi.object({
    email: Joi.string().required().min(10).max(100).regex(/\w{5,}[-+/]*@\w{5,}.[a-zA-Z]{3,}/i).messages({
        'string.base': `email no string`,
        'string.empty': `email cannot be an empty field`,
        'string.email': `not format email`,
        'string.min': `email have min  {#limit} length`,
        'string.max': `email have max  {#limit} length`,
        'string.required': `email cannot be left blank`,
        'string.pattern.base': `incorrect email format`,
      }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.base': `password no string`,
        'string.empty': `password cannot be an empty field`,
        'string.required': `email cannot be left blank`,
        'string.pattern.base': `incorrect password format have min three charaters`,
      }),
    role: Joi.string().valid(UserRole.Admin , UserRole._KMA ,UserRole._SCORE).required().messages({
        'string.base': `role no string`,
        'string.empty': `role cannot be an empty field`,
        'string.required': `role cannot be left blank`,
      }),
  }).options({
    abortEarly: true,
    // result errors firts . instead of error all
    allowUnknown :  true
    // when allowUnknown : true defaults allows object unknown key ignored 
  });

module.exports ={
    UserSchema
}
 