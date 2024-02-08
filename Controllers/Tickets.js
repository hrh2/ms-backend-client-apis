const express = require('express');
const router = express.Router();
const { verifyToken, extractUserIdFromToken } = require('../Middlewares/Token-verification');
const Tickets = require('../Models/Tickets');

router.get('/', verifyToken, async (req, res) => {
    try {
        const userid = extractUserIdFromToken(req);
        const usedTickets = await Tickets.find({ownerId:userid,isUsed:true});
        const unUsedTickets = await Tickets.find({ownerId:userid,isUsed:false});
        const suspendedTickets = await Tickets.find({ownerId:userid,isSuspended:true});

        return res.status(200).json({
            unUsedTickets,usedTickets,suspendedTickets,
            message:"Tickets received "
        });

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});



module.exports = router