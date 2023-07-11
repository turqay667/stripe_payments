const express=require('express')
const mongoose=require('mongoose')
const next=require('next')
const Payment=require('./payment')
const {v4:uuidv4}=require('uuid')
const dev=process.env.NODE_ENV !=='production'
const app=next({dev})
const handle=app.getRequestHandler()
const stripe=require('stripe')('sk_test_51NRVqCGvDkQ2uDLvQ1Egb0FNCVfEstBDbj2MSDyvfKF1v3gTHMcOw7umOWEZHgJmb42DFFlF0oAfceplRrp2wqgF00C6Trv5X9')


mongoose.connect(process.env.URI,{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(()=>
    console.log('Connected to the MongoDB database')
)
.catch((error)=>{
    console.error('Error connecting to the database:', error)
})

app.prepare().then(()=>{
    const server=express();
    server.use(express.json())
  
 
      
    server.post('/api/payment', async (req,res)=>{
        const {amount,currency,name,description}=req.body;
        try{
           
            const session= await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items:[
                    {
                        price_data:{
                            currency,
                            unit_amount:amount,
                            product_data:{
                                name:name,
                                description:description,
                            },
                        },
                        quantity:1,
                    }
                ],
                mode:'payment',
                success_url:'http://localhost:3000',
                cancel_url:'http://localhost:3000'
            })
        
            
            const payment=new Payment({
                amount,
                currency,
                name,
                description,
            });
            await payment.save();
            res.status(200).json({sessionId:session.id});
      
        }
        catch(err){
        res.status(500).json({err:'Unable to create checkout session'});
        }
        })
server.all('*',(req,res)=>{
    return handle(req,res)
})
server.listen(3000, (err)=>{
    if(err) throw err
    console.log('listening on port 3000')
})

})



 