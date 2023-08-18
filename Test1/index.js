const express= require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const add=require('./add')
const sub=require('./sub')
const mul=require('./mul')
const div=require('./div')



// Question 1
app.post('/valid/', function(req, res){
        const email=req.body[i].email;
        const password=req.body[i].password;
        let count=0;
    for(let j=0;i<email.length;j++){
        if(email[j]==="@"){
            count++;
        }
    } 
    
    if(email[i]===""||password[i]===""||password[i].length<5||count==0){
        res.status(400).send("error");
    }
    else{
        res.status(200).send("success")
    }
    
    
    
    


});

// Question 2
app.get('/search/:name', function(req, res){
    res.send(req.params.name.toUpperCase())
})

// Question 3 
app.get('/:a/:b', function(req, res){
    let num1=req.params.a
    let num2=req.params.b
    const res1=add.add(num1, num2)
    const res2=sub.sub(num1, num2)
    const res3=mul.mul(num1, num2)
    const res4=div.div(num1, num2) 
    res.send("addition: " +res1+" " +"substraction: "+res2+" "+"multiplication: "+res3+" "+"division: "+res4);

})

app.listen(3000,()=>{
    console.log('server listening on')
})

// Question 4

//a.db.test.find({"property_type":"House"})
//b.db.test.find({"price":{$gt:500}},{"_id":0,"listing_url":1, "name":1, "host.host_name":1, "host.host_location":1, "reviewer_name":1, "price":1})
//c.db.test.find({$and:[{"address.country":{$eq:"Brazil"}},{"review_scores.review_scores_rating":{$gt:8}}]})
//d.db.test.find({$and:[{"price":{$gt:600}},{"price":{$lt:900}}]})

