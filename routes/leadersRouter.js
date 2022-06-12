const express =require('express');
const bodyparser=require('body-parser');



const leadersRouter=express.Router();
leadersRouter.use(bodyparser.json());

leadersRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send you all the leaders')
})
.post((req,res,next)=>{
    res.end("will edit the leader")
})
.put((req,res,next)=>{
    res.statusCode=404;
    res.end('this operation is not available');
})
.delete((req,res,next)=>{
    res.end('will delete all the leaders')
})

module.exports=leadersRouter;