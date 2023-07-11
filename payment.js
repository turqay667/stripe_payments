const mongoose = require("mongoose");

const paymentSchema=new mongoose.Schema({
    amount:Number,
    currency:String,
    name:String,
    description:String,
})
const Payment=mongoose.model('Payment',paymentSchema)
module.exports=Payment;