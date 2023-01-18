import * as Joi from '@hapi/joi';

export const BlockClassSchema = Joi.object({
    blockClass: Joi.string().required().min(3).max(10).messages({
        'string.base': `blockClass no string`,
        'string.empty': `blockClass cannot be an empty field`,
        'string.min': `blockClass have min  {#limit} length`,
        'string.max': `blockClass have max  {#limit} length`,
        'string.required': `blockClass cannot be left blank`,
      }),
  }).options({
    abortEarly: true,
    // result errors firts . instead of error all
    allowUnknown :  true
    // when allowUnknown : true defaults allows object unknown key ignored 
  });

module.exports ={
    BlockClassSchema
}