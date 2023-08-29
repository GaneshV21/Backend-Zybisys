const mongoose=require('mongoose');

const Schema = mongoose.Schema({
    name:String,
    prize:String
})

const storebus=mongoose.model('storebus',Schema);
module.exports=storebus;