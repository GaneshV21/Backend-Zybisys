const text=require('../models/schema')
const passport = require('passport');
const mongoose = require('mongoose')
const sessions= require('express-session');
app.use(sessions({
    secret:"thisismysecretkey",
    saveUninitialized: true,
    resave:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(MyUser.createStrategy());

passport.serializeUser(text.serializeUser());
passport.deserializeUser(text.deserializeUser());

const db=mongoose.connection;
db.on('open',()=>{
    console.log("connected")
})


exports.first=(req,res)=>{
    if(req.isAuthenticated()) {
        res.send("You have already logged in.<a href='/logout'>Logout</a>");
    }else{
        res.render("passport")
    }
}


exports.login=(req,res)=>{
    if(req.isAuthenticated()) {
        res.send("You have already logged in.<a href='/logout'>Logout</a>")
    }
    else{
        res.render("passportlogin")
    }
}
    

exports.logout=(req,res)=>{
    req.logout(req.user,err=>{
        if(err) throw err;
        res.redirect('/login')
    })
}

exports.checklogin=(passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}))
    
exports.register=(req,res)=>{
    var email = req.body.username;
    var password = req.body.password;
    text.register({username: email}, password,function(err,user){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.send("successfully registered")
            })
        }
    })
}


exports.reg=(req,res)=>{
    res.render('register')
}

exports.log=(req,res)=>{
    res.render('login')
}





    