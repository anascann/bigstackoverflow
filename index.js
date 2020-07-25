const express=require('express')
const mongoose=require('mongoose');
const app=express();

const db=require('./setup/mongourl').mongoURL

mongoose.connect(db).then(()=>{
    console.log('mongo Connected')
}).catch(err=>{
    console.log(err)
});
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log('server is up');
})