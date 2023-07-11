'use client'
import React from "react";
import { useState } from "react";
import '../main.scss';
import {loadStripe} from "@stripe/stripe-js"
import Image from "next/image";
const stripePromise=loadStripe('pk_test_51NRVqCGvDkQ2uDLvNdbA7b3kFyM1OmI3nIGKVyE1bbri05JaC9iuX2Bd3dXCEuZgYoSvkJtoxhLJXQ6AAFWEoi7C00KhMI8PqQ')
const PaymentForm=()=>{
const [item,setItem]=useState({
  name:'LARGE WEBBING SHOULDER BAG',
  description:'Suitably sophisticated for work days yet chic enough for evening meals, this smart bag is a versatile option for your edit. Crafted with woven webbing fabric alongside accents of tan faux leather, this piece sits over the shoulder with long comfortable straps.',
  image:'https://www.accessorize.com/dw/image/v2/BDLV_PRD/on/demandware.static/-/Sites-accessorize-master-catalog/default/dw5bb6bf8c/images/large/01_59028311_2.jpg?sw=663&sh=848&sm=cut',
  quantity:1,
  price:10
})

    const handlePayment=async ()=>{
    const stripe= await stripePromise;
    const response= await fetch('/api/payment',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({amount:item.price*100, currency:'usd',name:item.name,description:item.description }),
        })
        const {sessionId}= await response.json()
        try{
            await stripe.redirectToCheckout({sessionId})
        }
        catch(error){
          console.error(error)
        }}
    return(
      <div className="container">
        <Image src={item.image}  width={200} height={100} alt={item.name}/>
        <h3>Price: ${item.price}</h3>
        <h2>{item.name}</h2>
        <p className="description">{item.description}</p>
        <div className="pay_now">
 <button onClick={handlePayment}>Pay now</button>
 </div>    
        </div>
    )
}
export default PaymentForm;