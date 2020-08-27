const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const router=express.Router();

const Person=require("../../models/Person");
const Profile=require("../../models/Profile");
const Question=require("../../models/Question");

router.get('/',(req,res)=>res.json({test: 'questions is active'}));


router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const newQuestion=new Question({
        textone:req.body.textone,
        texttwo:req.body.texttwo,
        user:req.body.user,
        name:req.body.name
    });
    newQuestion
    .save()
        .then(question=>res.json(question))
            .catch(err=>console.log('couldnt push into db'+ err));
})
module.exports=router