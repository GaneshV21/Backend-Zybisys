/* 4.Create REST API to accept only images from the user. If the file is not an image then display an error
message.*/

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sessions= require('express-session');
const path = require('path');
const multer = require('multer');
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname+'/src/public', 'views'));
app.use(sessions({
    secret:"thisismysecretkey",
    saveUninitialized: true,
    resave:false
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs')
app.set('views',path.join(__dirname+'/src/','views'))


const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.originalname.endsWith('.png') ){
            cb(null,path.join(__dirname+'/src/public','images'))
        }
        else if(file.originalname.endsWith('.jpg')){
            cb(null,path.join(__dirname+'/src/public','images'))
        }
        else if(file.originalname.endsWith('.jpeg')){
            cb(null,path.join(__dirname+'/src/public','images'))
        }
        else{
            cb(new Error("file format is not supported"),false)
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
})



const upload = multer({storage:multerStorage})

app.post('/upload',upload.single("myfile"),(req,res)=>{
    res.send("file uploaded")
})




/* 3. Create REST API to accept multiple files from the user and upload all of them in the database using
mongoose.*/ 



app.use(express.static('src/public/images'))

const multiplemulterStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname+'/src/public','images'))
        },
        filename:(req,file,cb)=>{
            cb(null,`${file.originalname}`)
        }
    })
    
const multipleupload = multer({storage:multiplemulterStorage})
    

mongoose.connect('mongodb://0.0.0.0:27017/Ganesh',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection;

const UserSchema=new mongoose.Schema({
    image:{
        type:String
    }
})
const MyUser=mongoose.model('mongoo',UserSchema)

app.post('/process_multiple', multipleupload.array('myfile1'),(req,res)=>{
    MyUser.create({image:req.file.originalname})
})



/*2. Create REST API to authenticate users using passportjs. Use mongoose ODM. You need to follow
MVC Architecture. Create routes for registering a user, login, and logout a user*/



// mongoose.connect('mongodb://0.0.0.0:27017/Ganesh',{useNewUrlParser:true,useUnifiedTopology:true})
// const db=mongoose.connection;
// db.on('open',()=>{
//     console.log("connected")
// })



/*1.Create a bus reservation system following the MVC Architecture which should have the following
features:*/

const routes= require('./src/routes/q1routes')
app.use('/',routes)

mongoose.connect('mongodb://0.0.0.0:27017/Ganesh',{useNewUrlParser:true,useUnifiedTopology:true})

const dbs=mongoose.connection;
dbs.on('open',()=>{
    console.log("mongoose connected")
})


app.listen(8000,() => {
    console.log('listening on')
})