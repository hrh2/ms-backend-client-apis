require('dotenv').config();
const router = require('express').Router();
const { User} = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

router.post('/', async (req, res) => {
   try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).send({ message: 'Invalid Email or Password' });

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(401).send({ message: 'Invalid Email or Password' });

      const token = jwt.sign({ _id: user._id,email:user.email ,phone:user.phone},process.env.JWT);
      res.status(200).send({ token:token});
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
});



// data validation functions

const validateUser = (data) => {
   const schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
   });
   return schema.validate(data);
};

module.exports = router;
