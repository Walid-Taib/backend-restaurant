const express =require('express');
const bodyparser=require('body-parser');
const { all } = require('./dishRouter');



const promoRouter=express.Router();
promoRouter.use(bodyparser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send you all the promotions')
})
.post((req,res,next)=>{
    res.end("will edit the promotion")
})
.put((req,res,next)=>{
    res.statusCode=404;
    res.end('this operation is not available');
})
.delete((req,res,next)=>{
    res.end('will delete all the promotions')
})

module.exports=promoRouter;