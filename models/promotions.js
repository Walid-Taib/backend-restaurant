const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const promotionsShema =new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
    },
    price:{
        type:Number
    },
    featured:{
        type:Boolean
    },
    description:{
        type:String,
        required:true
    }
})


const Promotions=mongoose.model('Promo',promotionsShema);
module.exports=Promotions;