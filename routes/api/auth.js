const express=require('express');
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../../setup/mongourl');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const router=express.Router();

router.get('/',(req,res)=> res.json({test:'Auth is active'}));

const Person=require('../../models/Person');
const { json } = require('body-parser');

router.post('/register',(req,res)=>{
    Person.findOne({email: req.body.email})
        .then(person=>{
            if(person){
                return res.status(400).json({emailerror:'email is already registered'})
            }else{
                const newPerson=new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender
                })

                bcrypt.genSalt(saltRounds, (err, salt) =>{
                    bcrypt.hash(newPerson.password, salt, (err, hash) =>{
                        // Store hash in your password DB.
                        if(err)throw err;
                        newPerson.password=hash;
                        newPerson
                            .save()
                            .then(person=>res.json(person))
                            .catch(err=>console.log(err))
                    });
                });
            }
        })
        .catch(err=>console.log(err));
})

router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    Person.findOne({email})
        .then(person=>{
            if(!person){
                return res.status(404).json({emailerror: 'user not found with this'})
            }

            bcrypt.compare(password,person.password)
                .then(isCorrect=>{
                    if(isCorrect){
                    //res.json({success: 'login successfully'})
                    const payload={
                        id:person.id,
                        name:person.name,
                        email:person.email
                    }
                    jsonwt.sign(
                        payload,
                        key.secret,
                        {expiresIn:3600},
                        (err,token)=>{
                            res.json({
                                success:true,
                                token:token
                            })
                        }
                    )
                }else{
                    res.status(400).json({passworderror:'login error password incorrect'})
                }})
                .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>console.log(err));
})

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        gender: req.user.gender,
        profilepic: req.user.gender ? 'https://pixabay.com/photos/ballet-dancer-oudoors-elegant-5415806/':'girl link'
    })
})



module.exports=router;