const router = require('express').Router();
const { User,validate} = require('../Models/User');
const { verifyToken} = require('../Middlewares/Token-verification')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/', async (req, res) => {
     try {
          const { error } = validate(req.body);
          if (error) {
               return res.status(400).json({ error: error.details[0].message, m: "me too idk" });
          }
          const Euser = await User.findOne({ email: req.body.email });
          if (Euser) {
               return res.status(400).json({ error: 'User already exists' });
          }
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(req.body.password, salt);
          const user = new User({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               phone: req.body.phone,
               cardNumber: req.body.cardNumber,
               username: req.body.username,
               password: hash,
               image: req.body.image,
               isVerified: false,
          });
          await user.save();
          const token = jwt.sign({ _id: user._id, email: user.email, phone: user.phone }, process.env.JWT);
          res.status(200).send({ token: token });
     } catch (error) {
          res.status(500).json({ message: 'Internal Server error' });
     }
});

module.exports = router;
