const mongoose=require('mongoose')
const express=require('express')
const Leaders=require('../models/leaders');



const LeadersRouter=express.Router();
LeadersRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(leaders)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200
        res.setHeader('Content-type','application/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200
        res.setHeader('Content-type','application/json')
        res.json(resp)
    })
})
LeadersRouter.route('/:leaderId')
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    })
})
.post((req,res,next)=>{
    res.statusCode=403
    res.end('Operation is not available')
})
.put((req,res,next)=>{
    Leaders.findByIdAndUpdate(req.body.leaderId,{
        $set:req.body
    },{new:true})
})
.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then(()=>{
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.json(Leaders)
    })
})
module.exports=LeadersRouter;
