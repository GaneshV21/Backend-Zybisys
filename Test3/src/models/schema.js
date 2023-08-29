const mongoose=require('mongoose');

const Schema = mongoose.Schema({
    email:String,
    password:String
},{
    timestamps:true
})

const test=mongoose.model('test3',Schema);
module.exports=test;