//For Validation
const Joi = require('joi')

//register Validation
const registerValidation = (data) => {

  //create schema object that will validate each key - name, email, password
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required()
  });
 
  return schema.validate(data)
}





 const loginValidation = (data) => {

  //create schema object that will validate each key - name, email, password
  const schema = Joi.object({
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data)

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;