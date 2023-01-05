import * as Joi from '@hapi/joi';
import {UserRole} from './../../enums/enum_users'
export class CreateUserDto {}


export const UserSchema = Joi.object({
    email: Joi.string().required().min(10).max(100).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string().valid(UserRole.Admin , UserRole._KMA).required(),
  }).options({
    abortEarly: false,
    // result errors firts . instead of error all
    allowUnknown :  true
    // when allowUnknown : true defaults allows object unknown key ignored 
  });
         

  export class UserSchemaLogin = Joi.object({
    email: Joi.string().required().min(10).max(100).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }).options({
    abortEarly: false,
    // result errors firts . instead of error all
    allowUnknown :  true
    // when allowUnknown : true defaults allows object unknown key ignored 
  });    