const express =require('express');
const bodyparser=require('body-parser');
const Promotions=require('../models/promotions')
const promoRouter=express.Router();
promoRouter.use(bodyparser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(promo);
    },(err)=>{next(err)})
    .catch((err)=>{
       next(err)
    })
})
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promo)=>{
        console.log('promo Created : ' ,promo)
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>{next(err)})
})
.put((req,res,next)=>{
    res.statusCode=404;
    res.end('Put operation is not available')
})
.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode=404;
    res.end('Post operation is not available')
})
.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set :req,body
    },{
        new:true
    })
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200
        res.setHeader('Content-type','application/json')
        res.json(resp) 
    })
})

module.exports=promoRouter;