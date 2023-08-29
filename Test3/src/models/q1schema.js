const mongoose=require('mongoose');

const Schema = mongoose.Schema({
    name:String,
    prize:String
})

const bus=mongoose.model('bus',Schema);

module.exports=bus;

