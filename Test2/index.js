const express = require('express')
const app= express();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const events=require("events");
const eventsEmit=new events.EventEmitter();
const MongoClient = require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/Ganesh"
const ObjectId = require('mongodb').ObjectId;



/* 1.Create an express app in node which should count the number of times a user visits a web page
 and display it to the user.*/

app.use(cookieParser());

let count=1;

app.get('/',(req,res)=>{
    res.cookie("count",count++) 
    if(req.cookies.count=== undefined){
        res.send("count 0")
    }  
    else{
        res.send("count"+" "+ req.cookies.count);
    }
})


/* 2.Create a route in express which should have a middleware to authenticate a user by checking whether 
a cookie exists for that particular user or not. If the cookie does not exists then use error handler 
middleware to throw error message.*/ 



//cookies exist for particular user - users(1,2,3,4)

const authenticate=(req,res) => {
    console.log("Authenticating")
}

app.get('/route/:id',(req,res,next)=>{
let a=req.params.id;
   if(a==1 || a==2 || a==3 || a==4){
    console.log("cookies exist")
    res.send(a)
    next();
   }
   else{
    console.log("cookies not exist")
    throw new Error("user not authenticated")
   }
})

app.use(authenticate);


/* 3.Using the ‘fs’ module in nodejs, read an html file and display its content on the web page */

app.get('/webpage',(req,resp)=>{
    fs.readFile("index.html",(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            resp.send(res.toString())
        }
    })

})




/* 4. Create a user defined event in node which when fired should write some content to a file. */


eventsEmit.on('ganesh',()=>{
fs.writeFile("data.txt","user defined event in node would writes content into a file when fired",(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("content is written to file")
        }
    } 
    )
})

eventsEmit.emit('ganesh');



/* 5.Create a route in express which should accept an object id from the url and if that object id exists in the database 
then fetch the document of that particular object id and pass it on to the ejs template engine to view the data */


const Client =new MongoClient(url);
app.set('view engine', 'ejs');
app.set('views',__dirname)

app.get('/mongo/:id', function(req, resp){
    try{
        var o_id = new ObjectId(req.params.id)
        Client.connect(url).then(()=>{
            console.log("Connect");
            const DB=Client.db("Ganesh");
            const coll=DB.collection("crud")
            coll.find({_id:o_id}).toArray().then((res)=>{
                resp.render('view',{res:res})                
            })    
        })
    }
    catch{
        resp.send("no data")
    }
})
 




app.listen(8000,() => {
    console.log('listening on')
})


