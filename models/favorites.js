const mongoose=require('mongoose')
const Schema=mongoose.Schema








const FavoriteSchema=new Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }



},{timestamp:true})


const Favorites=mongoose.model('Favorite',FavoriteSchema);
module.exports=Favorites;