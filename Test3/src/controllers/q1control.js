const q1=require('../models/q1schema')
const q2=require('../models/q1schema2');
const bcrypt=require('bcrypt')

let users=[];


exports.register=async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const passwordHash=await bcrypt.hash(req.body.password,salt)
        users.push({username:req.body.username,password:passwordHash})
        res.send("register successfully")
        }catch(e){
            res.status(500).send(e.toString());
        }
}

exports.login=async(req,res)=>{
    const user=users.find(user=>user.username===req.body.username)
        if(!user){
            res.status(400).send("user not found")
        }
        if(await bcrypt.compare(req.body.password,user.password)){
           res.render('buslist')
        }
        else{
            res.send("Not valid user")
        }
}


exports.showbuses=(req,res)=>{
   q1.find({}).then((data)=>{
        res.render('showbuses',{data:data})    
    })
}

exports.book=(req,res)=>{
    q2.create({name:req.body.busname,prize:req.body.busprize})
    res.send("booking successfull")
}

exports.dashboard=(req,res)=>{
    q2.find({}).then((data)=>{
        res.render('dashboard',{data:data})    
    })
}


exports.reg=(req,res)=>{
    res.render('register')
}

exports.log=(req,res)=>{
    res.render('login')
}
