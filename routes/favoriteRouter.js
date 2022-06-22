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
.put((req,res,next)=>{
    res.statusCode=404;
    res.setHeader('Content-Type','applicaton/json');
    res.end('Operation put is not available')
})

FavoriteRouter.route('/:DishId')
.get((req,res,next)=>{
    Favorites.findOne({author:req.user._id})
    .then((resp)=>{
        if(resp){
            Favorites.findById(req.params.DishId)
            .populate('author')
            .populate('dishes')    
            .then((favorite) => {
                if (favorite != null ) {
        
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }
                else if (dish == null) {
                    err = new Error('favorite ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('favprote ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);            
                }
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            err = new Error('user not fine');
            err.status = 404;
            return next(err);              
        }
    })
})
.post((req,res,next)=>{
    res.statusCode=404;
    res.setHeader('Content-Type','application/json');
    res.end('Operation is not available')
})
.delete((req,res,next)=>{
    Favorites.findOne({author:req.user._id})
    .then((resp)=>{
        if(resp){
            Favorites.findByIdAndRemove({_id:req.params.DishId})
            .then((resp)=>{
                resp.save()
                .then((resp)=>{
                    Favorites.findOne({author:req.user._id})
                    .populate('author')
                    .populate('dishes')
                    .then((favo)=>{
                        res.statusCode=200
                        res.setHeader('Content-Type','application/json')
                        res.json(favo)
                    })
                })
            })
        }
        else{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json')
            console.log("error") }
    })
})


module.exports=FavoriteRouter;