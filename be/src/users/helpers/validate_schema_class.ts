import * as Joi from '@hapi/joi';

export const ClassSchema = Joi.object({
    class_kma: Joi.string().required().min(3).max(10).messages({
        'string.base': `class no string`,
        'string.empty': `class cannot be an empty field`,
        'string.min': `class have min  {#limit} length`,
        'string.max': `class have max  {#limit} length`,
        'string.required': `class cannot be left blank`,
      }),
  }).options({
    abortEarly: true,
    // result errors firts . instead of error all
    allowUnknown :  true
    // when allowUnknown : true defaults allows object unknown key ignored 
  });

module.exports ={
    ClassSchema
}