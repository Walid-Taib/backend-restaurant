const express =require('express');

const bodyparser=require('body-parser');

const dishRouter=express.Router();
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send you the dishes when it is ready');
})
.post((req,res,next)=>{
    res.end('will edit the dishes')
})
.put((req,res,next)=>{
    res.end('this operation is not available');
    res.statusCode=404
})
.delete((res,req,next)=>{
    res.end('will delete all the dishes !')
})
dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('we will give you the dish');
})
.post((req,res,next)=>{
    res.statusCode=404
    res.end('this operation is not available ');
})
.put((req,res,next)=>{
    res.end('will edit this dish');
})
.delete((req,res,next)=>{
    res.end('will delete this dish for you ')
})


module.exports=dishRouter;