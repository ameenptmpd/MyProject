const express=require('express');
const app=express();


app.get('/',function(req,res){
    res.send('hello ameen')
})
app.get('/ameen', function(req,res){
    res.send('ameen hello')
})
app.listen(3000,function(){
    console.log('server started')
})