const express=require('express')
const bodyParser=require('body-parser')


const Dishes =require('../models/dishes')
const Favorites=require('../models/favorites');
const FavoriteRouter=express.Router();

FavoriteRouter.route('/')
.get((req,res,next)=>{
    Favorites.find({author:req.user._id})
    .populate('author')
    .populate('dishes')

    .then((favorite)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(favorite)
    })
})
.post((req,res,next)=>{
    req.body.author=req.user._id;
    Favorites.findOne({author:req.user._id})
    .then((resp)=>{
        if(resp){
           Favorites.findOne({dishes:req.body.dishes})
           .then((favo)=>{
            console.log("no"+favo)
                if(favo===null){
                    req.body.author=req.user._id
                    Favorites.create(req.body)
                    .then((favo)=>{
                        favo.save()
                        .then((resps)=>{
                            Favorites.find({author:req.user._id})
                            .populate('author')
                            .populate('dishes')
                        
                            .then((favorite)=>{
                                res.statusCode=200;
                                res.setHeader('Content-Type','application/json')
                                res.json(favorite)
                            })
                            
                            
                        })
                    })

                }
                else{
                    err=new Error('the dish is already exist')
                    err.statusCode=404;
                    next(err);
                }

           })
        }
        else{
            req.body.author=req.user._id
            Favorites.create(req.body)
            .then((resps)=>{
                resps.save()
                .then(()=>{
                    Favorites.find({author:req.user._id})
                    .populate('author')
                    .populate('dishes')
                
                    .then((favorite)=>{
                        res.statusCode=200;
                        res.setHeader('Content-Type','application/json')
                        res.json(favorite)
                    })
                    
                    
                })            })
        }

    })



})
.delete((req,res,next)=>{
    Favorites.remove({})
    .then((favo)=>{
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.json(favo)
    })
})



module.exports=FavoriteRouter;