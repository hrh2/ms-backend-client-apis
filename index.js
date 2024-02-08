const express=require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;
const connection=require('./DB-connection');


connection()

//routes

const signUpRoutes = require('./Controllers/Signup');
const loginRoutes = require('./Controllers/Login');
const userProfileRoutes = require('./Controllers/User-profile');
const homepageRoute=require('./Controllers/Home');

const carRentalRoutes=require('./Controllers/Car-Rental')
const searchTickets_Stations= require('./Controllers/Bus-Tickets-Linked-stations')
const booking = require('./Controllers/Bus-Booking');
const ticketsRoute = require('./Controllers/Tickets')



app.use(cors())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({extended:true,limit: '30mb' }));

//apis

app.use('/signup',signUpRoutes);
app.use('/login',loginRoutes);
app.use('/profile',userProfileRoutes);
app.use('/home',homepageRoute);

app.use('/search',searchTickets_Stations);
app.use('/book',booking);
app.use('/car-rental',carRentalRoutes)
app.use('/tickets',ticketsRoute);

//starting  server

app.listen(port,()=>{
     console.log(`server started on http://localhost:${port}`);
})

