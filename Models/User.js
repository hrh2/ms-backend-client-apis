const mongoose=require('mongoose');
const joi=require('joi');
const passwordComplexity=require('joi-password-complexity');
require('dotenv').config();


const userSchema = new mongoose.Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, required: true },
     phone: { type: Number, required: true },
     username: { type: String, required: true },
     cardNumber: { type:String, required: true },
     password: { type: String, required: true },
     image:{type:String,required:false},
     isVerified: { type:Boolean,default:false},
});

const validate = (data) => {
     const schema = joi.object({
          firstName: joi.string().required().label('First Name'),
          lastName: joi.string().required().label('Last Name'),
          email: joi.string().email().required().label('Email'),
          phone: joi.number().required().label('Phone Number'),
          cardNumber: joi.string().required().label('cardNumber'),
          username: joi.string().required().label('Username'),
          password: passwordComplexity().required().label('Password'),
          image: joi.allow(null).label('Image'),

     });
     return schema.validate(data);
};

const User=mongoose.model('User',userSchema);


const validatePasswordComplexity = (data)=>{
     const schema = joi.object({
          password: passwordComplexity().required().label('Password'),
     });
     return schema.validate(data);
}
module.exports={User,
     validate,
     validatePasswordComplexity,
 }
