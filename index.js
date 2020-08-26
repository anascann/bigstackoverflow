const express=require('express')
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const auth=require('./routes/api/auth')
const profile=require('./routes/api/profile');
const questions=require('./routes/api/questions');
const passport=require('passport');
const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const db=require('./setup/mongourl').mongoURL

mongoose.connect(db).then(()=>{
    console.log('mongo Connected')
}).catch(err=>{
    console.log(err)
});

app.use(passport.initialize());

require('./strategies/jsonwtStrategies')(passport);

app.use('/api/auth',auth);

app.use('/api/profile',profile);
app.use('/api/questions',questions);
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log('server is up');
})