const express = require('express');
const router = express.Router();
const { verifyToken, extractUserIdFromToken } = require('../Middlewares/Token-verification');
const { User } = require('../Models/User')
const Station = require('../Models/Stations')
const Ticket=require('../Models/Tickets')


router.get('/',verifyToken, async (req, res) => {
    try {
        const userID=extractUserIdFromToken(req)
        const user= await User.findById(userID);
        const stations = await Station.find();
        const tickets=await Ticket.find({ownerId:userID});
        res.json({userImage:user.image,name:user.lastName,tickets,stations});
    } catch (err) {
        res.status(500).send(`Server error : ${err.message}`);
    }
});

module.exports = router;

