const mongoose=require('mongoose');
const Schema=mongoose.Schema
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const commentSchema=new Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    author:{
        required:true,
        type:String
    }

},{timestamps:true})


const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true
});
const Dishes =mongoose.model('Dish', dishSchema);
module.exports=Dishes;