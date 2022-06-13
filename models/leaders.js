const mongoose=require('mongoose');
const bodyParser=require('body-parser');




const Schema =mongoose.Schema

const leaderSchema=new Schema({
    name :{
        required:true,
        type:String,
        unique:true
    }
})

const Leaders=mongoose.model('Leader ', leaderSchema);
module.exports=Leaders;
